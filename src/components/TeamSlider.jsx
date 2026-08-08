import { useState, useEffect } from 'react';

function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  // ============================================================
  // 👥 TEAM MEMBERS - Edit this list directly!
  // Images auto-generate from names - NO local images needed!
  // ============================================================
  const members = [
    { name: 'Osteen', role: 'Backend Developer' },
    { name: 'Solomon Mwendwa', role: 'CEO & Founder' },
    { name: 'Karani Brian', role: 'Cyber Security Engineer' },
    { name: 'Ones', role: 'Python Developer' },
    { name: 'Collo', role: 'Hardware & OS Engineer' },
    { name: 'Mark Zuckerburg', role: 'Web Designer' },
    { name: 'Adrian', role: 'Mobile App Developer' },
    { name: 'Tonny Kipruto', role: 'Networking Engineer' },
    { name: 'Cipher Ghost', role: 'Full Stack Developer' },
    // ============================================================
    // ➕ ADD NEW MEMBERS - Just add name and role:
    // ============================================================
    // { name: 'Jane Doe', role: 'UI/UX Designer' },
    // { name: 'John Smith', role: 'DevOps Engineer' },
  ];

  // Responsive - how many cards to show
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 480) setVisibleCards(1);
      else if (window.innerWidth < 768) setVisibleCards(2);
      else if (window.innerWidth < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Slider calculations
  const totalSlides = Math.ceil(members.length / visibleCards);
  const maxIndex = Math.max(0, totalSlides - 1);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Auto-slide (pauses on hover)
  useEffect(() => {
    if (members.length <= visibleCards || isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, visibleCards, isPaused]);

  // Generate avatar URL from name
  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=2563eb&color=fff&bold=true&font-size=0.5`;
  };

  return (
    <>
      <div 
        className="team-slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="team-slider"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {members.map((member, index) => (
            <div key={index} className="member-card">
              <div className="member-image-wrapper">
                <img 
                  src={getAvatarUrl(member.name)}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <h5>{member.name}</h5>
              <p>{member.role}</p>
            </div>
          ))}
        </div>

        {members.length > visibleCards && (
          <>
            <button className="slider-btn prev" onClick={prevSlide}>‹</button>
            <button className="slider-btn next" onClick={nextSlide}>›</button>
          </>
        )}
      </div>

      {members.length > visibleCards && totalSlides > 1 && (
        <div className="slider-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TeamSlider;