import express from "express";
import products from "../models/data/products.js";

const router = express.Router();

// ---------- Rules: which words in the query mean which concern ----------
const CONCERN_KEYWORDS = {
  acne: ["acne", "pimple", "breakout", "break out", "zit"],
  oiliness: ["oily", "greasy", "shiny", "excess oil", "oil control"],
  dryness: ["dry", "flaky", "flaking", "rough patches"],
  sensitivity: ["sensitive", "irritation", "irritated", "reactive"],
  blackheads: ["blackhead", "clogged pore"],
  dehydration: ["dehydrated", "dehydration"],
  pigmentation: ["pigmentation", "dark spot", "uneven tone","uneven skin", "hyperpigmentation", "dark mark"],
  repair: ["barrier repair", "damaged barrier", "skin barrier"],
  circles: ["dark circles", "under eye darkness"],
  dullness: ["dull", "dullness", "lack of glow"],
  pores: ["large pores", "visible pores", "enlarged pores"],
  puffiness: ["puffy", "puffiness", "under eye bags"],
  redness: ["redness", "red skin", "redness-prone"],
  "sun protection": ["sun protection", "sun damage", "uv protection"],
  texture: ["uneven texture", "rough texture", "skin texture"]
};
// ---------- Budget: only numbers that are clearly a price ----------
const BUDGET_PATTERNS = [
  /(?:under|below|within|less than|upto|up to|max|maximum|budget(?: of| is)?|around|about)\s*(?:rs\.?|inr|₹)?\s*(\d{2,5})/,
  /(?:₹|rs\.?|inr)\s*(\d{2,5})/,
  /(\d{2,5})\s*(?:rs|rupees|inr|₹)/,
];

const extractBudget = (text) => {
  for (const pattern of BUDGET_PATTERNS) {
    const match = text.match(pattern);
    if (match) return parseInt(match[1], 10);
  }
  return null;
};

// ---------- Routine text by skin type ----------
const ROUTINES = {
  Oily: ["Gel or foaming cleanser", "Niacinamide or salicylic acid serum", "Oil-free gel moisturizer", "Matte sunscreen SPF 50"],
  Dry: ["Creamy hydrating cleanser", "Hyaluronic acid serum", "Rich ceramide moisturizer", "Hydrating sunscreen SPF 50"],
  Sensitive: ["Gentle fragrance-free cleanser", "Soothing serum (centella or panthenol)", "Barrier-repair moisturizer", "Mineral sunscreen SPF 50"],
  Combination: ["Gentle cleanser", "Treatment serum", "Lightweight moisturizer", "Sunscreen SPF 50"],
};

// Same query -> same tie-break order, different queries -> different order.
const hash = (text) => {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
};

// Pick up to `limit`, preferring a different category for each pick.
const pickVaried = (ranked, limit) => {
  const picked = [];
  const usedCategories = new Set();
  for (const item of ranked) {
    if (picked.length === limit) break;
    if (!usedCategories.has(item.product.category)) {
      picked.push(item);
      usedCategories.add(item.product.category);
    }
  }
  for (const item of ranked) {
    if (picked.length === limit) break;
    if (!picked.includes(item)) picked.push(item);
  }
  return picked;
};

router.post("/analyze", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).send({ success: false, message: "Please enter your skin concern." });
    }

    const lowerQuery = query.toLowerCase();
    const budget = extractBudget(lowerQuery);
    const isBeginner = lowerQuery.includes("beginner");
    const wantsRoutine = lowerQuery.includes("routine");

    // ---- 1. Detect concerns ----
    const detectedConcerns = Object.keys(CONCERN_KEYWORDS).filter((concern) =>
      CONCERN_KEYWORDS[concern].some((word) => lowerQuery.includes(word))
    );

    // ---- 2. Detect skin type ----
    let skinType = "combination";
    if (lowerQuery.includes("normal skin")) skinType = "normal";
    if (lowerQuery.includes("oily")) skinType = "oily";
    if (lowerQuery.includes("dry")) skinType = "dry";
    if (lowerQuery.includes("sensitive")) skinType = "sensitive";
    if (lowerQuery.includes("dehydrated")) skinType = "dehydrated";
    if (lowerQuery.includes("acne-prone") || lowerQuery.includes("acne prone")) {skinType = "acne-prone";}

    // ---- 3. Fallback: nothing we recognise ----
    if (detectedConcerns.length === 0) {
      return res.status(200).send({
        success: true,
        response:
          "I couldn't identify a skin concern in your message.\nPlease describe your concern more specifically, for example: acne, oily skin, dryness, sensitivity, blackheads, dehydration or pigmentation. You can also add a budget, like \"under 800\".",
        matchedProducts: [],
        skinType,
        compatibilityScore: 0,
        detectedConcerns: [],
      });
    }

    // ---- 4. Filter ----
    let candidates = products;
    if (isBeginner) candidates = candidates.filter((p) => p.category !== "Active");
    if (budget) candidates = candidates.filter((p) => p.budget <= budget);

    // ---- 5. Score: how much of the query does each product cover? ----
    const scored = candidates
      .map((product) => {
        const concernHits = product.concerns.filter((c) => detectedConcerns.includes(c)).length;
        const skinTypeHit = product.skinTypes.includes(skinType.toLowerCase()) ? 1 : 0;
        const fit = Math.round(
          70 * (concernHits / detectedConcerns.length) + 30 * skinTypeHit
        );
        return { product, concernHits, fit, tie: hash(lowerQuery + product.id) };
      })
      .filter((s) => s.concernHits > 0)
      .sort((a, b) => b.fit - a.fit || a.tie - b.tie);

    const picked = pickVaried(scored, 4);
    const matchedProducts = picked.map((s) => s.product);

    // Compatibility = average fit of the products being shown (0-100)
    const compatibilityScore = picked.length
      ? Math.round(picked.reduce((sum, s) => sum + s.fit, 0) / picked.length)
      : 0;

    // ---- 6. Explanation text ----
    const routine = (ROUTINES[skinType.charAt(0).toUpperCase() + skinType.slice(1)] || ROUTINES.Combination)
    .map((step, i) => `${i + 1}. ${step}`)
    .join("\n");
    
    const productLines = matchedProducts.length
      ? matchedProducts.map((p) => `• ${p.name} (${p.category}) - ₹${p.budget}`).join("\n")
      : `No products found${budget ? ` within ₹${budget}` : ""}. Try a higher budget.`;

    const response = `
Skin Analysis:
Your skin concerns appear related to ${detectedConcerns.join(", ")}.
${budget ? `Budget applied: up to ₹${budget}.\n` : ""}${isBeginner ? "This routine is beginner-friendly and focuses on gentle skincare.\n" : ""}${wantsRoutine ? "A personalized skincare routine has been generated for your needs.\n" : ""}
Recommended Products:
${productLines}

Suggested Routine:
${routine}

`;

    console.log("QUERY:", query);
    console.log("CONCERNS:", detectedConcerns, "| BUDGET:", budget, "| SCORE:", compatibilityScore);
    console.log("MATCHES:", matchedProducts.map((p) => p.name));

    res.status(200).send({
      success: true,
      response,
      matchedProducts,
      skinType,
      compatibilityScore,
      detectedConcerns,
    });
  } catch (error) {
    console.log("AI ROUTE ERROR:", error);
    res.status(500).send({ success: false, message: "AI analysis failed" });
  }
});

export default router;