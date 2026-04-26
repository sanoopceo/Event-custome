import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const servicesList = [
  {
    id: 1,
    title: 'Wedding Planning',
    shortDesc: 'Curating your perfect day with flawless execution.',
    fullDesc: 'From venue selection to the final dance, our wedding planning service covers every detail. We offer full-service planning, partial planning, and day-of coordination to ensure your special day is stress-free and spectacular.',
    image: '/image/photo-1519225421980-715cb0215aed.avif'
  },
  {
    id: 2,
    title: 'Event Management',
    shortDesc: 'Corporate galas, product launches, and grand openings.',
    fullDesc: 'Elevate your brand with our corporate event management. We handle logistics, vendor coordination, and onsite management, ensuring a seamless experience that reflects your company’s prestige.',
    image: '/image/4d644007c88555409123df4c572e4103.jpg'
  },
  {
    id: 3,
    title: 'Catering Services',
    shortDesc: 'Exquisite culinary experiences tailored to your taste.',
    fullDesc: 'Our Michelin-trained chefs design bespoke menus using the finest ingredients. From plated dinners to interactive food stations, we deliver a gastronomic journey your guests will never forget.',
    image: '/image/photo-1555244162-803834f70033.avif'
  },
  {
    id: 4,
    title: 'Stage & Decor',
    shortDesc: 'Transforming spaces into breathtaking environments.',
    fullDesc: 'Our design team creates immersive atmospheres through bespoke floral arrangements, custom staging, premium linens, and atmospheric lighting, bringing your aesthetic vision to life.',
    image: '/image/photo-1519225421980-715cb0215aed.avif'
  },
  {
    id: 5,
    title: 'Photography & Entertainment',
    shortDesc: 'Capturing moments and keeping guests engaged.',
    fullDesc: 'We partner with world-class photographers, videographers, and entertainers. Whether you need a live jazz band, a renowned DJ, or cinematic storytelling, we curate the perfect entertainment package.',
    image: '/image/71843970796d385a5b0baae5cae7d489.jpg'
  }
];

const Services = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <motion.div {...PageTransition} style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>Our Expertise</h4>
            <h1 style={{ fontSize: '3.5rem' }}>Bespoke Services</h1>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {servicesList.map((service) => (
              <motion.div 
                layout
                key={service.id}
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                className="glass-panel"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                whileHover={{ scale: expandedId === service.id ? 1 : 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <motion.div layout style={{ flex: '1 1 300px', padding: '2rem' }}>
                    <motion.h2 layout style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{service.title}</motion.h2>
                    <motion.p layout style={{ color: 'var(--color-muted)', fontSize: '1.1rem', margin: 0 }}>
                      {service.shortDesc}
                    </motion.p>
                  </motion.div>
                  <motion.div layout style={{ flex: '0 0 auto', padding: '2rem' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '2rem' }}>
                      {expandedId === service.id ? '−' : '+'}
                    </span>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedId === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div style={{ padding: '0 2rem 2rem 2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                        <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                          {service.fullDesc}
                        </p>
                        <div style={{ height: '250px', borderRadius: '8px', overflow: 'hidden' }}>
                           <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
