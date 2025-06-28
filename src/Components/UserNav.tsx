import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/UserNav.css";

interface UserNavProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("Signing out...");
    navigate("/");
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="user-nav">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">N-buy</span>
          </Link>
        </div>

        {/* User Avatar Section */}
        <div className="nav-user">
          <div
            className="user-avatar-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="user-avatar">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="avatar-image"
                />
              ) : (
                <span className="avatar-initials">
                  {getUserInitials(user?.name)}
                </span>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-email">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <svg
                      className="dropdown-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Profile
                  </Link>
                  <Link to="/wallet" className="dropdown-item">
                    <svg
                      className="dropdown-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 12V7H5a2 2 0 0 1 0-4h14v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 5v14a2 2 0 0 0 2 2h16v-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="17"
                        cy="12"
                        r="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Wallet
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="dropdown-item sign-out"
                  >
                    <svg
                      className="dropdown-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="16,17 21,12 16,7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="21"
                        y1="12"
                        x2="9"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
