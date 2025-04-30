// src/components/SignUp.jsx
import React, { useState } from "react";

const SignUp = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.username || !form.password) {
      alert("Please fill in both fields.");
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(form));
    alert("Signup successful! Please login.");
    onSwitchToLogin(); // go to login after signup
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Sign Up</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
