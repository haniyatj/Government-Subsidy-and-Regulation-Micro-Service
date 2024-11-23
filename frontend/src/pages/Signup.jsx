import React from "react";
import "../styles/Signup.css";
const Signup = () => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Government Official Signup</h2>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" required />
        <label>Email</label>
        <input type="email" placeholder="Enter your email" required />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required />
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
