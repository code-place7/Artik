import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const features = [
  {
    icon: "⭐",
    title: "Customer Satisfaction",
    description: "Rated 4.9 — we prioritize your feedback.",
  },
  {
    icon: "💸",
    title: "Easily Affordable",
    description: "Clear pricing and flexible packages.",
  },
  {
    icon: "🔥",
    title: "Trending Editing",
    description: "Cuts and styles aligned with current trends.",
  },
];

export default function HomePage() {
  const videoRefs = useRef([]);
  const [playing, setPlaying] = useState({});

  const togglePlay = (idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    if (v.paused) {
      // user interaction -> safe to unmute if desired
      v.muted = false;
      v.play()
        .then(() => setPlaying((p) => ({ ...p, [idx]: true })))
        .catch(() => setPlaying((p) => ({ ...p, [idx]: false })));
    } else {
      v.pause();
      setPlaying((p) => ({ ...p, [idx]: false }));
    }
  };

  return (
    <main className="home-root">
      <header className="hero-wrap">
        <div className="hero-card">
          <div className="brand-container">
            <img src="/logo.png" alt="Artik" className="brand-logo" />
            <span className="brand-name">Artik</span>
          </div>

          <h1 className="hero-title">
            Professional Editing
            <br />
            <span className="hero-accent">Exceptional Results</span>
          </h1>

          <p className="hero-desc">
            Connect with expert editors who transform your content from good to
            extraordinary.
          </p>

          <div className="hero-actions">
            <Link to="/hire" className="cta-button">
              Talk to SomeOne{" "}
            </Link>
            <Link to="/learn-more" className="cta-ghost">
              Learn More
            </Link>
          </div>

          <div className="features-list" aria-hidden="true">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-sub">{f.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media">
          <div className="media-visual">
            <img
              src="/hero.jpg"
              alt="Editing Illustration"
              className="media-image"
            />
            <div className="media-cta-wrap">
              <button
                className="media-cta"
                onClick={() =>
                  window.scrollTo({
                    top:
                      document.querySelector(".showcase-section").offsetTop -
                      80,
                    behavior: "smooth",
                  })
                }
              >
                Watch Reel
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="showcase-section">
        <h2 className="section-title">Featured Works</h2>
        <div className="video-grid">
          {[3, 4, 5, 6].map((n, i) => (
            <div key={n} className="video-card">
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="video-el"
                poster={`/image${n}.png`}
                preload="metadata"
                loop
                muted
                playsInline
              >
                <source src={`/video${n}.mp4`} type="video/mp4" />
              </video>
              <div className="video-controls">
                <div className="video-meta">
                  {n === 3
                    ? "Style Boost"
                    : n === 4
                    ? "Visual Cut"
                    : n === 5
                    ? "Short Edit"
                    : "Final Polish"}
                </div>
                <button
                  className="play-btn"
                  aria-label={playing[i] ? "Pause" : "Play"}
                  onClick={() => togglePlay(i)}
                >
                  {playing[i] ? "⏸" : "▶"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h3 className="cta-heading">Ready to elevate your content?</h3>
          <p className="cta-text">
            Join thousands of satisfied clients who trust Artik for their
            editing needs.
          </p>
          <Link to="/get-started" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
