import { useState } from 'react';

function Blog() {
  const [hoveredPost, setHoveredPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Why Your Business Needs a Mobile App in 2026',
      excerpt: 'Discover how mobile apps can boost engagement, increase revenue, and improve customer loyalty for your business.',
      date: 'August 20, 2026',
      readTime: '5 min read',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=350&fit=crop&q=80',
      author: 'Solomon Mwendwa'
    },
    {
      id: 2,
      title: 'Top 10 SEO Trends to Watch This Year',
      excerpt: 'Stay ahead of the competition with these essential SEO strategies that are shaping the digital landscape.',
      date: 'August 15, 2026',
      readTime: '7 min read',
      category: 'SEO & Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop&q=80',
      author: 'Karani Brian'
    },
    {
      id: 3,
      title: 'How to Choose the Right Tech Stack for Your Project',
      excerpt: 'A comprehensive guide to selecting the best technologies that align with your business goals and budget.',
      date: 'August 10, 2026',
      readTime: '6 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=350&fit=crop&q=80',
      author: 'Cipher Ghost'
    },
    {
      id: 4,
      title: 'The Future of UI/UX Design in 2026',
      excerpt: 'Explore emerging design trends and how they\'re transforming user experiences across all digital platforms.',
      date: 'August 5, 2026',
      readTime: '4 min read',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=350&fit=crop&q=80',
      author: 'Mark Zuckerburg'
    }
  ];

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section blog-section" id="blog">
      <div className="section-header">
        <span className="section-badge">RESOURCES</span>
        <h2 className="section-title">
          Latest <span>Insights</span>
        </h2>
        <p className="section-subtitle">
          Expert tips and industry insights to help your business grow
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="blog-card"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <div className="blog-image">
              <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
              />
              <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-divider">•</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <div className="blog-footer">
                <span className="blog-author">By {post.author}</span>
                <button 
                  className="blog-link"
                  onClick={() => handleScrollTo('contact')}
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="blog-cta-wrapper">
        <button 
          className="btn-secondary" 
          onClick={() => handleScrollTo('contact')}
        >
          View All Articles
        </button>
      </div>
    </section>
  );
}

export default Blog;