import { useState } from 'react';
import Spinner from './Spinner.jsx';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // ============================================================
  // 🔥 REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
  // They look like: service_xxxxxx, template_xxxxxx, etc.
  // ============================================================
  const EMAILJS_SERVICE_ID = 'service_duir4bv';  // ← YOUR SERVICE ID
  const EMAILJS_TEMPLATE_ID = 'template_13l2z0n';   // ← YOUR TEMPLATE ID
  const EMAILJS_PUBLIC_KEY = '_q15TJML_aXifgw8D'; // ← YOUR PUBLIC KEY

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = '*Name is required';
    if (!formData.email.trim()) newErrors.email = '*Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = '*Message is required';
    return newErrors;
  };

  // Handle typing in form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh
    
    // Validate form
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true); // Show spinner
    setSendError(''); // Clear previous errors

    try {
      // Prepare the data to send
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
        to_email: 'cipherghost68@gmail.com', // Your email
      };

      console.log('Sending email...', templateParams);

      // Send the email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,   // Your Service ID
        EMAILJS_TEMPLATE_ID,  // Your Template ID
        templateParams,       // The data
        EMAILJS_PUBLIC_KEY    // Your Public Key
      );

      console.log('Email sent successfully!', response);
      
      // Show success message
      setSubmitted(true);
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setIsSending(false);
      }, 4000);

    } catch (error) {
      console.error('Email send error:', error);
      setSendError('❌ Failed to send message. Please try again or contact us directly.');
      setIsSending(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-header">
        <span className="section-badge">CONTACT US</span>
        <h2 className="section-title">
          Get in <span>Touch</span>
        </h2>
        <p className="section-subtitle">
          We'd love to hear from you. Reach out using the contact details below.
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="contact-methods">
            <div className="contact-method-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="label">Phone</p>
                <span className="value">+254 713 125 845</span>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7L12 13 2 7" />
                </svg>
              </div>
              <div>
                <p className="label">Email</p>
                <span className="value">cipherghost68@gmail.com</span>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="label">Location</p>
                <span className="value">Nairobi, Kenya</span>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="label">Working Hours</p>
                <span className="value">Mon - Fri 8:00AM - 6:00PM</span>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.68219783056679!3d-1.302861107826756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BrightTech Solutions Location"
            ></iframe>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h4>Send a Message</h4>
          <h2>Let's Work Together</h2>
          <p className="form-subtitle">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Project Inquiry"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {sendError && <span className="error-message">{sendError}</span>}

          <button
            type="submit"
            className="btn-primary"
            disabled={isSending || submitted}
          >
            {isSending ? <Spinner /> : submitted ? '✓ Sent!' : 'Send Message'}
          </button>

          {submitted && (
            <div className="success-message">✅ Thank you! We'll get back to you soon.</div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;