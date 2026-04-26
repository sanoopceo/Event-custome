import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const title = decodeURIComponent(id || "Details");

  // Map each category to a unique outstanding event video showcase
  const videoMap = {
    "Featured Weddings": "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/cd3f8bdf-7ae3-4597-9f89-04a616574e2e.mp4",
    "Corporate Events": "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&loop=1&playlist=ScMzIvxBSi4",
    "Premium Catering": "https://www.youtube.com/embed/MlhLp6t0NTo?autoplay=1&mute=1&loop=1&playlist=MlhLp6t0NTo",
    "Event Decor": "https://www.youtube.com/embed/1v0zGgQyLwM?autoplay=1&mute=1&loop=1&playlist=1v0zGgQyLwM",
    "Photography & Entertainment": "https://www.youtube.com/embed/u_gVzL0Y7D8?autoplay=1&mute=1&loop=1&playlist=u_gVzL0Y7D8"
  };

  const videoUrl = videoMap[title] || "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/cd3f8bdf-7ae3-4597-9f89-04a616574e2e.mp4";

  return (
    <motion.div {...PageTransition} style={{ minHeight: '100vh', paddingTop: '120px' }} className="section bg-ivory">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', borderColor: 'var(--color-charcoal)', color: 'var(--color-charcoal)' }}>
          &larr; Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
        >

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, color: 'var(--color-charcoal)' }}>
            {title}
          </h1>
        </motion.div>
        <motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '3rem', borderRadius: '12px', backgroundColor: 'var(--color-white)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          {/* Outstanding Video Showcase */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-charcoal)', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
            <iframe
              src={videoUrl}
              title={`Outstanding ${title} Showcase Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          </div>

          <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Experience the pinnacle of sophistication with our dedicated <strong>{title}</strong> services. Every single detail is crafted to provide a truly breathtaking experience for you and your guests. We specialize in curating high-end bespoke events customized precisely to your unique vision and preferences.
          </p>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)', lineHeight: '1.8' }}>
            From elegant décor and exquisite floral arrangements to premium multi-course catering and world-class entertainment, our expert team ensures that your event is executed flawlessly and remains unforgettable. Let us transform your dreams into a spectacular reality.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CardDetails;
