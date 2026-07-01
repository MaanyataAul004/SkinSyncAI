import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

return (
<Layout title={"Register"}>
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom, #F8F7FC, #FFF5F8)",
display: "grid",
gridTemplateColumns:
window.innerWidth < 900
  ? "1fr"
  : "1fr 1fr",
}}
>
{/* LEFT SIDE */}


    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize:
            window.innerWidth < 768
              ? "42px"
              : "72px",
            lineHeight: "1",
            color: "#2B2B2B",
          }}
        >
          Hello,
          <br />

          <span
            style={{
              color: "#E89BB0",
              fontStyle: "italic",
            }}
          >
            there!!
          </span>
        </h1>

        <p
          style={{
            marginTop: "24px",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#666",
            maxWidth: "480px",
          }}
        >
          Build your personalized
          skincare journey with
          AI-powered recommendations.
        </p>
      </div>

      {/* FLOATING BLOB */}

      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "rgba(246,199,215,0.4)",
          filter: "blur(90px)",
          top: "-100px",
          left: "-100px",
        }}
      />
    </div>

    {/* RIGHT SIDE */}

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background:
            "rgba(255,255,255,0.6)",
          backdropFilter: "blur(18px)",
          borderRadius: "32px",
          padding: "42px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            color: "#2B2B2B",
          }}
        >
          Register
        </h2>


        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "18px",
            background: "#fff",
          }}
        />

        
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "18px",
            background: "#fff",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "24px",
            background: "#fff",
          }}
        />

        <select
        style={{
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        marginBottom: "18px",
        background: "#fff",
        }}

        >

          <option>
          Select primary skin goal
          </option>

          <option>Clear acne</option>

          <option>Hydration</option>

          <option>Barrier repair</option>

          <option>Brightening</option>

          <option>Anti-aging</option>
        </select>


        <button
          style={{
            width: "100%",
            padding: "18px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(to right, #F6B7C9, #BFD7ED)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {

            if (
            !name ||
            !email ||
            !password
            ) {
            alert(
            "Please fill all fields"
            );
            
    
            return;
      
            
            }
            
            const userData = {
            name,
            email,
            password,
            };
            
            localStorage.setItem(
            "skinsyncUser",
            JSON.stringify(userData)
            );
            
            alert(
            "Account created successfully ✨"
            );
            
            navigate("/login");
            }}
            
        >
          Register
        </button>

        <p
          style={{ marginTop: "18px",  textAlign: "center", color: "#666", }}>
          Already have an account?
          <Link to="/login" style={{color: "#E89BB0",marginLeft: "6px",cursor: "pointer",fontWeight: "600",textDecoration: "none",}}>
                  Login
          </Link>

        </p>

      </div>
    </div>
  </div>
</Layout>


);
};

export default Register;
