
import React, { useState } from "react";

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!form.username || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      savedUser &&
      form.username === savedUser.username &&
      form.password === savedUser.password
    ) {
      onLoginSuccess();
    } else {
      alert("Invalid credentials. Please sign up if you're new.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
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
        <h2>Login</h2>
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
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "1rem" }}>
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
