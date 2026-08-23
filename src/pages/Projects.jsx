import { useState } from 'react';
import chatbotImage from '../assets/images/chatbot.jfif';
import ecommerceImage from '../assets/images/e-commerce.jfif';
import fintechImage from '../assets/images/fintech.jfif';
import realEstateImage from '../assets/images/real-estate.jfif';
import socialMediaImage from '../assets/images/digital-marketting.jfif';
import healthAppImage from '../assets/images/health-app.jfif';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      categorySlug: 'web',
      image: ecommerceImage,
      description: 'Full-featured online store with seamless payments and inventory management.',
      technologies: ['React', 'Node.js', 'Stripe']
    },
    {
      id: 2,
      title: 'Fintech Mobile App',
      category: 'Mobile App',
      categorySlug: 'mobile',
      image: fintechImage,
      description: 'Secure banking app with real-time transactions and biometric authentication.',
      technologies: ['React Native', 'Firebase', 'Node.js']
    },
    {
      id: 3,
      title: 'Real Estate Platform',
      category: 'Web Development',
      categorySlug: 'web',
      image: realEstateImage,
      description: 'Property listing platform with virtual tours and agent dashboards.',
      technologies: ['Next.js', 'PostgreSQL', 'Mapbox']
    },
    {
      id: 4,
      title: 'AI Chatbot Assistant',
      category: 'Web Development',
      categorySlug: 'web',
      image: chatbotImage,
      description: 'Intelligent chatbot with NLP and multi-language support.',
      technologies: ['Python', 'OpenAI', 'React']
    },
    {
      id: 5,
      title: 'Health & Wellness App',
      category: 'Mobile App',
      categorySlug: 'mobile',
      image: healthAppImage,
      description: 'Health tracking app with real-time monitoring and personalized insights.',
      technologies: ['Flutter', 'Firebase', 'HealthKit']
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      category: 'Digital Marketing',
      categorySlug: 'marketing',
      image: socialMediaImage,
      description: 'Analytics dashboard with automated reporting and campaign tracking.',
      technologies: ['React', 'D3.js', 'Node.js']
    }
  ];

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'marketing', label: 'Digital Marketing' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categorySlug === activeFilter);

  return (
    <section className="section projects-section" id="projects">
      <div className="section-header">
        <span className="section-badge">PORTFOLIO</span>
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        <p className="section-subtitle">Some of our recent work and success stories</p>
      </div>

      <div className="filter-links">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
            aria-pressed={activeFilter === filter.id}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className={loadedImages[project.id] ? 'loaded' : ''}
                onLoad={() => handleImageLoad(project.id)}
              />
              <span className="project-category-badge">{project.category}</span>
            </div>
            
            <div className="project-content">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              
              <div className="project-tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-pill">{tech}</span>
                ))}
              </div>
              
              <button 
                className="project-cta"
                onClick={() => handleScrollTo('contact')}
              >
                View Project →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta-wrapper">
        <button 
          className="btn-primary" 
          onClick={() => handleScrollTo('contact')}
        >
          Let's Build Your Project
        </button>
      </div>
    </section>
  );
}

export default Projects;