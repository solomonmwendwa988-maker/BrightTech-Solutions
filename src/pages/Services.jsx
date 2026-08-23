import { useState } from 'react';

function Services() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Web Development',
      description: 'Custom websites and web applications built for performance and scalability.',
      technologies: ['React', 'Node.js', 'Next.js', 'Tailwind']
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps with intuitive user experiences.',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: 'Digital Marketing',
      description: 'Data-driven strategies to grow your online presence and reach the right audience.',
      technologies: ['SEO', 'PPC', 'Social Media', 'Analytics']
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01"/>
          <path d="M4 14h16"/>
        </svg>
      ),
      title: 'UI/UX Design',
      description: 'User-centered design solutions that create intuitive and beautiful experiences.',
      technologies: ['Figma', 'Prototyping', 'Design Systems', 'User Testing']
    },
    {
      id: 5,
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l2 2"/>
          <path d="M4 12h2M18 12h2M12 4v2M12 18v2"/>
        </svg>
      ),
      title: 'SEO & Analytics',
      description: 'Strategic SEO and analytics solutions that drive organic traffic and insights.',
      technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Keyword Research']
    }
  ];

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section services-section" id="services">
      <div className="section-header">
        <span className="section-badge">WHAT WE DO</span>
        <h2 className="section-title">
          Services <span>We Provide</span>
        </h2>
        <p className="section-subtitle">
          We offer a wide range of digital services to help your business succeed online.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card"
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            
            <h3>{service.title}</h3>
            
            <p className="service-description">{service.description}</p>
            
            <div className="service-technologies">
              {service.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

            <a 
              href="#contact" 
              className="service-link"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
            >
              Learn More
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div className="services-cta">
        <button 
          className="btn-primary" 
          onClick={() => handleScrollTo('contact')}
        >
          Get a Free Consultation
        </button>
      </div>
    </section>
  );
}

export default Services;