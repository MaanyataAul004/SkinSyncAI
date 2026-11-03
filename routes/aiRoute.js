import express from "express";
import products from "../data/products.js";

const router = express.Router();

const pickVaried = (ranked, limit) => {
  const picked = [];
  const usedCategories = new Set();

  for (const product of ranked) {
    if (picked.length === limit) break;
    if (!usedCategories.has(product.category)) {
      picked.push(product);
      usedCategories.add(product.category);
    }
  }

  // If there were fewer than `limit` categories, fill the rest in rank order
  for (const product of ranked) {
    if (picked.length === limit) break;
    if (!picked.includes(product)) picked.push(product);
  }

  return picked;
};

router.post("/analyze", async (req, res) => {
  try {
    const { query } = req.body;

    const lowerQuery = query.toLowerCase();

    let budget = null;

    const budgetMatch = lowerQuery.match(/\d+/);

    if (budgetMatch) {
      budget = parseInt(budgetMatch[0]);
    }

    const isBeginner = lowerQuery.includes("beginner");
    const wantsRoutine = lowerQuery.includes("routine");

    const detectedConcerns = [];

    if (lowerQuery.includes("acne")) detectedConcerns.push("acne");
    if (lowerQuery.includes("oily")) detectedConcerns.push("oiliness");
    if (lowerQuery.includes("dry")) detectedConcerns.push("dryness");
    if (lowerQuery.includes("sensitive")) detectedConcerns.push("sensitivity");
    if (lowerQuery.includes("blackheads")) detectedConcerns.push("blackheads");
    if (lowerQuery.includes("dehydrated")) detectedConcerns.push("dehydration");

    let skinType = "Combination";

    if (lowerQuery.includes("oily")) skinType = "Oily";
    if (lowerQuery.includes("dry")) skinType = "Dry";
    if (lowerQuery.includes("sensitive")) skinType = "Sensitive";

    const compatibilityScore = Math.floor(Math.random() * 15) + 85;

    // ---- Start with every product, then apply the same filters as before ----
    let candidates = products;

    if (isBeginner) {
      candidates = candidates.filter((product) => product.category !== "Active");
    }

    if (budget) {
      candidates = candidates.filter((product) => product.budget <= budget);
    }

    // ---- Score each candidate by how well it fits the query ----
    // +3 for every detected concern the product treats
    // +2 if the product suits the detected skin type
    // Random tie-break so equally good products rotate between searches
    const scored = candidates
      .map((product) => {
        const concernHits = product.concerns.filter((c) =>
          detectedConcerns.includes(c)
        ).length;
        const skinTypeHit = product.skinTypes.includes(skinType.toLowerCase())
          ? 1
          : 0;

        return {
          product,
          score: concernHits * 3 + skinTypeHit * 2,
          concernHits,
          tie: Math.random(),
        };
      })
      .sort((a, b) => b.score - a.score || b.tie - a.tie);

    // When concerns were detected, only keep products that treat at least one
    let ranked = scored;
    if (detectedConcerns.length > 0) {
      const treating = scored.filter((s) => s.concernHits > 0);
      if (treating.length > 0) ranked = treating;
    }

    const matchedProducts = pickVaried(
      ranked.map((s) => s.product),
      4
    );

    const response = `
Skin Analysis:
Your skin concerns appear related to ${detectedConcerns.length > 0 ? detectedConcerns.join(", ") : "general skincare maintenance"}.
${isBeginner ? "This routine is beginner-friendly and focuses on gentle skincare.\n" : ""}
${wantsRoutine ? "A personalized skincare routine has been generated for your needs.\n" : ""}
Recommended Products:
${matchedProducts.map((product) => `• ${product.name} (${product.category}) - ₹${product.budget}`).join("\n")}

Suggested Routine:
1. Gentle Cleanser
2. Treatment Serum
3. Moisturizer
4. Sunscreen SPF 50

`;

    console.log("QUERY:", query);
    console.log("CONCERNS:", detectedConcerns);
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

    res.status(500).send({
      success: false,
      message: "AI analysis failed",
    });
  }
});

export default router;