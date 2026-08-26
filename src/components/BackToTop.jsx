// src/components/BackToTop.jsx
import { useState, useEffect } from 'react';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '30px',
        display: isVisible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: '#ffffff',
        border: 'none',
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 999,
        fontSize: '20px',
        fontWeight: 'bold',
      }}
      aria-label="Back to top"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.45)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.35)';
      }}
    >
      ↑
    </button>
  );
}

export default BackToTop;