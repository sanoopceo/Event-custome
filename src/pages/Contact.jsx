import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Instagram, Youtube } from '../components/icons';

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const Contact = () => {
  const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;

  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const eventType = form.eventType.value;
  const message = form.message.value;

  const text = `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Event: ${eventType}
Message: ${message}
`;

  const url = `https://wa.me/919048900526?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");

  alert("Opening WhatsApp...");
  form.reset();
};
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
            <h4 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>Reach Out</h4>
            <h1 style={{ fontSize: '3.5rem' }}>Let's Create Magic</h1>
            <p style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '1rem auto' }}>
              We'd love to hear more about your dream event. Contact us to schedule a private consultation.
            </p>
          </motion.div>

          <div className="grid-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel"
              style={{ padding: '3rem', borderRadius: '12px' }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    required
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    required
                  />

                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                />

                <select
                  name="eventType"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none'
                  }}
                >
                  <option value="">Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Private">Private Party</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us about your event details..."
                  rows="4"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--color-gold)" /> Office
                  </h4>
                  <p style={{ color: 'var(--color-muted)' }}>123 Luxury Avenue<br />Suite 500<br />New York, NY 10001</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={20} color="var(--color-gold)" /> Direct
                  </h4>
                  <p style={{ color: 'var(--color-muted)' }}>+1 (555) 123-4567<br />hello@elegance.com</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Follow & Connect</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <Instagram size={18} /> Instagram
                  </a>
                  <a
                    href={`https://wa.me/91 9048900526?text=${encodeURIComponent("Hello, I want to know more about your catering services.")}`}
                    className="btn btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#25D366'
                    }}
                  >
                    <Phone size={18} /> WhatsApp
                  </a>
                  <a href="#" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    Behance
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{
                width: '100%',
                height: '250px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <iframe
                  title="Elegance HQ Location"
                  src="https://www.google.com/maps?q=Kaliyali,Kerala&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
