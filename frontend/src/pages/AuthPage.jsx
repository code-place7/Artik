import { SignInButton } from "@clerk/clerk-react";
import "../styles/auth.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="glowing-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="auth-left">
        <div className="auth-hero">
          <div className="brand-container">
            <img src="/logo.png" alt="artik" className="brand-logo" />
            <span className="brand-name">Artik</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Where Creativity</span>
            <br />
            Meets Innovation ✨
          </h1>
          <p className="hero-subtitle">
            Connect with Expert Video Editors and Transform Your Content into
            <span className="highlight"> Digital Masterpieces</span>
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span>Real-time Collaboration</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📁</span>
              <span>Secure File Sharing</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Creative Tools</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>

              <span>End-to-End Security</span>
            </div>
          </div>

          <SignInButton mode="modal">
            <button className="cta-button">
              <span className="button-text">Get Started</span>
              <span className="button-arrow">→</span>
            </button>
          </SignInButton>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-image-container">
          <img src="/auth.jpg" alt="Authimage" className="auth-image" />
          <div className="image-overlay"></div>
          <div className="floating-elements">
            <div className="float-element e1">🚀</div>
            <div className="float-element e2">🎬</div>
            <div className="float-element e3">🎨</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
