import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/SignUp.css";
import SellerFruitBusiness from "../assets/images/fruit-business.jpg"; // Adjust the path as necessary

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, password });
  };

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${SellerFruitBusiness})` }}
    >
      <div className="signup-overlay"></div>
      <div className="signup-columns">
        <div className="signup-about">
          <h1>Welcome to Nebula</h1>
          <p>
            The future of e-commerce in Africa starts here. Join a community of
            sellers, drivers, and innovators.
          </p>
          <ul>
            <li>Powered by Nebcoin digital currency.</li>
            <li>AI-assisted storefronts.</li>
            <li>Community-driven delivery.</li>
          </ul>
          <Link to="/" className="back-to-home">
            Back to Home
          </Link>
        </div>
        <div className="signup-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="*****"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
