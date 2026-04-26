import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        transition: 'all 0.4s ease',
        zIndex: 9999,
        background: isScrolled || mobileMenuOpen ? 'var(--glass-bg)' : 'rgba(250, 249, 246, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isScrolled || mobileMenuOpen ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
        boxShadow: isScrolled || mobileMenuOpen ? 'var(--shadow-glass)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10000 }}>

        <Link to="/" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'inherit', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, letterSpacing: '2px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-white)',
            boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)'
          }}>
            <img
              src="/image/fdcdd8377d561e716aecd0bc1a380bbb.jpg"
              alt="Event"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', }}
            />
          </div>
          Élégance Events
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="nav-link"
              style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: location.pathname === link.path ? 600 : 400,
                color: location.pathname === link.path ? 'var(--color-gold)' : 'var(--color-charcoal)',
                position: 'relative'
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-gold)'
                  }}
                />
              )}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
            Book Us
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} color="var(--color-charcoal)" /> : <Menu size={28} color="var(--color-charcoal)" />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--color-ivory)',
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem 5%',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={closeMobileMenu}
                  style={{
                    display: 'block',
                    padding: '1.5rem 0',
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: location.pathname === link.path ? 'var(--color-gold)' : 'var(--color-charcoal)',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '3rem', textAlign: 'center' }}
            >
              <Link to="/contact" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%', backgroundColor: 'var(--color-gold)', color: 'var(--color-white)', border: 'none' }}>
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 10001;
        }
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
