import { Mail, Phone } from 'lucide-react';
import { Instagram } from './icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'var(--color-white)', padding: '6rem 0 2rem' }}>
      <div className="container">
        <div className="grid-2">
          <div>
            <h2 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>ÉLÉGANCE</h2>
            <p style={{ color: 'var(--color-light-gray)', maxWidth: '400px', marginBottom: '2rem' }}>
              Crafting unforgettable moments with unparalleled elegance. We bring your luxury event visions to life.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--color-white)' }}><Instagram size={24} /></a>
              <a href="#" style={{ color: 'var(--color-white)' }}>
                {/* WhatsApp placeholder icon using text or similar since no explicit lucide whatsapp */}
                <Phone size={24} />
              </a>
              <a href="#" style={{ color: 'var(--color-white)' }}><Mail size={24} /></a>
              <a href="#" style={{ color: 'var(--color-white)', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontStyle: 'italic' }}>Be</a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>Explore</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>Contact</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-light-gray)' }}>
                <li>hello@elegance.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Luxury Ave, NY</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          &copy; {new Date().getFullYear()} Élégance Events. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
