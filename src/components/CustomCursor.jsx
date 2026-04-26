import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add custom cursor class to body
    document.body.classList.add('custom-cursor');

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') !== null ||
          e.target.closest('button') !== null) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: "spring", mass: 0.1, stiffness: 400, damping: 28 }
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "var(--color-gold)",
      mixBlendMode: "difference",
      transition: { type: "spring", mass: 0.1, stiffness: 400, damping: 28 }
    }
  };

  return (
    <motion.div
      className="cursor"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-charcoal)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
