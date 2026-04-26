import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const SectionReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const totalFrames = 80;
    
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const index = i.toString().padStart(3, '0');
      img.src = `/image_new/Wedding_reception_hall_202604242342_${index}.jpg`;
      imagesRef.current.push(img);
    }

    let animationFrameId;
    let lastDrawTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const draw = (timestamp) => {
      if (timestamp - lastDrawTime > interval) {
        if (canvasRef.current && imagesRef.current.length > 0) {
          const ctx = canvasRef.current.getContext('2d');
          const img = imagesRef.current[frameRef.current];
          
          if (img && img.complete && img.naturalWidth !== 0) {
            const canvas = canvasRef.current;
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;
            const canvasRatio = cw / ch;
            const imgRatio = iw / ih;
            let drawWidth = cw;
            let drawHeight = ch;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
              drawWidth = ch * imgRatio;
              offsetX = (cw - drawWidth) / 2;
            } else {
              drawHeight = cw / imgRatio;
              offsetY = (ch - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          }
          
          frameRef.current = (frameRef.current + 1) % totalFrames;
        }
        lastDrawTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = parent.clientHeight;
        lastDrawTime = 0; // force draw
      }
    };
    
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const featured = [
    { title: "Featured Weddings", img: "/image/photo-1519225421980-715cb0215aed.avif" },
    { title: "Corporate Events", img: "/image/4d644007c88555409123df4c572e4103.jpg" },
    { title: "Premium Catering", img: "/image/29798e0317bf29333e3e276b525c8742.jpg" },
    { title: "Event Decor", img: "/image/88fc914022b57ff20f3d6c47b2eb3a60.jpg" },
    { title: "Food & Dining", img: "/image/photo-1555244162-803834f70033.avif" },
    { title: "Photography & Entertainment", img: "/image/71843970796d385a5b0baae5cae7d489.jpg" }
  ];

  return (
    <motion.div {...PageTransition} style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <motion.div 
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '120%',
            y: yHero,
            zIndex: -1
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
          <canvas 
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </motion.div>
        
        <motion.div className="container" style={{ zIndex: 2, y: yHero, opacity: opacityHero }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              color: 'var(--color-white)', 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              maxWidth: '1000px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              marginBottom: '2rem'
            }}
          >
            Crafting Unforgettable Events
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <Link to="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--color-gold)' }}>
              Book Consultation
            </Link>
            <Link to="/services" className="btn btn-outline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-white)' }}
        >
          <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 auto', overflow: 'hidden' }}>
             <motion.div 
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                style={{ width: '100%', height: '50%', backgroundColor: 'var(--color-white)' }}
             />
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section bg-ivory">
        <div className="container">
          <SectionReveal>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '1rem' }}>Our Philosophy</h4>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '2rem' }}>
                Where imagination meets meticulous execution.
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                We believe that every event should be a masterpiece. From intimate gatherings to grand celebrations, our dedicated team ensures every detail reflects your vision, creating an atmosphere of pure luxury and sophistication.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {featured.map((item, index) => (
              <SectionReveal key={index}>
                <Link to={`/details/${encodeURIComponent(item.title)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <motion.div 
                    className="glass-panel"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      borderRadius: '8px', 
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ height: '350px', overflow: 'hidden' }}>
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        src={item.img} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{item.title}</h3>
                      <motion.div whileHover={{ x: 5 }}><ArrowRight color="var(--color-gold)" /></motion.div>
                    </div>
                  </motion.div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <ReviewSection />

      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-charcoal)', color: 'var(--color-white)', textAlign: 'center' }}>
        <div className="container">
          <SectionReveal>
             <h2 style={{ color: 'var(--color-white)', fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to plan your dream event?</h2>
             <Link to="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--color-gold)' }}>Contact Us Today</Link>
          </SectionReveal>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
