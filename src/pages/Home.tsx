import { useState, useEffect, useMemo } from 'react';
import { Package, Zap } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: String;
  description: String;
  iconUrl: String;
}

interface PackageItem {
  id: number;
  name: String;
  price: number;
  features: string[];
}

export default function Home() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:8081/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  useEffect(() => {
    fetch('http://localhost:8081/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);

    fetch('http://localhost:8081/api/packages')
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(console.error);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate normalized mouse position from center (-1 to 1)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  // Generate hundreds of tiny bubble/dots for the Antigravity effect
  const bubbles = useMemo(() => {
    return Array.from({ length: 250 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 3 + 1; // 1px to 4px
      const parallaxSpeed = Math.random() * 30 + 5; // 5 to 35
      const rotation = Math.random() * 360;
      const duration = Math.random() * 5 + 5; // 5-10s float animation
      let color = '';
      if (left < 30) {
        color = `rgba(255, ${Math.random() * 100 + 50}, 50, ${Math.random() * 0.5 + 0.3})`;
      } else if (left < 60) {
        color = `rgba(200, 50, ${Math.random() * 150 + 100}, ${Math.random() * 0.5 + 0.3})`;
      } else {
        color = `rgba(50, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.3})`;
      }
      return { id: i, size, top, left, parallaxSpeed, rotation, duration, color };
    });
  }, []);

  
  return (
    <div>
      <section
        className="hero"
        style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseMove={handleMouseMove}
      >
        {/* Render Tiny Bubbles */}
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            style={{
              position: 'absolute',
              width: `${bubble.size * 2}px`,
                height: `${bubble.size}px`,
                borderRadius: '2px',
                background: bubble.color,
                top: `${bubble.top}%`,
                left: `${bubble.left}%`,
                transform: `translate(${mousePos.x * bubble.parallaxSpeed}px, ${mousePos.y * bubble.parallaxSpeed}px) rotate(${bubble.rotation}deg)`,
                transition: 'transform 0.1s ease-out',
                pointerEvents: 'none',
                zIndex: 0,
                animation: `float ${bubble.duration}s ease-in-out infinite alternate`
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ background: 'linear-gradient(to right, #4F46E5, #38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Next-Generation IT Solutions
          </h1>
          <p className="hero-subtitle">Empowering enterprises with scalable cloud infrastructure, advanced cybersecurity, and bespoke software development to drive digital transformation.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary">Our Expertise</button>
            <button className="btn" style={{ border: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>About Us</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
          We are a premier IT solutions provider dedicated to empowering organizations through innovative technology.
          With a focus on robust cloud architectures, proactive cybersecurity, and agile software development,
          we partner with enterprises to navigate the complexities of digital transformation.
        </p>
        <div className="grid" style={{ marginTop: '3rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>99.9%</h3>
            <p>Uptime SLA Guarantee</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>500+</h3>
            <p>Enterprise Clients</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>24/7</h3>
            <p>Global Support</p>
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '4rem 0' }}>
        <h2 style={{ textAlign: 'center' }}>Core Capabilities</h2>
        <div className="grid">
          {services.length === 0 ? (
            <p>No services available yet.</p>
          ) : (
            services.map(srv => (
              <div key={srv.id} className="card">
                <Zap size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h3>{srv.title}</h3>
                <p>{srv.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="packages">
        <h2 style={{ textAlign: 'center' }}>Enterprise Service Tiers</h2>
        <div className="grid">
          {packages.length === 0 ? (
            <p>No packages available yet.</p>
          ) : (
            packages.map(pkg => (
              <div key={pkg.id} className="card">
                <Package size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h3>{pkg.name}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '1rem 0' }}>
                  ${pkg.price}/mo
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>✓ {feat}</li>
                  ))}
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Choose Plan</button>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="contact" style={{ padding: '4rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Sales</h2>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
          {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-main)' }}>{status}</p>}
        </div>
      </section>
    </div>
  );
}
