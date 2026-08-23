import { useState, useEffect, useRef, useCallback } from 'react';

function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
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
    if (width < 480) setVisibleCards(1);
    else if (width < 768) setVisibleCards(2);
    else if (width < 1024) setVisibleCards(3);
    else setVisibleCards(4);
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
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {members.map((member) => (
            <div 
              key={member.id} 
              className="member-card"
              role="listitem"
            >
              <h5>{member.name}</h5>
              <p>{member.role}</p>
              {member.bio && <small className="member-bio">{member.bio}</small>}
              
              {/* Social links below the card */}
              {(hasSocialLink(member, 'linkedin') || 
                hasSocialLink(member, 'twitter') || 
                hasSocialLink(member, 'github')) && (
                <div className="member-social-links">
                  {hasSocialLink(member, 'linkedin') && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn`}
                      className="social-link linkedin"
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
                      className="social-link twitter"
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
                      className="social-link github"
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
            >
              ‹
            </button>
            <button 
              className="slider-btn next" 
              onClick={nextSlide}
              aria-label="Next team members"
              disabled={isTransitioning}
            >
              ›
            </button>
          </>
        )}
      </div>

      {showControls && totalSlides > 1 && (
        <div className="slider-dots" role="tablist" aria-label="Slide navigation">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {showControls && (
        <div className="slider-indicator" aria-live="polite">
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