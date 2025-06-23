import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClientConfig";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          navigate("/signup"); // Redirect back to signup on error
          return;
        }

        if (session && session.user) {
          // Successfully authenticated, redirect to dashboard with user ID
          const userId = session.user.id;
          console.log("User authenticated:", session.user);
          navigate(`/dashboard/${userId}`);
        } else {
          // No session found, redirect back to signup
          navigate("/signup");
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error);
        navigate("/signup");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #16a34a",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        ></div>
        <p style={{ color: "#16a34a", fontSize: "16px" }}>
          Completing your sign up...
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AuthCallback;
