import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const menuItems = [
  {
    id: 1,
    name: "Chicken Legume Biryani",
    category: "Non-Veg",
    price: 200,
    description: "Creamy arborio rice with wild mushrooms, white truffle oil, and aged parmesan.",
    image: "/image/gourmet-chicken-biryani-with-steamed-basmati-rice-generated-by-ai.jpg"
  },
  {
    id: 2,
    name: "Herb-Crusted Rack of Lamb",
    category: "Premium",
    price: 85,
    description: "New Zealand lamb rack with rosemary crust, served with mint jus and fondant potatoes.",
    image: "/image/photo-1600891964092-4316c288032e.avif"
  },
  {
    id: 3,
    name: "Pan-Seared Sea Bass",
    category: "Non-Veg",
    price: 65,
    description: "Fresh sea bass fillet with citrus beurre blanc and wild asparagus.",
    image: "/image/photo-1519708227418-c8fd9a32b7a2.avif"
  },
  {
    id: 4,
    name: "Saffron Arancini",
    category: "Veg",
    price: 25,
    description: "Crispy risotto balls stuffed with smoked mozzarella, served with marinara.",
    image: "/image/photo-1541529086526-db283c563270.avif"
  },
  {
    id: 5,
    name: "Wagyu Beef Tenderloin",
    category: "Premium",
    price: 120,
    description: "Grade A5 Wagyu with red wine reduction and truffle pomme purée.",
    image: "/image/photo-1544025162-d76694265947.avif"
  },
  {
    id: 6,
    name: "Chicken Ballotine",
    category: "Non-Veg",
    price: 40,
    description: "Stuffed chicken breast with spinach and ricotta, wrapped in prosciutto.",
    image: "/image/photo-1604908176997-125f25cc6f3d.avif"
  },
  {
    id: 7,
    name: "Burrata & Heirloom Tomato",
    category: "Veg",
    price: 30,
    description: "Fresh burrata cheese with organic heirloom tomatoes and basil pesto.",
    image: "/image/photo-1592417817098-8fd3d9eb14a5.avif"
  },
  {
    id: 8,
    name: "Lobster Thermidor",
    category: "Premium",
    price: 150,
    description: "Classic French dish with lobster meat cooked in a rich wine sauce, stuffed back into the shell.",
    image: "/image/photo-1559742811-822873691df8.avif"
  }
];

const categories = ["All", "Veg", "Non-Veg", "Premium"];

const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: '', date: '', guests: '' });

  const WHATSAPP_NUMBER = "916235455952"; // Configurable number

  const selectedMenuItems = menuItems.filter(item => selectedItems.includes(item.id));
  const totalPrice = selectedMenuItems.reduce((sum, item) => sum + item.price, 0);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select items first");
      return;
    }

    let message = `Hello, I would like to inquire about a catering package:\n\n`;
    message += `*Selected Items:*\n`;
    selectedMenuItems.forEach(item => {
      // message += `- ${item.name} ($${item.price})\n`;
      message += `- ${item.name} (${formatINR(item.price)})\n`;
    });

    message += `\n*Total Items:* ${selectedItems.length}`;
    message += `\n*Total Estimated Price:* ${formatINR(totalPrice)} (Per Plate Base)\n\n`;

    if (orderDetails.name || orderDetails.date || orderDetails.guests) {
      message += `*Event Details:*\n`;
      if (orderDetails.name) message += `- Name: ${orderDetails.name}\n`;
      if (orderDetails.date) message += `- Date: ${orderDetails.date}\n`;
      if (orderDetails.guests) message += `- Guests: ${orderDetails.guests}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsModalOpen(false);
  };

  const filteredMenu = menuItems.filter(item =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  const toggleItemSelection = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <motion.div {...PageTransition} style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem' }}>Epicurean Delights</h4>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>Our Catering Menu</h1>
            <p style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Curate your perfect event dining experience. Select from our expertly crafted culinary masterpieces designed to tantalize your senses.
            </p>
          </motion.div>

          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '30px',
                  border: `1px solid ${activeCategory === cat ? 'var(--color-gold)' : 'rgba(0,0,0,0.1)'}`,
                  background: activeCategory === cat ? 'var(--color-gold)' : 'transparent',
                  color: activeCategory === cat ? 'var(--color-white)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: activeCategory === cat ? 600 : 400
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <motion.div layout className="menu-grid">
            <AnimatePresence>
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={item.id}
                      className="menu-card glass-panel"
                      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)' }}
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        border: isSelected ? '1px solid var(--color-gold)' : 'var(--glass-border)',
                        transition: 'border 0.3s ease'
                      }}
                    >
                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          className="menu-img"
                        />
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: 'rgba(255,255,255,0.95)',
                          padding: '0.4rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          color: item.category === 'Veg' ? '#2e7d32' : item.category === 'Non-Veg' ? '#c62828' : 'var(--color-gold)',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                          {item.category}
                        </div>
                      </div>

                      <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <h3 style={{ fontSize: '1.4rem', margin: 0, lineHeight: 1.2, paddingRight: '1rem' }}>{item.name}</h3>
                          {/* <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-gold)' }}>${item.price}</span> */}
                          <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                            {formatINR(item.price)}
                          </span>
                        </div>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '2rem', flexGrow: 1 }}>
                          {item.description}
                        </p>

                        <button
                          onClick={() => toggleItemSelection(item.id)}
                          style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: isSelected ? 'none' : '1px solid var(--color-gold)',
                            background: isSelected ? 'var(--color-gold)' : 'transparent',
                            color: isSelected ? 'var(--color-white)' : 'var(--color-gold)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: 500
                          }}
                        >
                          {isSelected ? (
                            <>
                              <Check size={18} /> Added to Package
                            </>
                          ) : (
                            <>
                              <Plus size={18} /> Add to Package
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}
                >
                  <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)' }}>No items found in this category.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating Action Button for Selected Items */}
          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50, x: '-50%' }}
                style={{
                  position: 'fixed',
                  bottom: '2rem',
                  left: '50%',
                  background: 'var(--color-charcoal)',
                  color: 'var(--color-white)',
                  padding: '1rem 2rem',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  zIndex: 100
                }}
              >
                <span>{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected</span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--color-gold)', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none' }}
                >
                  Order Package
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Modal for Order Details */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel"
              style={{
                background: 'var(--color-ivory)',
                padding: '2.5rem',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', color: 'var(--color-muted)', background: 'transparent', border: 'none' }}
              >
                <X size={24} />
              </button>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-charcoal)' }}>Review Package</h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
                You have selected {selectedItems.length} items. Fill in your details to send the inquiry via WhatsApp.
              </p>

              <form onSubmit={handleWhatsAppSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>Name *</label>
                  <input
                    type="text"
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff', fontSize: '1rem' }}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>Event Date</label>
                    <input
                      type="date"
                      value={orderDetails.date}
                      onChange={(e) => setOrderDetails({ ...orderDetails, date: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff', fontSize: '1rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>Guests</label>
                    <input
                      type="number"
                      value={orderDetails.guests}
                      onChange={(e) => setOrderDetails({ ...orderDetails, guests: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff', fontSize: '1rem' }}
                      placeholder="e.g. 100"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Total Estimated (Base):</span>
                  {/* <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)' }}>${totalPrice}</span> */}
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                    {formatINR(totalPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', borderRadius: '8px', textTransform: 'none', letterSpacing: '0', fontSize: '1.1rem' }}
                >
                  Send Inquiry via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
        }

        .menu-card:hover .menu-img {
          transform: scale(1.05);
        }

        @media (max-width: 1200px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
        
        @media (max-width: 992px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Menu;
