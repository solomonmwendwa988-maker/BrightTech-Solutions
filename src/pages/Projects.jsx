import { useState } from 'react';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      category: 'Web Development',
      categorySlug: 'web',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80',
      description:
        'A complete e-commerce platform with payment integration and inventory management.',
      demo: '#',
      caseStudy: '#',
    },
    {
      id: 2,
      title: 'Fintech Mobile App',
      category: 'Mobile App',
      categorySlug: 'mobile',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
      description:
        'A secure mobile banking app with real-time transaction tracking and analytics.',
      demo: '#',
      caseStudy: '#',
    },
    {
      id: 3,
      title: 'Real Estate Platform',
      category: 'Web Development',
      categorySlug: 'web',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80',
      description:
        'A comprehensive real estate platform with property listings and virtual tours.',
      demo: '#',
      caseStudy: '#',
    },
    {
      id: 4,
      title: 'AI Chatbot',
      category: 'Web Development',
      categorySlug: 'web',
      image:
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&q=80',
      description: 'An AI-powered chatbot with natural language processing and 24/7 support.',
      demo: '#',
      caseStudy: '#',
    },
    {
      id: 5,
      title: 'Health Tracking App',
      category: 'Mobile App',
      categorySlug: 'mobile',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
      description:
        'A health tracking app with real-time monitoring and personalized insights.',
      demo: '#',
      caseStudy: '#',
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      category: 'Marketing',
      categorySlug: 'marketing',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
      description: 'A powerful social media analytics dashboard with automated reporting.',
      demo: '#',
      caseStudy: '#',
    },
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
    { id: 'marketing', label: 'Marketing' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.categorySlug === activeFilter);

  return (
    <section className="section projects-section" id="projects">
      <div className="section-header">
        <span className="section-badge">PORTFOLIO</span>
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        <p className="section-subtitle">Here are some of our featured projects we've worked on</p>
      </div>

      <div className="filter-links">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
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
              <div className="project-overlay">
                <span className="project-category">{project.category}</span>
              </div>
            </div>
            <div className="project-content">
              <h5>{project.title}</h5>
              <p>{project.description}</p>
              <div className="project-links">
                <a
                  href={project.demo}
                  className="project-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('contact');
                  }}
                >
                  Live Demo →
                </a>
                <a
                  href={project.caseStudy}
                  className="project-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('contact');
                  }}
                >
                  Case Study
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta">
        <button className="btn-secondary" onClick={() => handleScrollTo('contact')}>
          View All Projects
        </button>
      </div>
    </section>
  );
}

export default Projects;