import { useState } from 'react';
import TeamSlider from '../components/TeamSlider.jsx';

function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="section about-section" id="about">
        <div className="about-grid">
          <div className="about-image-wrapper" id="aboutImg">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
              alt="BrightTech Solutions team collaboration and meeting"
              loading="lazy"
              className={imageLoaded ? 'loaded' : ''}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="about-image-badge">
              <span className="badge-number">10+</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
          </div>

          <div className="about-content">
            <span className="section-badge">ABOUT US</span>
            <h2>
              Our Story &amp; <span>Mission</span>
            </h2>

            <div className="about-story">
              <h4>Our Story</h4>
              <p>
                BrightTech Solutions was founded with a simple vision: to help businesses leverage
                technology for real growth. From a small team of passionate developers, we have grown
                into a trusted partner for startups and enterprises across Africa.
              </p>
            </div>

            <div className="about-mission">
              <h4>Our Mission</h4>
              <p>
                To empower businesses with innovative digital solutions that drive measurable
                results. We believe in using technology to solve real problems and create lasting
                impact for our clients.
              </p>
            </div>

            <div className="about-values">
              <div className="value-item">
                <span className="value-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                <div>
                  <h5>Innovation First</h5>
                  <p>We push boundaries with cutting-edge technology</p>
                </div>
              </div>
              <div className="value-item">
                <span className="value-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div>
                  <h5>Client-Centric</h5>
                  <p>Your success is our top priority</p>
                </div>
              </div>
              <div className="value-item">
                <span className="value-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </span>
                <div>
                  <h5>Quality Assurance</h5>
                  <p>We deliver nothing short of excellence</p>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={() => handleScrollTo('contact')}>
              Let's Work Together
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">5+</span>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">3+</span>
            <p>Combined Years of Experience</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <p>Support</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">5+</span>
            <p>Team Members</p>
          </div>
        </div>
      </section>

      <section className="section team-section" id="team">
        <div className="section-header">
          <span className="section-badge">OUR TEAM</span>
          <h2 className="section-title">
            Meet Our <span>Team</span>
          </h2>
          <p className="section-subtitle">
            We are a group of creative and passionate professionals who love what we do
          </p>
        </div>
        <TeamSlider />
      </section>

      <section className="section cta-section-wrapper">
        <div className="cta-section">
          <div className="cta-content">
            <h2>
              Ready to <span>Start a Project</span>?
            </h2>
            <p>Let's build something amazing together</p>
          </div>
          <button className="btn-white" onClick={() => handleScrollTo('contact')}>
            Contact Us Today
          </button>
        </div>
      </section>
    </>
  );
}

export default About;