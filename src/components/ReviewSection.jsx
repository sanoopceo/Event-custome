import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';


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

const initialReviews = [
  {
    id: 1,
    name: "Eleanor & James",
    text: "The team exceeded our expectations. Every detail was meticulously planned and flawlessly executed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Corporate Innovations Inc.",
    text: "Our annual gala was a resounding success, thanks to the stunning decor and exceptional service provided.",
    rating: 5,
  }
];

const ReviewSection = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("reviews");
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview = {
      id: Date.now(),
      name,
      text,
      rating
    };

    setReviews(prev => [newReview, ...prev]);
    setName('');
    setText('');
    setRating(5);
  };

  return (
    <section className="section bg-ivory">
      <div className="container">
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Client Stories
            </h4>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
              Words From Our Clients
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Discover what our clients have to say about their experiences and share your own story below.
            </p>
          </div>
        </SectionReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < review.rating ? "var(--color-gold)" : "transparent"}
                      color="var(--color-gold)"
                    />
                  ))}
                </div>

                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', flexGrow: 1 }}>
                  "{review.text}"
                </p>

                <h4 style={{ color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  — {review.name}
                </h4>

                {/* ✅ ADD THIS PART */}
                <button
                  onClick={() => {
                    setReviews(prev => prev.filter(r => r.id !== review.id));
                  }}
                  style={{
                    marginTop: '1rem',
                    background: 'black',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <SectionReveal>
          <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', borderRadius: '12px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Leave a Review</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-muted)' }}>Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Star
                        size={24}
                        fill={star <= rating ? "var(--color-gold)" : "transparent"}
                        color="var(--color-gold)"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Share your experience..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows="4"
                  required
                  style={{ width: '100%', resize: 'vertical' }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit Review
              </button>
            </form>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ReviewSection;
