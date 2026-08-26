import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ============================================================
  // YOUR EMAILJS CREDENTIALS
  // ============================================================
  const EMAILJS_SERVICE_ID = 'service_vsdq8';
  const EMAILJS_WELCOME_TEMPLATE = 'templdsaste_1d2jq8l';
  const EMAILJS_ADMIN_TEMPLATE = 'templatasase_qabttpj';
  const EMAILJS_PUBLIC_KEY = 'ApN9IVasrfrwsJBrmDi648o';

  // Admin email where notifications will be sent
  // This matches your template's "To Email" field
  const ADMIN_EMAIL = 'cipherghost68@gmail.com';

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const subscriberName = name.trim() || 'Valued Subscriber';
      const currentDate = new Date().toLocaleString();

      // ============================================================
      // STEP 1: Send Welcome Email to Subscriber
      // ============================================================
      const welcomeParams = {
        email: email,
        name: subscriberName,
        reply_to: 'brighttechsolutionssupport@gmail.com',
      };

      console.log('Sending welcome email to subscriber...', welcomeParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_WELCOME_TEMPLATE,
        welcomeParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Welcome email sent successfully!');

      // ============================================================
      // STEP 2: Send Admin Notification
      // Template: template_admin_newsletter
      // To Email: brighttechsolutionssupport@gmail.com
      // From Name: {{from_name}} (subscriber's name)
      // Reply To: {{from_email}} (subscriber's email)
      // ============================================================
      const adminParams = {
        from_name: subscriberName,
        from_email: email,
        date: currentDate,
        // The template's "To Email" is already set to brighttechsolutionssupport@gmail.com
        // So we don't need to pass it here
      };

      console.log('Sending admin notification...', adminParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE,
        adminParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Admin notification sent!');

      setSubscribed(true);
      setEmail('');
      setName('');

      setTimeout(() => {
        setSubscribed(false);
        setIsLoading(false);
      }, 5000);

    } catch (error) {
      console.error('Subscription error:', error);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);

      if (error.status === 400) {
        setError('Template error. Please check your EmailJS template setup.');
      } else if (error.status === 404) {
        setError('Service or template not found. Please check your EmailJS credentials.');
      } else if (error.status === 403) {
        setError('Authentication error. Please check your EmailJS public key.');
      } else {
        setError('Failed to subscribe. Please try again or contact us directly.');
      }
      setIsLoading(false);
    }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3>Subscribe to Our <span>Newsletter</span></h3>
          <p>Get the latest tech insights, industry trends, and exclusive offers delivered to your inbox.</p>

          <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
            <div className="newsletter-input-group">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading || subscribed}
                className="name-input"
                aria-label="Your name"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={error ? 'error' : ''}
                aria-label="Email address"
                disabled={isLoading || subscribed}
                autoComplete="email"
                required
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || subscribed}
              >
                {isLoading ? (
                  <span className="loading-spinner">⟳</span>
                ) : subscribed ? (
                  'Subscribed!'
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {error && <span className="newsletter-error">{error}</span>}
            {subscribed && (
              <div className="newsletter-success">
                Thank you for subscribing! Check your inbox for a welcome email.
              </div>
            )}
          </form>

          <div className="newsletter-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7L12 13 2 7"/>
                </svg>
              </span>
              <span>Weekly Updates</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </span>
              <span>Exclusive Content</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </span>
              <span>Industry Insights</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <span>No Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;