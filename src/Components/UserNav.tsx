import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/UserNav.css";
import NbuyLogo from "../assets/Svg/NbuyLogo";

interface UserNavProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("Signing out...");
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            <NbuyLogo />
          </Link>
        </div>

        {/* User Avatar Section */}
        <div className="nav-user">
          {/* Desktop Dropdown */}
          <div
            className="user-avatar-container desktop-only"
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

            {/* Dropdown Arrow */}
            <svg
              className={`dropdown-arrow ${isDropdownOpen ? "rotated" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Desktop Dropdown Menu */}
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

          {/* Mobile Hamburger Menu */}
          <div className="mobile-menu-container mobile-only">
            <button
              className="hamburger-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`mobile-slide-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-user-info">
              <div className="mobile-user-avatar">
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
              <div className="mobile-user-details">
                <p className="mobile-user-name">{user?.name || "User"}</p>
                <p className="mobile-user-email">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <button
              className="close-btn"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="mobile-menu-items">
            <Link
              to="/profile"
              className="mobile-menu-item"
              onClick={toggleMobileMenu}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24" fill="none">
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

            <Link
              to="/wallet"
              className="mobile-menu-item"
              onClick={toggleMobileMenu}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24" fill="none">
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
              className="mobile-menu-item sign-out"
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24" fill="none">
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
      </div>
    </nav>
  );
};

export default UserNav;
