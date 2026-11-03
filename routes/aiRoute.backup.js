import express from "express";
import products from "../data/products.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
try {

const { query } = req.body;

const lowerQuery =
  query.toLowerCase();


let budget = null;

const budgetMatch =
lowerQuery.match(/\d+/);

if (budgetMatch) {

budget = parseInt(
budgetMatch[0]
);
}



const isBeginner =
  lowerQuery.includes(
    "beginner"
  );

const wantsRoutine =
  lowerQuery.includes(
    "routine"
  );



const detectedConcerns = [];

if (
  lowerQuery.includes("acne")
)
  detectedConcerns.push(
    "acne"
  );

if (
  lowerQuery.includes("oily")
)
  detectedConcerns.push(
    "oiliness"
  );

if (
  lowerQuery.includes("dry")
)
  detectedConcerns.push(
    "dryness"
  );

if (
  lowerQuery.includes(
    "sensitive"
  )
)
  detectedConcerns.push(
    "sensitivity"
  );

if (
  lowerQuery.includes(
    "blackheads"
  )
)
  detectedConcerns.push(
    "blackheads"
  );

if (
  lowerQuery.includes(
    "dehydrated"
  )
)
  detectedConcerns.push(
    "dehydration"
  );



let skinType = "Combination";

if (
  lowerQuery.includes("oily")
) {
  skinType = "Oily";
}

if (
  lowerQuery.includes("dry")
) {
  skinType = "Dry";
}

if (
  lowerQuery.includes(
    "sensitive"
  )
) {
  skinType = "Sensitive";
}



const compatibilityScore =
  Math.floor(
    Math.random() * 15
  ) + 85;


let matchedProducts = [];



if (
  detectedConcerns.length > 0
) {

  matchedProducts =
    products.filter(
      (product) =>

        product.concerns.some(
          (concern) =>

            detectedConcerns.includes(
              concern
            )
        )
    );

} else {



  matchedProducts =
    products;
}



if (isBeginner) {

  matchedProducts =
    matchedProducts.filter(
      (product) =>

        product.category !==
        "Active"
    );
}



if (budget) {

  matchedProducts =
    matchedProducts.filter(
      (product) =>

        product.budget <=
        budget
    );
}



if (
  matchedProducts.length === 0
  ) {
  
  matchedProducts =
  products.filter(
  (product) =>
  

      !budget ||
  
      product.budget <= budget
  );

  
  matchedProducts =
  matchedProducts.slice(0, 3);
  }
  



matchedProducts =
  matchedProducts.slice(0, 4);




const response = `
Skin Analysis:
Your skin concerns appear related to ${detectedConcerns.length > 0 ? detectedConcerns.join(", ") : "general skincare maintenance"}.
${isBeginner ? "This routine is beginner-friendly and focuses on gentle skincare.\n": ""}
${wantsRoutine ? "A personalized skincare routine has been generated for your needs.\n": ""}
Recommended Products:
${matchedProducts.map((product) =>`• ${product.name} (${product.category}) - ₹${product.budget}`).join("\n")}

Suggested Routine:
1. Gentle Cleanser
2. Treatment Serum
3. Moisturizer
4. Sunscreen SPF 50

`;



console.log(
  "QUERY:",
  query
);

console.log(
  "CONCERNS:",
  detectedConcerns
);

console.log(
  "MATCHES:",
  matchedProducts
);

console.log(
  "FINAL RESPONSE:",
  response
);



res.status(200).send({
  success: true,

  response,

  matchedProducts,

  skinType,

  compatibilityScore,

  detectedConcerns,
});

} catch (error) {

console.log(
  "AI ROUTE ERROR:",
  error
);

res.status(500).send({
  success: false,
  message:
    "AI analysis failed",
});

}
});

export default router;
