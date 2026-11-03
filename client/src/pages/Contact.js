import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [status, setStatus] = useState("");

const handleSend = () => {
  if (!name.trim() || !email.trim() || !message.trim()) {
    setStatus("Please fill in your name, email and message.");
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    setStatus("Please enter a valid email address.");
    return;
  }
  // Demo form: the message is saved in this browser (no email server yet)
  try {
    const saved = JSON.parse(localStorage.getItem("skinsyncMessages")) || [];
    saved.push({ name, email, message, sentAt: new Date().toISOString() });
    localStorage.setItem("skinsyncMessages", JSON.stringify(saved));
  } catch (e) {
    console.log("Could not save message:", e);
  }
  setStatus(`Thank you, ${name.trim()}! We have received your message ✨`);
  setName("");
  setEmail("");
  setMessage("");
};

return (
<Layout title={"Contact"}>
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
display: "grid",
gridTemplateColumns:
window.innerWidth < 900
  ? "1fr"
  : "1fr 1fr",
gap: "50px",
alignItems: "center",
}}
>
{/* LEFT SIDE */}


      <div>
        <p
          style={{
            letterSpacing: "3px",
            color: "#777",
            marginBottom: "18px",
          }}
        >
          CONTACT US
        </p>

        <h1
          style={{
            fontSize:
            window.innerWidth < 768
              ? "42px"
              : "72px",
            lineHeight: "1.1",
            marginBottom: "28px",
            color: "#2B2B2B",
          }}
        >
          Let’s talk
          <br />

          skincare.
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.9",
            color: "#666",
            maxWidth: "500px",
          }}
        >
          Questions, feedback, ideas,
          or skincare discussions —
          we’d love to hear from you.
        </p>

        {/* FLOATING CARD */}

        <div
          style={{
            marginTop: "40px",
            background:
              "rgba(255,255,255,0.6)",
            backdropFilter: "blur(16px)",
            padding: "28px",
            borderRadius: "28px",
            maxWidth: "320px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
            transform: "rotate(-4deg)",
          }}
        >
          hydration ✨
          <br />
          healthy barrier
          <br />
          SPF daily
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        style={{
          background:
            "rgba(255,255,255,0.7)",
          backdropFilter: "blur(18px)",
          borderRadius: "32px",
          padding: "42px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "18px",
            background: "#fff",
          }}
        />

        <textarea
          rows="6"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "24px",
            background: "#fff",
            resize: "none",
          }}
        />

        <button
          onClick={handleSend}
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
          Send Message ✨
        </button>

        {status && (
          <p style={{ marginTop: "18px", color: "#666", lineHeight: "1.6" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  </div>
</Layout>


);
};

export default Contact;