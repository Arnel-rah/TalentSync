import React, { useState} from 'react';
import clsx from 'clsx';

// Interface pour les liens
interface NavLink {
  label: string;
  href: string;
}

// Props (ajout de currentSection pour l'état actif)
interface NavbarProps {
  profileImage?: string;
  profileName?: string;
  links: NavLink[];
  onLinkClick?: (href: string) => void;
  currentSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  profileImage = '/profile.jpg',
  profileName = 'ArneL',
  links = [
    { label: '#home', href: '#home' },
    { label: '#works', href: '#works' },
    { label: '#about-me', href: '#about-me' },
    { label: '#contacts', href: '#contacts' },
  ],
  onLinkClick,
  currentSection = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (href: string) => {
    onLinkClick?.(href);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavLink = (link: NavLink) => {
    const isActive = currentSection === link.href.slice(1);
    return (
      <a
        key={link.href}
        href={link.href}
        onClick={() => handleLinkClick(link.href)}
        className={clsx(
          'flex items-baseline px-3 py-2 text-sm font-medium relative overflow-hidden group transition-all duration-300 ease-in-out', // Changé : items-baseline pour aligner le # au bas
          {
            // Actif : Vert clair + gras, SANS soulignement
            'text-green-300': isActive,
            // Inactif : Gris sombre + opacité 70%
            'text-gray-400 opacity-70': !isActive,
            // Hover commun : Illumine + soulignement glissant (seulement sur hover)
            'hover:text-green-300 hover:opacity-100': true,
            'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 after:ease-in-out after:group-hover:w-full': true,
          }
        )}
        aria-label={`Naviguer vers ${link.label}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="text-green-400 z-10 relative leading-none">#</span> 
        <span className={clsx('ml-1 z-10 relative leading-none', { 'font-semibold': isActive })}>{link.label.slice(1)}</span>
      </a>
    );
  };

  return (
    <nav className="bg-[#131314] shadow-lg border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Profil Gauche */}
          <div className="flex items-center space-x-3 shrink-0">
            <img
              src={profileImage}
              alt={`${profileName}'s profile`}
              className="h-10 w-10 rounded-full object-cover border-2 border-green-400"
            />
            <span className="text-white font-bold text-lg hidden sm:block">{profileName}</span>
          </div>

          {/* Liens Desktop (droits) */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map(renderNavLink)}
          </div>

          {/* Bouton Menu Mobile (droits) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-green-400 hover:text-green-300 p-2 rounded-md inline-flex items-center justify-center transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className={clsx('h-6 w-6 transition-transform duration-200', {
                  'rotate-180': isMobileMenuOpen,
                })}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#131314] border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <div key={link.href} className="flex items-center pl-3">
                {renderNavLink(link)}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;