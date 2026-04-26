import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const Counter = ({ from, to, duration, title }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      setCount(Math.floor(from + (to - from) * percentage));
      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [from, to, duration]);

  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', lineHeight: 1 }}
      >
        {count}+
      </motion.div>
      <div style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {title}
      </div>
    </div>
  );
};

const About = () => {
  const timeline = [
    { year: '2010', title: 'The Inception', desc: 'Élégance was born out of a passion for creating extraordinary moments.' },
    { year: '2015', title: 'Going Global', desc: 'Expanded our operations to curate destination events across Europe and Asia.' },
    { year: '2020', title: 'Award Winning', desc: 'Recognized as the premier luxury event planning agency worldwide.' },
    { year: '2024', title: 'A New Era', desc: 'Continuing to redefine luxury entertainment and styling.' },
    { year: '2026', title: 'Looking Forward', desc: 'Excited about the future of luxury event planning.' }
  ];

  return (
    <motion.div {...PageTransition} style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/image/c534576ebff848cce2492de38ecbe658.jpg" 
                alt="Our Story" 
                style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>Our Story</h4>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>A Legacy of Elegance</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                For over a decade, we have been the silent architects behind the most talked-about events. We don’t just plan events; we architect emotions, curate memories, and script symphonies of joy.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                Our team of visionary designers, meticulous planners, and culinary artists work in tandem to transform your wildest dreams into tangible, breathtaking reality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-ivory" style={{ backgroundColor: 'var(--color-white)', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '3rem' }}>
           <Counter from={0} to={500} duration={2} title="Events Completed" />
           <Counter from={0} to={15} duration={2} title="Years Experience" />
           <Counter from={0} to={98} duration={2} title="Happy Clients (%)" />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>Our Journey</h2>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', backgroundColor: 'var(--color-beige)' }} />
            
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{ 
                  display: 'flex', 
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: '4rem',
                  position: 'relative',
                  width: '100%'
                }}
              >
                <div style={{ width: '45%', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <h3 style={{ color: 'var(--color-gold)', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.year}</h3>
                  <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  width: '16px', 
                  height: '16px', 
                  backgroundColor: 'var(--color-gold)',
                  borderRadius: '50%',
                  top: '10px'
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default About;
