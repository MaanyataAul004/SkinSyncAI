import React from "react";
import Layout from "../components/Layout/Layout";

const HomePage = () => {
return (
<Layout title={"SkinSync AI"}>
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom, #F8F7FC, #FFF5F8)",
position: "relative",
overflow: "hidden",
display: "flex",
alignItems: "center",
justifyContent: "center",
padding: "40px",
}}
>
{/* CENTER CONTENT */}

    <div
      style={{
        textAlign: "center",
        zIndex: 10,
        maxWidth: "900px",
      }}
    >
      <p
        style={{
          letterSpacing: "4px",
          fontSize: "14px",
          color: "#777",
          marginBottom: "20px",
        }}
      >
        AI-POWERED SKINCARE INTELLIGENCE
      </p>

      <h1
        style={{
         
          fontSize:
            window.innerWidth < 768
              ? "62px"
              : "110px",
          lineHeight: "0.95",
          color: "#2B2B2B",
          fontWeight: "700",
        }}
      >
        Your Skin,
        <br />

        <span
          style={{
            color: "#E89BB0",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          understood.
        </span>
      </h1>

      <p
        style={{
          marginTop: "28px",
          fontSize: "20px",
          lineHeight: "1.9",
          color: "#666",
          maxWidth: "650px",
          marginInline: "auto",
        }}
      >
        Personalized skincare routines,
        ingredient intelligence, and
        AI-driven recommendations
        tailored to your skin concerns.
      </p>
    </div>

    {/* FLOATING CARD 1 */}

    <div
      style={{
        position: "absolute",
        top: "190px",
        left: "190px",
        width: "150px",
        padding: "24px",
        background:
          "linear-gradient(to top right, #FFB0DC, #F6C7D7)",
        backdropFilter: "blur(18px)",
        borderRadius: "28px",
        animation:
          "floaty 4s ease-in-out infinite",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.06)",
        transform: "rotate(-8deg)",
      }}
    >
      Pretty Skin, Pretty Soul,
      Pretty You!!
    </div>


    <div
      style={{
        position: "absolute",
        top: "240px",
        right: "200px",
        width: "180px",
        padding: "24px",
        background:
        "linear-gradient(to right, #FFC0CB, #E36887)",
        backdropFilter: "blur(18px)",
        borderRadius: "28px",
        animation:
          "floaty 7s ease-in-out infinite",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.06)",
        transform: "rotate(-8deg)",
      }}
    >
      Clean girl era 💅🏻
    </div>

    {/* FLOATING CARD 3 */}

    <div
      style={{
        position: "absolute",
        bottom: "120px",
        left: "160px",
        width: "280px",
        padding: "22px",
        background:
          "#F8BEE3",
        backdropFilter: "blur(18px)",
        borderRadius: "24px",
        animation:
          "floaty 4s ease-in-out infinite",
        transform: "rotate(6deg)",
      }}
    >
      glowing skin is always in ✨
    </div>

    {/* FLOATING CARD 4 */}

    <div
      style={{
        position: "absolute",
        bottom: "120px",
        right: "100px",
        width: "220px",
        padding: "24px",
        borderRadius: "28px",
        background:
          "#FFB3CC",
        backdropFilter: "blur(18px)",
        animation:
          "floaty 6s ease-in-out infinite",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      hot girls wear SPF 50 
    </div>

    {/* FLOATING CARD 5 */}

    <div
      style={{
        position: "absolute",
        top: "100px",
        right: "420px",
        width: "320px",
        padding: "20px",
        borderRadius: "24px",
        background:
          "#FFC0CB",
        color: "#2B2B2B",
        backdropFilter: "blur(18px)",
        animation:
          "floaty 3s ease-in-out infinite",
        transform: "rotate(-10deg)",
      }}
    >
      summer 2026 mood: hydrated skin 
    </div>
  </div>
</Layout>

);
};

export default HomePage;
