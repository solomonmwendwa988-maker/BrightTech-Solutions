// src/components/PrivacyBanner.jsx
import { useState, useEffect } from 'react';

function PrivacyBanner() {
  const [accepted, setAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('privacy-consent');
    if (consent) {
      setAccepted(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('privacy-consent', 'accepted');
    setAccepted(true);
    setShowBanner(false);
  };

  const declineConsent = () => {
    localStorage.setItem('privacy-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner" role="alert">
      <p>
        We use cookies to enhance your experience, analyze site traffic, and serve personalized content.
        By continuing to use our site, you consent to our use of cookies.
        <a href="#"> Learn More</a>
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={acceptConsent} className="btn-cookie accept">
          Accept All
        </button>
        <button onClick={declineConsent} className="btn-cookie decline">
          Decline
        </button>
      </div>
    </div>
  );
}

export default PrivacyBanner;