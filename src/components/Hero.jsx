import { useState } from 'react';
import Image from '../assets/images/hero.jpeg';

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="heroSection" id="home">
      {/* HERO CONTENT */}
      <div className="heroSection-description">
        <span className="section-badge">
          SIGMA CIPHER TECHNOLOGIES
        </span>

        <h1>
          Build Smarter.
          <span className="highlight"> Automate Better.</span>
          <br />
          Grow Faster.
        </h1>

        <h2>
          Web Development <span>•</span> Custom Software <span>•</span>{' '}
          Digital Solutions
        </h2>

        <p className="hero-description">
          We design and develop modern websites, custom software, and
          digital solutions that help businesses operate smarter,
          serve customers better, and grow with confidence.
        </p>

        {/* CTA BUTTONS */}
        <div className="heroSection-buttons">
          <button
            type="button"
            className="services-btn"
            onClick={() => handleScrollTo('contact')}
          >
            Start a Project
            <span aria-hidden="true"> →</span>
          </button>

          <button
            type="button"
            className="contact-btn"
            onClick={() => handleScrollTo('projects')}
          >
            View Our Work
            <span aria-hidden="true"> ↗</span>
          </button>
        </div>

        {/* TRUST / VALUE LINE */}
        <div className="hero-trust-line">
          <span>Built for modern businesses</span>
          <span>•</span>
          <span>Designed for growth</span>
        </div>

        {/* HERO STATS */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>

          <div className="hero-stat-divider"></div>

          <div className="hero-stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>

          <div className="hero-stat-divider"></div>

          <div className="hero-stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="heroSection-image">
        <img
          src={Image}
          alt="Sigma Cipher Technologies digital solutions"
          loading="eager"
          fetchPriority="high"
          className={imageLoaded ? 'loaded' : ''}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Decorative technology badge */}
        <div className="hero-image-badge">
          <span className="badge-icon" aria-hidden="true">
            ✦
          </span>

          <span className="badge-text">
            Digital Solutions
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;