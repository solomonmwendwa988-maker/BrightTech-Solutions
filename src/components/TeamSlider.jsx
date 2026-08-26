import { useState, useEffect, useRef, useCallback } from 'react';

function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // ============================================================
  // 👥 TEAM MEMBERS - Edit this list directly!
  // 
  // 🔗 Social Links:
  //    - Add full URLs for GitHub, LinkedIn, Twitter
  //    - Set to null or empty string to hide the icon
  // ============================================================
  const members = [
    { 
      id: 1,
      name: 'Solomon Mwendwa', 
      role: 'CEO & Founder',
      bio: 'Visionary leader with 10+ years in tech innovation',
      social: {
        linkedin: 'https://linkedin.com/in/solomon-mwendwa',
        twitter: 'https://twitter.com/solomon_mwendwa',
        github: 'https://github.com/solomonmwendwa988-maker'
      }
    },
    { 
      id: 2,
      name: 'Karani Brian', 
      role: 'Cyber Security Engineer',
      bio: 'Ethical hacker & security specialist',
      social: {
        linkedin: 'https://linkedin.com/in/karani-brian',
        twitter: null,
        github: 'https://github.com/karani-brian'
      }
    },
    { 
      id: 3,
      name: 'Osteen', 
      role: 'Backend Developer',
      bio: 'Scalable systems & API architecture expert',
      social: {
        linkedin: 'https://linkedin.com/in/osteen-dev',
        twitter: null,
        github: 'https://github.com/osteen-dev'
      }
    },
    { 
      id: 4,
      name: 'Cipher Ghost', 
      role: 'Full Stack Developer',
      bio: 'Building robust web applications with modern tech',
      social: {
        linkedin: 'https://linkedin.com/in/cipher-ghost',
        twitter: null,
        github: 'https://github.com/cipher-ghost'
      }
    },
    { 
      id: 5,
      name: 'Ones', 
      role: 'Python Developer',
      bio: 'AI/ML enthusiast & data processing specialist',
      social: {
        linkedin: 'https://linkedin.com/in/ones-dev',
        twitter: null,
        github: 'https://github.com/ones-dev'
      }
    },
    { 
      id: 6,
      name: 'Collo', 
      role: 'Hardware & OS Engineer',
      bio: 'Systems programming & embedded systems expert',
      social: {
        linkedin: 'https://linkedin.com/in/collo-engineer',
        twitter: null,
        github: 'https://github.com/collo-engineer'
      }
    },
    { 
      id: 7,
      name: 'Mark Zuckerburg', 
      role: 'Web Designer',
      bio: 'Creative UI/UX designer with a passion for aesthetics',
      social: {
        linkedin: 'https://linkedin.com/in/mark-zuckerburg',
        twitter: null,
        github: 'https://github.com/mark-zuckerburg'
      }
    },
    { 
      id: 8,
      name: 'Adrian', 
      role: 'Mobile App Developer',
      bio: 'Cross-platform mobile apps with native feel',
      social: {
        linkedin: 'https://linkedin.com/in/adrian-mobile',
        twitter: null,
        github: 'https://github.com/adrian-mobile'
      }
    },
    { 
      id: 9,
      name: 'Tonny Kipruto', 
      role: 'Networking Engineer',
      bio: 'Network architecture & cloud infrastructure specialist',
      social: {
        linkedin: 'https://linkedin.com/in/tonny-kipruto',
        twitter: null,
        github: 'https://github.com/tonny-kipruto'
      }
    },
    // ============================================================
    // ➕ ADD NEW MEMBERS - Copy this template:
    // ============================================================
    // { 
    //   id: 10,
    //   name: 'Jane Doe', 
    //   role: 'UI/UX Designer',
    //   bio: 'Creating intuitive user experiences',
    //   social: {
    //     linkedin: 'https://linkedin.com/in/jane-doe',
    //     twitter: 'https://twitter.com/jane_doe',
    //     github: 'https://github.com/jane-doe'
    //   }
    // },
  ];

  // Responsive - how many cards to show
  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 576) {
      setVisibleCards(1); // Mobile: 1 card
    } else if (width < 992) {
      setVisibleCards(2); // Tablet: 2 cards
    } else {
      setVisibleCards(3); // Desktop/Laptop: 3 cards
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  // Slider calculations
  const totalSlides = Math.ceil(members.length / visibleCards);
  const maxIndex = Math.max(0, totalSlides - 1);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const targetIndex = Math.min(Math.max(0, index), maxIndex);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goToSlide]);

  // Auto-slide with pause on hover
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    if (members.length > visibleCards && !isPaused && !isTransitioning) {
      autoPlayTimerRef.current = setInterval(nextSlide, 4000);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [currentIndex, visibleCards, isPaused, isTransitioning, nextSlide, members.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('keydown', handleKeyDown);
      return () => slider.removeEventListener('keydown', handleKeyDown);
    }
  }, [prevSlide, nextSlide]);

  // Check if social link exists
  const hasSocialLink = (member, platform) => {
    return member.social && member.social[platform] && member.social[platform].trim() !== '';
  };

  const showControls = members.length > visibleCards;

  // Calculate card width based on visible cards
  const cardWidthPercent = 100 / visibleCards;
  const translateX = -currentIndex * cardWidthPercent;

  return (
    <div className="team-slider-container">
      <div 
        className="team-slider-wrapper"
        ref={sliderRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        role="region"
        aria-label="Team members carousel"
        tabIndex={0}
      >
        <div 
          className="team-slider"
          style={{
            display: 'flex',
            gap: '30px',
            transform: `translateX(${translateX}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            width: '100%',
            willChange: 'transform',
          }}
        >
          {members.map((member) => (
            <div 
              key={member.id} 
              className="member-card"
              role="listitem"
              style={{
                flex: `0 0 ${cardWidthPercent}%`,
                maxWidth: `${cardWidthPercent}%`,
                minWidth: `${cardWidthPercent}%`,
                boxSizing: 'border-box',
                textAlign: 'center',
                padding: '30px 20px 24px',
                background: 'var(--white, #ffffff)',
                borderRadius: 'var(--radius-lg, 20px)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h5 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary, #0f172a)', margin: '0 0 4px 0' }}>{member.name}</h5>
              <p style={{ color: 'var(--gray, #94a3b8)', fontSize: '0.9rem', margin: 0 }}>{member.role}</p>
              {member.bio && (
                <small style={{ 
                  display: 'block', 
                  color: 'var(--gray, #94a3b8)', 
                  fontSize: '0.8rem', 
                  marginTop: '8px', 
                  lineHeight: '1.5',
                  maxWidth: '200px',
                }}>
                  {member.bio}
                </small>
              )}
              
              {/* Social links below the card */}
              {(hasSocialLink(member, 'linkedin') || 
                hasSocialLink(member, 'twitter') || 
                hasSocialLink(member, 'github')) && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  width: '100%',
                }}>
                  {hasSocialLink(member, 'linkedin') && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--light-bg, #f8fafc)',
                        color: 'var(--gray, #94a3b8)',
                        transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                        border: '1px solid rgba(0, 0, 0, 0.04)',
                        textDecoration: 'none',
                      }}
                      className="social-link linkedin"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0a66c2';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#0a66c2';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--light-bg, #f8fafc)';
                        e.currentTarget.style.color = 'var(--gray, #94a3b8)';
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {hasSocialLink(member, 'twitter') && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s Twitter`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--light-bg, #f8fafc)',
                        color: 'var(--gray, #94a3b8)',
                        transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                        border: '1px solid rgba(0, 0, 0, 0.04)',
                        textDecoration: 'none',
                      }}
                      className="social-link twitter"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#000000';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#000000';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--light-bg, #f8fafc)';
                        e.currentTarget.style.color = 'var(--gray, #94a3b8)';
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {hasSocialLink(member, 'github') && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s GitHub`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--light-bg, #f8fafc)',
                        color: 'var(--gray, #94a3b8)',
                        transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                        border: '1px solid rgba(0, 0, 0, 0.04)',
                        textDecoration: 'none',
                      }}
                      className="social-link github"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#24292e';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#24292e';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(36, 41, 46, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--light-bg, #f8fafc)';
                        e.currentTarget.style.color = 'var(--gray, #94a3b8)';
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {showControls && (
          <>
            <button 
              className="slider-btn prev" 
              onClick={prevSlide}
              aria-label="Previous team members"
              disabled={isTransitioning}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--white, #ffffff)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                boxShadow: 'var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.08))',
                cursor: 'pointer',
                transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--secondary, #0f172a)',
                zIndex: 10,
                padding: 0,
                left: '0',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'var(--primary, #2563eb)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--primary, #2563eb)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--white, #ffffff)';
                e.currentTarget.style.color = 'var(--secondary, #0f172a)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.08))';
              }}
            >
              ‹
            </button>
            <button 
              className="slider-btn next" 
              onClick={nextSlide}
              aria-label="Next team members"
              disabled={isTransitioning}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--white, #ffffff)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                boxShadow: 'var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.08))',
                cursor: 'pointer',
                transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--secondary, #0f172a)',
                zIndex: 10,
                padding: 0,
                right: '0',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'var(--primary, #2563eb)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--primary, #2563eb)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--white, #ffffff)';
                e.currentTarget.style.color = 'var(--secondary, #0f172a)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.08))';
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {showControls && totalSlides > 1 && (
        <div className="slider-dots" role="tablist" aria-label="Slide navigation" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: currentIndex === index ? 'var(--primary, #2563eb)' : '#e2e8f0',
                cursor: 'pointer',
                transition: 'var(--transition, 0.3s cubic-bezier(0.4, 0, 0.2, 1))',
                border: 'none',
                padding: 0,
                transform: currentIndex === index ? 'scale(1.3)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled && currentIndex !== index) {
                  e.currentTarget.style.background = 'var(--primary-light, #60a5fa)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled && currentIndex !== index) {
                  e.currentTarget.style.background = '#e2e8f0';
                }
              }}
            />
          ))}
        </div>
      )}

      {showControls && (
        <div className="slider-indicator" aria-live="polite" style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: 'var(--gray, #94a3b8)', fontWeight: 500 }}>
          <span className="sr-only">
            Slide {currentIndex + 1} of {totalSlides}
          </span>
          <span aria-hidden="true">
            {currentIndex + 1} / {totalSlides}
          </span>
        </div>
      )}
    </div>
  );
}

export default TeamSlider;