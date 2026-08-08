import { useState, useEffect } from 'react';
import logoImage from '../assets/images/logo.jpeg';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navBar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navBar-section">
        <img src={logoImage} alt="BrightTech Solutions Logo" />
        <h3>BrightTech Solutions</h3>
      </div>

      <div className={`navBar-section nav-links ${menuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeSection === link.id ? 'active' : ''}
            onClick={(e) => handleNavClick(e, link.id)}
            aria-current={activeSection === link.id ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="navBar-section nav-actions">
        <a
          id="getStarted"
          href="#contact"
          className="btn-primary nav-cta"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Get Started
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;