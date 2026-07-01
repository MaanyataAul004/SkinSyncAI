import React, { useState } from "react";

import Layout from "../../components/Layout/Layout";

import {
Link,
useNavigate,
} from "react-router-dom";

const Login = () => {

const navigate =
useNavigate();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const handleLogin = () => {

const savedUser =
  JSON.parse(
    localStorage.getItem(
      "skinsyncUser"
    )
  );

console.log(
  "SAVED USER:",
  savedUser
);

if (!savedUser) {

  alert(
    "No account found. Please register first."
  );

  return;
}

if (
  email === savedUser.email &&
  password === savedUser.password
) {

  localStorage.setItem(
    "skinsyncLoggedIn",
    "true"
  );

  alert(
    `Welcome back, ${savedUser.name} ✨`
  );

  navigate("/advisor");

} else {

  alert(
    "Invalid email or password"
  );
}

};

return (


<Layout title={"Login"}>

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

    {/* LEFT */}

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
                ? "48px"
                : "72px",

            lineHeight: "1",
            color: "#2B2B2B",
          }}
        >
          Welcome
          <br />

          <span
            style={{
              color: "#E89BB0",
              fontStyle: "italic",
            }}
          >
            back.
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
          Continue your
          AI-powered skincare
          journey with SkinSync.
        </p>

      </div>

      {/* BLOB */}

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

    {/* RIGHT */}

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
          backdropFilter:
            "blur(18px)",
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
          Login
        </h2>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email address"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
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

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
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

        {/* BUTTON */}

        <button

          onClick={handleLogin}

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
        >
          Login
        </button>

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "#666",
          }}
        >
          Don’t have an account?

          <Link
            to="/register"
            style={{
              color: "#E89BB0",
              marginLeft: "6px",
              textDecoration:
                "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  </div>

</Layout>


);
};

export default Login;
