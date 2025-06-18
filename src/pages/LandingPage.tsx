import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";

// Import SVG Icons
import NebcoinIcon from "../assets/Svg/NebcoinIcon";
import StoreIcon from "../assets/Svg/StoreIcon";
import AiIcon from "../assets/Svg/AiIcon";
import DeliveryIcon from "../assets/Svg/DeliveryIcon";
import SecurityIcon from "../assets/Svg/SecurityIcon";
import CommunityIcon from "../assets/Svg/CommunityIcon";
import RocketIcon from "../assets/Svg/RocketIcon";
import CreditCardIcon from "../assets/Svg/CreditCardIcon";
import ShoppingIcon from "../assets/Svg/ShoppingIcon";
import CarIcon from "../assets/Svg/CarIcon";

// Import Images
import ShakingHand from "../assets/images/shaking-hand.jpg";
import WomanClothBusiness from "../assets/images/woman-cloth-business.jpg";
import Drivercar from "../assets/images/driver-car.jpg";
import SellerFruitBusiness from "../assets/images/fruit-business.jpg";

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
      ".slide-in-left, .slide-in-right, .slide-in-up, .fade-in"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="particles"></div>
          <div className="grid-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              The Future of
              <span className="gradient-text"> E-Commerce</span>
              <br />
              Starts Here
            </h1>
            <p className="hero-subtitle">
              Revolutionizing trade with Nebcoin, AI-powered stores, and
              community-driven delivery. Built in Africa, designed for the
              world.
            </p>{" "}
            <div className="hero-cta">
              <Link to="/signup" className="btn btn-primary pulse">
                <RocketIcon width="20" height="20" />
                Join the Waitlist
              </Link>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </button>
            </div>
          </div>{" "}
          <div className="hero-visual">
            <div className="image-placeholder">
              <img
                src={WomanClothBusiness}
                alt="Driver with car"
                className="hero-image"
              />
            </div>
            <div className="floating-card">
              <NebcoinIcon width="24" height="24" />
              <span>Nebcoin</span>
            </div>
            <div className="floating-card delay-1">
              <StoreIcon width="24" height="24" />
              <span>Digital Store</span>
            </div>
            <div className="floating-card delay-2">
              <AiIcon width="24" height="24" />
              <span>AI Assistant</span>
            </div>
          </div>
        </div>
      </section>
      {/* Lagos Banner */}{" "}
      <section className="lagos-banner">
        <div className="container">
          <p className="lagos-text">
            <span>🇳🇬</span>A Lagos-born innovation, connecting commerce,
            currency, and community.
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Why Nebula Changes Everything</h2>
          <div className="features-grid">
            {" "}
            <div className="feature-card slide-in-left">
              <div className="feature-icon nebcoin-gradient">
                <NebcoinIcon />
              </div>
              <h3>Revolutionize with Nebcoin</h3>
              <p>
                Our digital currency simplifies transactions, reduces fees, and
                creates a seamless payment experience for buyers and sellers.
              </p>
            </div>
            <div className="feature-card slide-in-up">
              <div className="feature-icon store-gradient">
                <StoreIcon />
              </div>
              <h3>Own Your Digital Storefront</h3>
              <p>
                Create stunning online stores with zero upfront costs. Showcase
                your products and reach customers across Nigeria and beyond.
              </p>
            </div>
            <div className="feature-card slide-in-right">
              <div className="feature-icon delivery-gradient">
                <DeliveryIcon />
              </div>
              <h3>Drive, Deliver, Earn</h3>
              <p>
                Turn your car into a source of income. Join our delivery network
                and earn Nebcoin by connecting sellers with customers.
              </p>
            </div>
            <div className="feature-card slide-in-left">
              <div className="feature-icon ai-gradient">
                <AiIcon />
              </div>
              <h3>Powered by AI</h3>
              <p>
                Our intelligent shop assistant helps sellers optimize inventory,
                predict trends, and grow their business with data-driven
                insights.
              </p>
            </div>
            <div className="feature-card slide-in-up">
              <div className="feature-icon security-gradient">
                <SecurityIcon />
              </div>
              <h3>Secure & Scalable</h3>
              <p>
                Built with enterprise-grade security and designed to scale
                across Africa. Your transactions and data are always protected.
              </p>
            </div>
            <div className="feature-card slide-in-right">
              <div className="feature-icon community-gradient">
                <CommunityIcon />
              </div>
              <h3>Made for Africa</h3>
              <p>
                Understanding local needs, payment preferences, and delivery
                challenges. Built by Africans, for African commerce.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How Nebula Works</h2>
          <div className="steps-container">
            {" "}
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <CreditCardIcon />
              </div>
              <h3>Purchase Nebcoin</h3>
              <p>
                Convert your Naira to Nebcoin through our secure payment system.
                Get instant digital currency for all your transactions.
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <ShoppingIcon />
              </div>
              <h3>Shop & Sell</h3>
              <p>
                Browse thousands of products or create your own store. Use
                Nebcoin for seamless, instant transactions.
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <CarIcon />
              </div>
              <h3>Fast Delivery</h3>
              <p>
                Our network of drivers ensures quick delivery. Track your order
                in real-time from store to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* AI Assistant Showcase */}
      <section className="ai-showcase-section">
        <div className="container">
          <div className="ai-content">
            <div className="ai-text">
              <h2>Meet Your AI Shop Assistant</h2>
              <p>
                Our advanced AI analyzes market trends, optimizes your
                inventory, and provides personalized recommendations to grow
                your business. It's like having a business consultant available
                24/7.
              </p>{" "}
              <ul className="ai-features">
                <li>📊 Sales Analytics & Insights</li>
                <li>📈 Demand Forecasting</li>
                <li>🎯 Customer Behavior Analysis</li>
                <li>💡 Optimization Recommendations</li>
              </ul>
              <Link to="/signup" className="btn btn-primary">
                Try AI Assistant
              </Link>
            </div>{" "}
            <div className="ai-visual">
              <div className="image-placeholder">
                <img
                  src={ShakingHand}
                  alt="Business handshake"
                  className="ai-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* For Sellers Section */}
      <section className="for-sellers-section">
        {" "}
        <div className="container">
          <div className="sellers-content">
            {" "}
            <div className="sellers-visual">
              <div className="image-placeholder">
                <img
                  src={SellerFruitBusiness}
                  alt="Fruit business seller"
                  className="seller-image"
                />
              </div>
            </div>
            <div className="sellers-text">
              <h2>Build Your Empire</h2>
              <p>
                Transform your business with a professional online store. No
                technical skills required - just your passion and products.
              </p>
              <div className="seller-benefits">
                <div className="benefit">
                  <div className="benefit-icon">
                    <RocketIcon />
                  </div>
                  <div>
                    <h4>Quick Setup</h4>
                    <p>Launch your store in minutes, not days</p>
                  </div>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">
                    <NebcoinIcon />
                  </div>
                  <div>
                    <h4>Low Fees</h4>
                    <p>
                      Keep more of your earnings with our transparent pricing
                    </p>
                  </div>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">
                    <StoreIcon />
                  </div>
                  <div>
                    <h4>Mobile-First</h4>
                    <p>Manage your store from anywhere, anytime</p>
                  </div>
                </div>
              </div>
              <Link to="/signup" className="btn btn-primary">
                Start Selling Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* For Drivers Section */}
      <section className="for-drivers-section">
        <div className="container">
          <div className="drivers-content">
            <div className="drivers-text">
              <h2>Drive Your Success</h2>
              <p>
                Turn your vehicle into a profitable business. Join thousands of
                drivers earning extra income with flexible delivery schedules.
              </p>
              <div className="driver-stats">
                <div className="stat">
                  <h3>₦50K+</h3>
                  <p>Average monthly earnings</p>
                </div>
                <div className="stat">
                  <h3>500+</h3>
                  <p>Active drivers in Lagos</p>
                </div>
                <div className="stat">
                  <h3>4.8⭐</h3>
                  <p>Driver satisfaction rating</p>
                </div>
              </div>
              <Link to="/signup" className="btn btn-primary">
                Become a Driver
              </Link>
            </div>{" "}
            <div className="drivers-visual">
              <div className="image-placeholder">
                <img
                  src={Drivercar}
                  alt="Woman entrepreneur with cloth business"
                  className="driver-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Developer CTA Section */}
      <section className="developer-section">
        <div className="container">
          <div className="dev-content">
            <h2>Build the Future with Us</h2>
            <p>
              Are you a visionary developer in Lagos or beyond? Come shape the
              future of African e-commerce with us. Nebula is open-source,
              community-powered, and on a mission to redefine trade. Let's build
              the future, together.
            </p>{" "}
            <div className="dev-cta">
              <a href="#" className="btn btn-secondary">
                <AiIcon width="20" height="20" />
                Contribute Now
              </a>
              <a href="#" className="btn btn-outline">
                Join Our Dev Slack
              </a>
            </div>
            <div className="tech-stack">
              <span>Built with:</span>
              <div className="tech-icons">
                <span>React</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2>Ready to Join the Revolution?</h2>
            <p>
              Be part of Nigeria's next big e-commerce breakthrough. Join
              thousands already on the waitlist.
            </p>{" "}
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary large">
                <RocketIcon width="20" height="20" />
                Join the Waitlist
              </Link>
              <Link to="/login" className="btn btn-secondary large">
                Get Started
              </Link>
            </div>
            <p className="cta-note">
              🎉 Early adopters get exclusive Nebcoin bonuses!
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path
                      d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Nebula</span>
              </div>
              <p>Connecting commerce, currency, and community across Africa.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Platform</h4>
                <a href="#">For Sellers</a>
                <a href="#">For Drivers</a>
                <a href="#">For Developers</a>
                <a href="#">Nebcoin</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
                <a href="#">Contact</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Community</a>
                <a href="#">API Docs</a>
                <a href="#">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Nebula. Made with ❤️ in Lagos, Nigeria.</p>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
