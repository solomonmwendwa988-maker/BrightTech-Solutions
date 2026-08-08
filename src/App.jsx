import Home from './pages/Home.jsx';
import './App.css';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next";

function App() {
  useEffect(() => {
    console.log('BrightTech Solutions App Mounted 🚀');
    
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
  }, []);

  return <Home />;
}

export default App;