import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClientConfig";

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    full_name?: string;
  };
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get the current session to verify the user
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          navigate("/signup");
          return;
        }

        if (!session || !session.user) {
          console.log("No active session found");
          navigate("/signup");
          return;
        } // Verify that the URL parameter matches the authenticated user
        if (session.user.id !== id) {
          console.log("User ID mismatch");
          navigate("/signup");
          return;
        }

        // Check if user has completed profile setup
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.log("Profile not found, redirecting to setup");
          navigate(`/signup-steps/${session.user.id}`);
          return;
        }

        if (!profile) {
          navigate(`/signup-steps/${session.user.id}`);
          return;
        }

        setUser(session.user);
      } catch (error) {
        console.error("Error in Dashboard:", error);
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getUser();
    } else {
      navigate("/signup");
    }
  }, [id, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  if (loading) {
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
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Loading your dashboard...
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
  }

  if (!user) {
    return null; // This will not render since we redirect if no user
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1a202c",
                margin: "0 0 8px 0",
              }}
            >
              Welcome to N-buy Dashboard!
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#64748b",
                margin: "0",
              }}
            >
              Your e-commerce journey starts here.
            </p>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc2626")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ef4444")
            }
          >
            Sign Out
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1a202c",
              margin: "0 0 16px 0",
            }}
          >
            User Information
          </h2>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <strong style={{ color: "#374151" }}>User ID:</strong>
              <span
                style={{
                  marginLeft: "8px",
                  color: "#6b7280",
                  fontFamily: "monospace",
                }}
              >
                {user.id}
              </span>
            </div>

            {user.email && (
              <div>
                <strong style={{ color: "#374151" }}>Email:</strong>
                <span style={{ marginLeft: "8px", color: "#6b7280" }}>
                  {user.email}
                </span>
              </div>
            )}

            {user.user_metadata?.full_name && (
              <div>
                <strong style={{ color: "#374151" }}>Name:</strong>
                <span style={{ marginLeft: "8px", color: "#6b7280" }}>
                  {user.user_metadata.full_name}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            padding: "20px",
            border: "1px solid #0ea5e9",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0c4a6e",
              margin: "0 0 12px 0",
            }}
          >
            🎉 Successfully Authenticated!
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#0369a1",
              margin: "0 0 8px 0",
            }}
          >
            You have successfully signed in with Google OAuth through Supabase.
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#0369a1",
              margin: "0",
            }}
          >
            Your dashboard URL includes your unique user ID:{" "}
            <code
              style={{
                backgroundColor: "#e0f2fe",
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
            >
              /dashboard/{id}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
