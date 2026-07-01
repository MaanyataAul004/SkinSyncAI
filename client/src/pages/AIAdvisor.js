import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AIAdvisor = () => {
const [response, setResponse] = useState("");
const [query, setQuery] = useState("");
const [loading, setLoading] = useState(false);
const [showResult, setShowResult] = useState(false);
const [products, setProducts] = useState([]);
const [skinType, setSkinType] = useState("");
const [concerns, setConcerns] = useState([])
const [score, setScore] = useState("");

const navigate = useNavigate();

useEffect(() => {
  const loggedIn =
  localStorage.getItem(
  "skinsyncLoggedIn"
  );
  
  if (!loggedIn) {
  
  navigate("/login");
  }
  
  }, []);
  

const savedUser = JSON.parse(
    localStorage.getItem(
      "skinsyncUser"
    )
  );
  

const handleAnalyze = async () => {
try {
setLoading(true);


const { data } = await axios.post(
    "http://localhost:8080/api/v1/ai/analyze",
    { query }
  );

  console.log(
    "Backend response:",
    data
  );

  setResponse(data.response);

  setProducts(data.matchedProducts);

  setSkinType(data.skinType);

  setConcerns(
    data.detectedConcerns
  );

  setScore(
    data.compatibilityScore
  );

  setShowResult(true);

  setLoading(false);
} catch (error) {
  console.log(
    "FULL ERROR:",
    error.response || error
  );

  setLoading(false);
}

};

return (
<Layout title={"AI Advisor"}>
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom, #F8F7FC, #FFF5F8)",
padding: "80px 20px",
position: "relative",
overflow: "hidden",
}}
>


{/* FLOATING BLOBS */}


    <div
      style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background:
          "rgba(246,199,215,0.22)",
        filter: "blur(90px)",
        top: "-120px",
        left: "-120px",
        zIndex: 1,
      }}
    />

    <div
      style={{
        position: "absolute",
        width: "420px",
        height: "420px",
        borderRadius: "50%",
        background:
          "rgba(191,215,237,0.22)",
        filter: "blur(90px)",
        bottom: "-120px",
        right: "-120px",
        zIndex: 1,
      }}
    />

    {/* MAIN CONTENT */}

    <div
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        textAlign: "center",
        position: "relative",
        zIndex: 5,
      }}
    >
      {/* HERO */}

      <h1
        style={{
          fontSize:
          window.innerWidth < 768
           ? "42px"
           : "72px",
          lineHeight: "1",
          fontWeight: "700",
          color: "#2B2B2B",
          marginBottom: "24px",
        }}
      >
        Your Skin,
        <br />

        <span
          style={{
            color: "#E89BB0",
            fontStyle: "italic",
            textShadow:
              "0 0 24px rgba(232,155,176,0.35)",
          }}
        >
          is understood,
        </span>
        <br />
        {savedUser?.name}
        
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "40px",
          lineHeight: "1.9",
          maxWidth: "700px",
          marginInline: "auto",
        }}
      >
        Describe your skin concerns,
        routine goals, or ingredient
        preferences and receive
        personalized AI-powered
        skincare recommendations.
      </p>

      {/* INPUT CARD */}

      <div
        style={{
          background:
            "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px)",
          padding: "34px",
          borderRadius: "32px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        <textarea
          rows="2"
          placeholder="Example: I have oily acne-prone skin and need a beginner-friendly routine under ₹2000."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          style={{
            width: "100%",
            padding: "22px",
            borderRadius: "24px",
            border:
              "1px solid rgba(0,0,0,0.05)",
            outline: "none",
            resize: "none",
            fontSize: "16px",
            background:
              "rgba(255,255,255,0.75)",
            color: "#2B2B2B",
            lineHeight: "1.5",
            backdropFilter:
              "blur(12px)",
          }}
        />

        {/* QUICK CHIPS */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          {[
            "Routine for dry sensitive skin",
            "Routine for acne scars",
            "Beginner skincare under ₹2000",
            "Oily skin with blackheads",
            "Hydrating skincare routine",
          ].map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setQuery(item)
              }
              style={{
                border: "none",
                padding:
                  "12px 18px",
                borderRadius:
                  "999px",
                background:
                  "rgba(255,255,255,0.7)",
                backdropFilter:
                  "blur(12px)",
                cursor: "pointer",
                color: "#555",
                fontSize: "14px",
                transition:
                  "0.3s ease",
              }}
              onMouseEnter={(
                e
              ) => {
                e.target.style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(
                e
              ) => {
                e.target.style.transform =
                  "translateY(0px)";
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* BUTTON */}

        <button
          onClick={handleAnalyze}
          style={{
            marginTop: "18px",
            padding: "16px 32px",
            border: "none",
            borderRadius: "999px",
            background:
              "linear-gradient(to right, #F6B7C9, #BFD7ED)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow:
              "0 10px 24px rgba(0,0,0,0.08)",
            transition:
              "0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform =
              "translateY(0px)";
          }}
        >
          {loading
            ? "Analyzing..."
            : "Analyze My Skin"}
        </button>

        {/* PIPELINE */}

        {loading && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              lineHeight: "2.2",
              color: "#666",
              maxWidth: "320px",
              marginInline: "auto",
            }}
          >
            ✓ Detecting concerns
            <br />
            ✓ Matching ingredients
            <br />
            ✓ Comparing products
            <br />
            ✓ Building routine
          </div>
        )}
      </div>

      {/* RESULTS */}

      {showResult && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            background:
              "rgba(255,255,255,0.65)",
            backdropFilter:
              "blur(18px)",
            padding: "34px",
            borderRadius: "32px",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.05)",
          }}
        >
          {/* RESPONSE */}

          <h3
            style={{
              marginBottom: "20px",
              color: "#2B2B2B",
            }}
          >
            Personalized
            Recommendation
          </h3>

          <div
            style={{
              padding: "24px",
              borderRadius: "24px",
              background:
                "rgba(255,255,255,0.72)",
              backdropFilter:
                "blur(18px)",
            }}
          >
            <p
              style={{
                color: "#5E5E5E",
                marginTop: "-50px",
                whiteSpace:
                  "pre-line",
                lineHeight: "1.9",
              }}
            >
              {response}
            </p>
          </div>

          {/* PROFILE */}

          {products.length > 0 && (
            <div
              style={{
                marginTop: "0px",
              }}
            >
              <div
                style={{
                  background:
                    "rgba(255,255,255,0.72)",
                  backdropFilter:
                    "blur(18px)",
                  padding: "28px",
                  borderRadius:
                    "28px",
                  marginBottom:
                    "36px",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.04)",
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "22px",
                    color:
                      "#2B2B2B",
                  }}
                >
                  Skin Profile
                  Summary
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                    lineHeight:
                      "1.8",
                  }}
                >
                  <div>
                    <strong>
                      Skin Type:
                    </strong>{" "}
                    {skinType}
                  </div>

                  <div>
                    <strong>
                      Concerns:
                    </strong>{" "}
                    {concerns.join(
                      ", "
                    )}
                  </div>

                  <div>
                    <strong>
                      Routine Level:
                    </strong>{" "}
                    Beginner
                  </div>

                  <div>
                    <strong>
                      Compatibility:
                    </strong>{" "}
                    <span
                      style={{
                        color:
                          "#D98CA4",
                        fontWeight:
                          "700",
                      }}
                    >
                      {score}%
                    </span>
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}

              <h2
                style={{
                  marginBottom:
                    "26px",
                  color:
                    "#2B2B2B",
                }}
              >
                Recommended
                Products
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "22px",
                }}
              >
                {products.map(
                  (
                    product,
                    index
                  ) => (
                    <div
                      key={index}
                      style={{
                        background:
                          "rgba(255,255,255,0.72)",
                        backdropFilter:
                          "blur(18px)",
                        border:
                          "1px solid rgba(255,255,255,0.4)",
                        padding:
                          "26px",
                        borderRadius:
                          "28px",
                        boxShadow:
                          "0 8px 24px rgba(0,0,0,0.05)",
                        transition:
                          "0.3s ease",
                        textAlign:
                          "left",
                      }}
                      onMouseEnter={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(-6px)";
                      }}
                      onMouseLeave={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(0px)";
                      }}
                    >
                      <h3
                        style={{
                          color:
                            "#2B2B2B",
                          marginBottom:
                            "10px",
                        }}
                      >
                        {
                          product.name
                        }
                      </h3>

                      <p
                        style={{
                          color:
                            "#7A7A7A",
                          marginBottom:
                            "10px",
                        }}
                      >
                        {
                          product.category
                        }
                      </p>

                      <h4
                        style={{
                          marginBottom:
                            "18px",
                          color:
                            "#D98CA4",
                        }}
                      >
                        ₹
                        {
                          product.budget
                        }
                      </h4>

                      <div
                        style={{
                          display:
                            "flex",
                          flexWrap:
                            "wrap",
                          gap: "8px",
                          marginBottom:
                            "18px",
                        }}
                      >
                        {product.ingredients.map(
                          (
                            ingredient,
                            idx
                          ) => (
                            <span
                              key={
                                idx
                              }
                              style={{
                                background:
                                  "rgba(255,255,255,0.75)",
                                backdropFilter:
                                  "blur(12px)",
                                border:
                                  "1px solid rgba(0,0,0,0.04)",
                                padding:
                                  "8px 14px",
                                borderRadius:
                                  "999px",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {
                                ingredient
                              }
                            </span>
                          )
                        )}
                      </div>

                      <p
                        style={{
                          color:
                            "#5E5E5E",
                          lineHeight:
                            "1.8",
                        }}
                      >
                        {
                          product.why
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</Layout>


);
};

export default AIAdvisor;
