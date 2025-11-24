import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('home'); // État pour section active

  const handleLinkClick = (href: string) => {
    console.log(`Scroll vers ${href}`);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Logique pour détecter la section active au scroll (IntersectionObserver)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.5, // Active quand 50% de la section est visible
      rootMargin: '-20% 0px -80% 0px', // Ajuste pour navbar fixed (top/bottom)
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id); // Met à jour l'état
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup
  }, []);

  return (
    <div className="min-h-screen bg-[#131314] pt-16"> {/* BG global pour tout le site */}
      <Navbar
        profileImage="/arne-profile.jpg"
        profileName="ArneL"
        links={[
          { label: '#home', href: '#home' },
          { label: '#works', href: '#works' },
          { label: '#about-me', href: '#about-me' },
          { label: '#contacts', href: '#contacts' },
        ]}
        onLinkClick={handleLinkClick}
        currentSection={currentSection} // Passe l'état actif à la navbar
      />
      {/* Sections avec même BG pour cohérence */}
      <section id="home" className="h-screen bg-[#131314] flex items-center justify-center">
        <h1 className="text-4xl text-white">Home Section (Active par défaut)</h1>
      </section>
      <section id="works" className="h-screen bg-[#131314] flex items-center justify-center">
        <h1 className="text-4xl text-white">Works Section</h1>
      </section>
      <section id="about-me" className="h-screen bg-[#131314] flex items-center justify-center">
        <h1 className="text-4xl text-white">About Me Section</h1>
      </section>
      <section id="contacts" className="h-screen bg-[#131314] flex items-center justify-center">
        <h1 className="text-4xl text-white">Contacts Section</h1>
      </section>
    </div>
  );
};

export default App;