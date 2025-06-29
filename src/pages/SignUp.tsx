import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/SignUp.css";
import silkBg from "../assets/images/silk-background.png";
import supabase from "../config/SupabaseClientConfig";
import Navbar from "../layout/Navbar";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("At least 8 characters long");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("At least one digit");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("At least one special character");
    }

    return errors;
  };

  // Handle password change with validation
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const errors = validatePassword(value);
    setPasswordErrors(errors);
  };

  // Check if passwords match
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const passwordsNoMatch =
    confirmPassword !== "" && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password before submission
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      console.error("Password validation failed:", passwordValidationErrors);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const userData = {
      firstname,
      lastName,
      email,
      password,
    };

    try {
      // Send POST request to your custom backend
      const response = await fetch("https://your-backend.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("Sign up error:", response.statusText);
        return;
      }
      // Example: Parse response and navigate user
      const data = await response.json();
      console.log("Sign up success:", data);

      // Reset form on success
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordErrors([]);

      // Redirect user to dashboard/id (customize as needed)
      navigate(`/dashboard/${data.userId || "defaultId"}`);
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
    }
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
    // Handle Facebook sign-in logic here
    console.log("X sign-in clicked");
  };

  return (
    <>
      <Navbar text="login" onNavigate="/login" />
      <div
        className="signup-container"
        style={{ backgroundImage: `url(${silkBg})` }}
      >
        <div className="signup-overlay"></div>
        <div className="signup-columns">
          <div className="signup-about">
            <h1>Welcome to N-buy</h1>
            <p>
              The future of e-commerce in Africa starts here. Join a community
              of sellers, drivers, and innovators.
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
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="*****"
                    id="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 1l22 22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="password-requirements">
                    <p className="requirements-title">Password must contain:</p>
                    <ul className="requirements-list">
                      <li
                        className={password.length >= 8 ? "valid" : "invalid"}
                      >
                        <span className="requirement-icon">
                          {password.length >= 8 ? "✓" : "✗"}
                        </span>
                        At least 8 characters
                      </li>
                      <li
                        className={/[a-z]/.test(password) ? "valid" : "invalid"}
                      >
                        <span className="requirement-icon">
                          {/[a-z]/.test(password) ? "✓" : "✗"}
                        </span>
                        One lowercase letter
                      </li>
                      <li
                        className={/[A-Z]/.test(password) ? "valid" : "invalid"}
                      >
                        <span className="requirement-icon">
                          {/[A-Z]/.test(password) ? "✓" : "✗"}
                        </span>
                        One uppercase letter
                      </li>
                      <li
                        className={/[0-9]/.test(password) ? "valid" : "invalid"}
                      >
                        <span className="requirement-icon">
                          {/[0-9]/.test(password) ? "✓" : "✗"}
                        </span>
                        One digit
                      </li>
                      <li
                        className={
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
                            ? "valid"
                            : "invalid"
                        }
                      >
                        <span className="requirement-icon">
                          {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            password
                          )
                            ? "✓"
                            : "✗"}
                        </span>
                        One special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="*****"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 1l22 22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div
                    className={`password-match ${
                      passwordsMatch
                        ? "match"
                        : passwordsNoMatch
                        ? "no-match"
                        : ""
                    }`}
                  >
                    {passwordsMatch ? (
                      <span className="match-message">
                        <span className="match-icon">✓</span>
                        Passwords match
                      </span>
                    ) : passwordsNoMatch ? (
                      <span className="no-match-message">
                        <span className="match-icon">✗</span>
                        Passwords do not match
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
              <button type="submit" className="signup-btn">
                Sign Up
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
                  Sign Up with Google
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
                  Sign Up with X
                </button>
              </p>
            </div>
            <p className="login-link">
              Already have an account? <Link to="/login"> Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
