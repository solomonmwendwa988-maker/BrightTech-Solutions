import Home from './pages/Home.jsx';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('Sigma Cipher Technologies App Mounted 🚀');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add page title
    document.title = 'Sigma Cipher Technologies - Web Development & Custom Software Solutions';

    // Add meta description dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Sigma Cipher Technologies offers professional web development, custom software, mobile apps, UI/UX design, and digital solutions in Kenya.';
    }
  }, []);

  return <Home />;
}

export default App;