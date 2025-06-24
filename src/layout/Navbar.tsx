import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarButtonProps {
  text?: string;
  onNavigate?: string;
}

function Navbar({ text, onNavigate }: NavbarButtonProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg
            width="200"
            height="60"
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <rect
                x="10"
                y="15"
                width="30"
                height="20"
                rx="4"
                fill="#16a34a"
              />
              <polygon points="10,15 10,35 25,35 10,15" fill="white" />
              <circle cx="15" cy="40" r="5" fill="#1E2A38" />
              <circle cx="35" cy="40" r="5" fill="#1E2A38" />
            </g>

            <text
              x="50"
              y="35"
              font-family="Segoe UI, sans-serif"
              font-size="24"
              fill="#1E2A38"
              font-weight="bold"
            >
              N-Buy
            </text>
          </svg>
        </Link>{" "}
        <div className="navbar-content">
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/shop" className="navbar-link">
                Shop
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/about" className="navbar-link">
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">
                Contact
              </Link>
            </li>
          </ul>

          <button
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></div>
            <div
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></div>
            <div
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></div>
          </button>

          <div className="navbar-actions">
            <Link to={onNavigate || "/"} className="btn btn-primary">
              <span>{text}</span>
            </Link>
            <button className="btn btn-icon">Join Waitlist</button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <Link
                to="/"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link
                to="/shop"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link
                to="/about"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link
                to="/contact"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-menu-actions">
            <Link
              to={onNavigate || "/"}
              className="btn btn-primary mobile-menu-button"
              onClick={closeMobileMenu}
            >
              <span>{text}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
