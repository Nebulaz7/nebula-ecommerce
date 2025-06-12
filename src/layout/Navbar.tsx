import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarButtonProps {
  text: string;
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
          <div className="logo-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          Nebula
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
            <button className="btn btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
              </svg>
            </button>
            <button className="btn btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
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
