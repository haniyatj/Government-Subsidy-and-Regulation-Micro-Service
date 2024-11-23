import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can implement your login logic, e.g., calling an API for authentication
    // If the login is successful, navigate to the dashboard
    // For now, we'll assume the login is successful when the form is submitted.

    // Example logic:
    if (email === "admin@example.com" && password === "password") {
      navigate("/dashboard");  // Navigate to the dashboard after successful login
    } else {
      alert("Invalid credentials");  // Handle invalid login
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Government Official Login</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>

        {/* Link for Sign Up */}
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
