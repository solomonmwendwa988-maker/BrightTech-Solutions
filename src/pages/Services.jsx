function Services() {
    const services = [
        {
            id: 1,
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
            ),
            title: 'Web Development',
            description: 'Custom websites built for speed and conversion. We deliver responsive, SEO-optimized sites that load in under 2 seconds and increase conversions by up to 40%.',
            outcome: '40% Increase in Conversions',
            features: ['React', 'Node.js', 'Next.js', 'Tailwind CSS']
        },
        {
            id: 2,
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
            ),
            title: 'Mobile App Development',
            description: 'Native and cross-platform apps with seamless user experience. Our apps have 4.8+ star ratings and retain 85% of users after 30 days.',
            outcome: '85% User Retention',
            features: ['React Native', 'Flutter', 'iOS', 'Android']
        },
        {
            id: 3,
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
            ),
            title: 'Digital Marketing',
            description: 'Data-driven marketing strategies that deliver measurable ROI. We help businesses grow their online presence with 3x ROAS and 60% increase in organic traffic.',
            outcome: '3x ROAS Guaranteed',
            features: ['SEO', 'PPC', 'Social Media', 'Analytics']
        }
    ];

    return (
        <section className="section services-section" id="services">
            <div className="section-header">
                <span className="section-badge">WHAT WE DO</span>
                <h2 className="section-title">Services <span>We Provide</span></h2>
                <p className="section-subtitle">We offer a wide range of digital services to help your business succeed online.</p>
            </div>

            <div className="services-grid">
                {services.map((service) => (
                    <div key={service.id} className="service-card">
                        <div className="service-icon-wrapper">
                            {service.icon}
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="service-features">
                            {service.features.map((feature, index) => (
                                <span key={index} className="feature-tag">{feature}</span>
                            ))}
                        </div>
                        <div className="service-outcome">
                            <span className="outcome-label">✓</span>
                            <span className="outcome-text">{service.outcome}</span>
                        </div>
                        <a href={`/services/${service.id}`} className="service-link">
                            Learn More
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>

            <div className="services-cta">
                <a href="#contact" className="btn-primary">View All Services</a>
            </div>
        </section>
    );
}

export default Services;