import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
return (
<Layout title={"About SkinSync AI"}>
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom, #F8F7FC, #FFF5F8)",
padding:
window.innerWidth < 768
  ? "70px 18px"
  : "100px 24px",
}}
>
<div
style={{
maxWidth: "1200px",
margin: "0 auto",
}}
>
{/* HERO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "120px",
        }}
      >
        <p
          style={{
            letterSpacing: "3px",
            color: "#777",
            marginBottom: "18px",
          }}
        >
          ABOUT SKINSYNC AI
        </p>

        <h1
          style={{
            fontSize:
            window.innerWidth < 768
              ? "42px"
              : "72px",
            lineHeight: "1.1",
            color: "#2B2B2B",
            marginBottom: "28px",
          }}
        >
          Personalized skincare,
          <br />

          intelligently simplified.
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            fontSize: "20px",
            lineHeight: "1.9",
            color: "#666",
          }}
        >
          SkinSync AI is an
          AI-powered skincare advisor
          designed to help users navigate
          skincare routines, ingredients,
          and product choices through
          intelligent personalized
          recommendations.
        </p>
      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
        }}
      >
        {/* CARD 1 */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            padding: "36px",
            borderRadius: "32px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              color: "#2B2B2B",
            }}
          >
            The Problem
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: "#666",
            }}
          >
            Modern skincare can feel
            overwhelming. Users often
            struggle to understand skin
            concerns, ingredient
            compatibility, and product
            suitability among thousands
            of available options.
          </p>
        </div>

        {/* CARD 2 */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            padding: "36px",
            borderRadius: "32px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              color: "#2B2B2B",
            }}
          >
            AI Intelligence
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: "#666",
            }}
          >
            SkinSync AI analyzes user
            concerns using natural
            language input, identifies
            skincare goals, and matches
            ingredients and routines
            using intelligent filtering
            and recommendation logic.
          </p>
        </div>

        {/* CARD 3 */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            padding: "36px",
            borderRadius: "32px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              color: "#2B2B2B",
            }}
          >
            Our Mission
          </h2>

          <p
            style={{
              lineHeight: "1.9",
              color: "#666",
            }}
          >
            We aim to make skincare
            education and personalization
            more accessible through
            AI-driven guidance,
            beginner-friendly routines,
            and transparent ingredient
            intelligence.
          </p>
        </div>
      </div>
    </div>
  </div>
</Layout>

);
};

export default About;
