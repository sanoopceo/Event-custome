import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-ivory)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        flexDirection: 'column'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', letterSpacing: '4px', marginBottom: '1rem' }}>
          Élégance Events
        </h1>
      </motion.div>
      <motion.div 
        style={{ width: '200px', height: '2px', backgroundColor: 'var(--color-beige)', position: 'relative', overflow: 'hidden' }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-gold)', position: 'absolute' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
