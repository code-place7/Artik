import { SignInButton } from "@clerk/clerk-react";
import "../styles/auth.css";
import toast from "react-hot-toast";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-hero">
          <div className="brand-container">
            <img src="/logo.png" alt="artik" className="brand-logo" />
            <span className="brand-name">Artik</span>
          </div>
          <h1 className="hero-title">Where Work Happens 💫</h1>
          <p className="hero-subtitle">
            Connect with Expert Video Editors and Transform Your Content into
            Digital Masterpieces
          </p>

          <div className="features-list">
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
            <button
              className="cta-button"
              onClick={() => {
                toast.success("Redirecting to sign in...");
              }}
            >
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
