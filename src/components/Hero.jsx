import { useState } from 'react';
import Image from '../assets/images/hero.jpeg';

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="heroSection" id="home">
      <div className="heroSection-description">
        <span className="section-badge">WELCOME TO BRIGHTTECH SOLUTIONS</span>
        <h1>
          Your Partner in <span className="highlight">Digital Growth</span>
        </h1>
        <h2>
          Transforming Ideas into <span>Scalable Solutions</span>
        </h2>
        <p className="hero-description">
          We help businesses like yours leverage technology to increase revenue by up to{' '}
          <strong>40%</strong>, reduce operational costs, and deliver exceptional customer
          experiences.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Combined Years of Experience</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
        <div className="heroSection-buttons">
          <button className="services-btn" onClick={() => handleScrollTo('services')}>
            Explore Services
          </button>
          <button className="contact-btn" onClick={() => handleScrollTo('contact')}>
            Get Started
          </button>
        </div>
      </div>

      <div className="heroSection-image">
        <img
          src={Image}
          alt="BrightTech Solutions - Innovative Technology"
          loading="lazy"
          className={imageLoaded ? 'loaded' : ''}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="hero-image-badge">
          <span className="badge-icon"></span>
          <span className="badge-text">Top Tech Company 2026</span>
        </div>
      </div>

      <div className="quick-data">
        <div className="quick-data-section">
          <span>5+</span>
          <p>Projects Delivered</p>
        </div>
        <div className="quick-data-section">
          <span>3+</span>
          <p>Combined Years of Experience</p>
        </div>
        <div className="quick-data-section">
          <span>24/7</span>
          <p>Support</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;