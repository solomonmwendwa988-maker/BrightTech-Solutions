import { useState } from 'react';
import Spinner from './Spinner.jsx';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // ============================================================
  // YOUR EMAILJS CREDENTIALS
  // ============================================================
  const EMAILJS_SERVICE_ID = 'service_vi1ebq8';
  const EMAILJS_AUTO_REPLY_TEMPLATE = 'template_1d2jq8l';      // Auto-reply to client
  const EMAILJS_ADMIN_TEMPLATE = 'template_qabttpj';     // Admin notification
  const EMAILJS_PUBLIC_KEY = 'iYyAgmeLF0DXtjSd7';

  const ADMIN_EMAIL = 'brighttechsolutionssupport@gmail.com';

  // Service options
  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'seo-analytics', label: 'SEO & Analytics' },
    { value: 'other', label: 'Other' },
  ];

  // Budget options
  const budgetOptions = [
    { value: '', label: 'Select a budget range...' },
    { value: 'under-5k', label: 'Under Ksh5,000' },
    { value: '5k-10k', label: 'Ksh5,000 - Ksh10,000' },
    { value: '10k-25k', label: 'Ksh10,000 - Ksh25,000' },
    { value: '25k-50k', label: 'Ksh25,000 - Ksh50,000' },
    { value: '50k-plus', label: 'Ksh50,000+' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  const getServiceLabel = (value) => {
    const found = serviceOptions.find(s => s.value === value);
    return found ? found.label : value;
  };

  const getBudgetLabel = (value) => {
    const found = budgetOptions.find(b => b.value === value);
    return found ? found.label : value;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (formData.phone && !/^[\+\d\s\-()]{7,20}$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSending(true);
    setSendError('');

    try {
      const serviceLabel = getServiceLabel(formData.service);
      const budgetLabel = getBudgetLabel(formData.budget);
      const currentDate = new Date().toLocaleString();

      // ============================================================
      // STEP 1: Send Auto-Reply to Client
      // ============================================================
      const autoReplyParams = {
        to_email: formData.email,
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Not provided',
        service: serviceLabel,
        budget: budgetLabel || 'Not specified',
        subject: formData.subject || `New Inquiry: ${serviceLabel}`,
        reply_to: ADMIN_EMAIL,
      };

      console.log('Sending auto-reply to client...', autoReplyParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTO_REPLY_TEMPLATE,
        autoReplyParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Auto-reply sent to client!');

      // ============================================================
      // STEP 2: Send Admin Notification to You
      // ============================================================
      const adminParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Not provided',
        service: serviceLabel,
        budget: budgetLabel || 'Not specified',
        subject: formData.subject || `New Inquiry: ${serviceLabel}`,
        message: formData.message,
        date: currentDate,
        to_email: ADMIN_EMAIL,
      };

      console.log('Sending admin notification...', adminParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE,
        adminParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Admin notification sent!');

      // Both emails sent successfully
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
        setIsSending(false);
      }, 5000);

    } catch (error) {
      console.error('Email send error:', error);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      
      if (error.status === 400) {
        setSendError('Template error. Please check your EmailJS template setup.');
      } else if (error.status === 404) {
        setSendError('Service or template not found. Please check your EmailJS credentials.');
      } else if (error.status === 403) {
        setSendError('Authentication error. Please check your EmailJS public key.');
      } else {
        setSendError('Failed to send message. Please try again or contact us directly at +254 713 125 845');
      }
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
          We'd love to hear from you. Reach out using the contact details below or fill out the form.
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
                <span className="value">brighttechsolutionssupport@gmail.com</span>
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
                <span className="value">Mon - Fri 8:00AM - 6:00PM EAT</span>
              </div>
            </div>
          </div>

         <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.776603739371!2d35.1353555!3d-0.4327388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182af952a4f0a645%3A0xb173ef6fca4bb197!2sUniversity%20of%20Kabianga!5e0!3m2!1sen!2ske!4v1726789123456"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BrightTech Solutions - University of Kabianga, Belgut, Kericho, Kenya"
          ></iframe>
        </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h4>Send a Message</h4>
          <h2>Let's Work Together</h2>
          <p className="form-subtitle">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name <span aria-hidden="true">*</span></label>
              <input
                type="text"
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && <span id="phone-error" className="error-message" role="alert">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Needed <span aria-hidden="true">*</span></label>
              <select
                id="service"
                value={formData.service}
                onChange={handleChange}
                className={errors.service ? 'error' : ''}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.service && <span id="service-error" className="error-message" role="alert">{errors.service}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget Range</label>
            <select
              id="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Brief subject line"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
            <textarea
              id="message"
              rows="5"
              placeholder="Tell us about your project, goals, and timeline..."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            ></textarea>
            {errors.message && <span id="message-error" className="error-message" role="alert">{errors.message}</span>}
          </div>

          {sendError && <span className="error-message" role="alert">{sendError}</span>}

          <button
            type="submit"
            className="btn-primary"
            disabled={isSending || submitted}
          >
            {isSending ? <Spinner /> : submitted ? 'Message Sent!' : 'Send Message'}
          </button>

          {submitted && (
            <div className="success-message" role="status">
              Thank you! We'll get back to you within 24 hours. Check your inbox for a confirmation email.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;