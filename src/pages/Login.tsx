import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import silkBg from "../assets/images/silk-background.png";
import supabase from "../config/SupabaseClientConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, password });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google sign-in error:", error);
        return;
      }

      // The redirect to dashboard with user ID will be handled by AuthCallback component
      console.log("Google sign-in initiated:", data);
    } catch (error) {
      console.error("Unexpected error during Google sign-in:", error);
    }
  };

  const handleXSigin = () => {
    // Handle X sign-in logic here
    console.log("X sign-in clicked");
  };

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${silkBg})` }}
    >
      <div className="signup-overlay"></div>
      <div className="signup-columns">
        <div className="signup-card">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">
                Password{" "}
                <span className="forgot-password">Forgot Password?</span>
              </label>
              <input
                type="password"
                placeholder="*****"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-me">
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" name="remember-me" />
                Remember Me
              </label>
            </div>
            <button type="submit" className="signup-btn">
              Log In
            </button>
          </form>
          <p>or</p>
          <div className="social-signup">
            <p>
              <button
                className="google-signup-btn"
                onClick={handleGoogleSignIn}
              >
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>{" "}
                Log In with Google
              </button>
            </p>
            <p>
              <button className="facebook-signup-btn" onClick={handleXSigin}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#000000"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
                Log In with X
              </button>
            </p>
          </div>
          <p className="login-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
