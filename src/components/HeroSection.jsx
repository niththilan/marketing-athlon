import React, { useState, useEffect } from 'react';


const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookCourt = () => {
    console.log('Booking court...');
    // Add your booking logic here
  };

  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg">
        <div
          className="gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        ></div>
        <div
          className="gradient-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`
          }}
        ></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Main Content Container */}
      <div className="hero-container">
        {/* Left Side - Animated Court Scene */}
        <div className={`court-scene ${isVisible ? 'visible' : ''}`}>
          <div className="court-container">
            {/* Tennis Court */}
            <div className="tennis-court">
              <div className="court-surface">
                <div className="court-lines">
                  <div className="baseline baseline-top"></div>
                  <div className="baseline baseline-bottom"></div>
                  <div className="service-line service-line-top"></div>
                  <div className="service-line service-line-bottom"></div>
                  <div className="center-line"></div>
                  <div className="sideline sideline-left"></div>
                  <div className="sideline sideline-right"></div>
                  <div className="net"></div>
                  <div className="net-post net-post-left"></div>
                  <div className="net-post net-post-right"></div>
                </div>
              </div>

              {/* Tennis Ball */}
              <div className="tennis-ball">
                <div className="ball-curve"></div>
              </div>

              {/* Player 1 */}
              <div className="player player-1">
                <div className="player-body">
                  <div className="player-head"></div>
                  <div className="player-torso"></div>
                  <div className="player-arm player-arm-left"></div>
                  <div className="player-arm player-arm-right">
                    <div className="racket"></div>
                  </div>
                  <div className="player-leg player-leg-left"></div>
                  <div className="player-leg player-leg-right"></div>
                </div>
              </div>

              {/* Player 2 */}
              <div className="player player-2">
                <div className="player-body">
                  <div className="player-head"></div>
                  <div className="player-torso"></div>
                  <div className="player-arm player-arm-left">
                    <div className="racket"></div>
                  </div>
                  <div className="player-arm player-arm-right"></div>
                  <div className="player-leg player-leg-left"></div>
                  <div className="player-leg player-leg-right"></div>
                </div>
              </div>

              {/* Floating Action Lines */}
              <div className="action-lines">
                <div className="action-line line-1"></div>
                <div className="action-line line-2"></div>
                <div className="action-line line-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Brand Content */}
        <div className={`brand-content ${isVisible ? 'visible' : ''}`}>
          <div className="brand-container">
            {/* Brand Badge */}
            <div className="brand-badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Premium Sports Platform</span>
            </div>

            {/* Main Brand Name */}
            <div className="brand-name">
              <h1 className="brand-title">
                <span className="brand-letter">A</span>
                <span className="brand-letter">T</span>
                <span className="brand-letter">H</span>
                <span className="brand-letter">L</span>
                <span className="brand-letter">O</span>
                <span className="brand-letter">N</span>
              </h1>
              <div className="brand-underline"></div>
            </div>

            {/* Captivating Tagline */}
            <div className="brand-tagline">
              <p className="tagline-text">
                Your Perfect Court Awaits
              </p>
              <p className="tagline-sub">
                Book premium sports venues in seconds
              </p>
            </div>

            {/* CTA Button */}
            <div className="cta-section">
              <button className="cta-button" onClick={handleBookCourt}>
                <span className="cta-text">Book Your Court Now</span>
                <div className="cta-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="cta-glow"></div>
              </button>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Players</span>
                </div>
                <div className="stat-separator"></div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Venues</span>
                </div>
                <div className="stat-separator"></div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1">🎾</div>
        <div className="floating-element element-2">🏸</div>
        <div className="floating-element element-3">🏓</div>
        <div className="floating-element element-4">⚽</div>
      </div>
    </section>
  );
};

export default HeroSection;