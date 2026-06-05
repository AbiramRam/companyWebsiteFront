import { useState, useEffect, useRef, useCallback } from 'react';
import { Package, Zap, ChevronLeft, ChevronRight, ChevronDown, Code2, Lightbulb, Cloud, ShieldCheck, CalendarCheck, Hotel, UtensilsCrossed, UserCheck, ClipboardCheck, BarChart3, MapPin, Phone, Mail } from 'lucide-react';

// Gallery images
import workingSpaceImg from '../assets/gallery/working_space.png';
import teamPhotoImg from '../assets/gallery/team_photo.png';
import openingCeremonyImg from '../assets/gallery/opening_ceremony.png';
import boardRoomImg from '../assets/gallery/board_room.png';
import celebrationImg from '../assets/gallery/celebration.png';
import standupMeetingImg from '../assets/gallery/standup_meeting.png';

/* ------------------------------------------------
   Types
   ------------------------------------------------ */
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
}

interface PackageItem {
  id: number;
  name: string;
  price: number;
  features: string[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

/* ------------------------------------------------
   Data
   ------------------------------------------------ */
const carouselSlides = [
  { icon: <Hotel size={32} />, title: 'Hotel Management System', desc: 'A hotel management system (HMS) is a software application that helps hotels manage their operations, including reservations, check-ins, check-outs, and billing.' },
  { icon: <UtensilsCrossed size={32} />, title: 'Feast Master', desc: 'Whether you\'re starting a new restaurant website, or looking for a restaurant re-design. Our goal is to provide the best professional restaurant web design solutions at an affordable price.' },
  { icon: <UserCheck size={32} />, title: 'Visitor Management System', desc: 'Visitor Management System is a web-based system that helps you manage your Visitor\'s operations efficiently.' },
  { icon: <ClipboardCheck size={32} />, title: 'Attendance Management System', desc: 'Attendance management systems help organizations track employee attendance, manage leave requests, and ensure compliance with labor laws.' },
  { icon: <BarChart3 size={32} />, title: 'Quality Data Management System', desc: 'Quality data management is the process of ensuring that data is accurate, consistent, and reliable, supporting decision-making and improving business processes.' },
];

const galleryItems = [
  { img: teamPhotoImg, title: 'Our Team', desc: 'Our Team', category: 'team' },
  { img: openingCeremonyImg, title: 'Opening Ceremony', desc: 'Company Opening Ceremony', category: 'ceremony' },
  { img: celebrationImg, title: 'Pongal Celebration', desc: 'Our Pongal Celebration', category: 'ceremony' },
  { img: standupMeetingImg, title: 'Standup Meeting Room', desc: 'Standup Meeting Room', category: 'space' },
  { img: workingSpaceImg, title: 'Working Space', desc: 'Our Working Space', category: 'space' },
  { img: boardRoomImg, title: 'Board Room', desc: 'Our Board Room', category: 'space' },
];

const teamMembers = [
  { name: 'MRS. S. SUJIKALA', role: 'Chairman', initials: 'SS', avatarClass: 'team-avatar-1', bio: 'She was appointed to the Board in 2025. He has over 30 years of experience in business management, strategic planning and social and economic research.' },
  { name: 'MR. K. GUNA', role: 'Director', initials: 'GN', avatarClass: 'team-avatar-2', bio: 'Guiding Visionaries Behind Our Success — driving strategic initiatives and innovation across all business verticals.' },
  { name: 'MR. SURIYAKUMAR', role: 'Director', initials: 'SS', avatarClass: 'team-avatar-3', bio: 'Guiding Visionaries Behind Our Success — championing technology-driven transformation and operational excellence.' },
];

const faqData = [
  { q: 'What services do you offer?', a: 'We provide custom software development, IT consulting, cloud solutions, and cybersecurity services to help businesses grow and thrive.' },
  { q: 'How can I get started with your services?', a: 'Simply contact us to schedule a consultation, and we\'ll discuss your business needs and tailor a solution that fits.' },
  { q: 'Do you offer ongoing support after project completion?', a: 'Yes, we offer continuous support and maintenance to ensure your solutions run smoothly and remain up to date.' },
  { q: 'How do you ensure the security of my data?', a: 'We implement robust security measures, including encryption and regular audits, to safeguard your data from potential threats.' },
  { q: 'Can your services be customized to fit my business needs?', a: 'Absolutely! Our solutions are fully customizable to align with your specific goals and requirements.' },
];

const detailedServices = [
  { icon: <Code2 size={24} />, title: 'Software Development', desc: 'We design and build tailored software solutions to meet your unique business requirements and drive growth.' },
  { icon: <Lightbulb size={24} />, title: 'IT Consulting & Strategy', desc: 'Our expert consultants help you navigate complex tech challenges, providing actionable strategies for long-term success.' },
  { icon: <Cloud size={24} />, title: 'Cloud Solutions', desc: 'We offer flexible and secure cloud services that enable seamless scaling and enhanced business agility.' },
  { icon: <ShieldCheck size={24} />, title: 'Cybersecurity & Data Protection', desc: 'We ensure robust protection of your data and systems with advanced security measures against evolving cyber threats.' },
];

/* ------------------------------------------------
   Animated Counter Hook
   ------------------------------------------------ */
function useCountUp(target: number, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display: `${count}${suffix}` };
}

/* ------------------------------------------------
   Scroll reveal hook
   ------------------------------------------------ */
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ================================================
   HOME COMPONENT
   ================================================ */
export default function Home() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState('all');

  // Particle state
  const [particles, setParticles] = useState<Particle[]>([]);

  // Animated counters
  const counter1 = useCountUp(98, 2000, '%');
  const counter2 = useCountUp(150, 2000, '+');
  const counter3 = useCountUp(50, 2000, '+');
  const counter4 = useCountUp(99, 2000, '%');

  // Fade-in refs
  const aboutRef = useFadeIn();
  const valueRef = useFadeIn();
  const servicesRef = useFadeIn();
  const detailedServicesRef = useFadeIn();
  const galleryRef = useFadeIn();
  const teamRef = useFadeIn();
  const faqRef = useFadeIn();
  const contactRef = useFadeIn();

  /* --- Data Fetching --- */
  useEffect(() => {
    fetch('https://charismatic-art-production-3e7a.up.railway.app/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);

    fetch('https://charismatic-art-production-3e7a.up.railway.app/api/packages')
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(console.error);
  }, []);

  /* --- Carousel auto-play --- */
  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % carouselSlides.length);

  /* --- Particle system --- */
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x, y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: (() => {
        const r = Math.random();
        if (r < 0.33) return `rgba(255, ${Math.random() * 100 + 50}, 50, ${Math.random() * 0.5 + 0.3})`;
        if (r < 0.66) return `rgba(200, 50, ${Math.random() * 150 + 100}, ${Math.random() * 0.5 + 0.3})`;
        return `rgba(50, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.3})`;
      })(),
      life: 80,
    };
    setParticles(prev => [...prev, newParticle]);
  };

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vx: p.vx * 0.95, vy: p.vy * 0.95, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  /* --- Contact submit --- */
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://charismatic-art-production-3e7a.up.railway.app/api/messages', {
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
    } catch {
      setStatus('Error sending message.');
    }
  };

  /* --- Gallery filtering --- */
  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  /* ================================
     RENDER
     ================================ */
  return (
    <div>
      <style>{`@keyframes fade { from { opacity: 1; } to { opacity: 0; } }`}</style>

      {/* ===================== HERO ===================== */}
      <section
        id="hero"
        className="hero"
        style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseMove={handleMouseMove}
      >
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              width: `${p.size * 2}px`,
              height: `${p.size}px`,
              borderRadius: '2px',
              background: p.color,
              top: `${p.y}%`,
              left: `${p.x}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: p.life / 80,
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ background: 'linear-gradient(to right, #4F46E5, #38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Next-Generation IT Solutions
          </h1>
          <p className="hero-subtitle">Empowering enterprises with scalable cloud infrastructure, advanced cybersecurity, and bespoke software development to drive digital transformation.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#services" className="btn btn-primary">Our Expertise</a>
            <a href="#contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* ===================== CAROUSEL ===================== */}
      <section className="carousel-section">
        <div className="carousel-container">
          <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous slide"><ChevronLeft size={20} /></button>
          <button className="carousel-nav next" onClick={nextSlide} aria-label="Next slide"><ChevronRight size={20} /></button>

          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselSlides.map((slide, i) => (
              <div key={i} className="carousel-slide">
                <div className="carousel-card">
                  <div className="carousel-icon">{slide.icon}</div>
                  <h3>{slide.title}</h3>
                  <p>{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" ref={aboutRef as React.RefObject<HTMLElement>} className="fade-in-section" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>About Us</h2>
        <p className="section-subtitle">
          Founded in 2019 and located in Jaffna, Northern part of Sri Lanka, we have very effective skilled engineers who can take on any technical challenges and provide valuable services to our clients.
        </p>
        <div className="grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
            <h3 style={{ fontSize: '1.1rem' }}>We build smart and scalable IT solutions.</h3>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.1rem' }}>Our experts deliver quality and innovation.</h3>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.1rem' }}>Driving tech forward with cutting-edge solutions.</h3>
          </div>
        </div>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.8' }}>
          We are committed to the timely delivery of user-friendly systems with zero defects, robust and extensible product design,
          disciplined and rigid project management and dependable customer service. We are on a constant search for winning ideas to build unique products.
          Tell us your idea — together, we can co-create a great product out of it!
        </p>
      </section>

      {/* ===================== VALUE PROPOSITIONS ===================== */}
      <section ref={valueRef as React.RefObject<HTMLElement>} className="value-props-section fade-in-section">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>Revolutionizing Businesses with Smart Technology!</h2>
          <p className="section-subtitle">
            Clients choose us for our expertise in delivering custom software solutions that drive success. We use cutting-edge technology to meet your unique business needs.
          </p>

          <div className="value-props-grid">
            <div className="value-prop-card">
              <div className="value-prop-number">01</div>
              <h3>Driving Digital Transformation</h3>
              <p>We enable businesses to stay ahead of the curve by adopting innovative technology solutions that streamline operations and drive growth.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-prop-number">02</div>
              <h3>Unlocking Efficiency Through Automation</h3>
              <p>Our automation tools optimize workflows, reduce human error, and increase productivity, allowing your team to focus on strategic goals.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-prop-number">03</div>
              <h3>Future-Proofing with Scalable Solutions</h3>
              <p>We design flexible, scalable solutions that grow with your business, ensuring long-term sustainability and competitiveness.</p>
            </div>
          </div>

          <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Our Proven Success in Delivering Excellence</h3>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Exceptional Client Satisfaction, On-Time Delivery, and Unmatched Technical Expertise
          </p>

          <div className="counters-grid">
            <div className="counter-card" ref={counter1.ref}>
              <div className="counter-number">{counter1.display}</div>
              <div className="counter-label">Client Satisfaction</div>
            </div>
            <div className="counter-card" ref={counter2.ref}>
              <div className="counter-number">{counter2.display}</div>
              <div className="counter-label">Projects Delivered</div>
            </div>
            <div className="counter-card" ref={counter3.ref}>
              <div className="counter-number">{counter3.display}</div>
              <div className="counter-label">Team Members</div>
            </div>
            <div className="counter-card" ref={counter4.ref}>
              <div className="counter-number">{counter4.display}</div>
              <div className="counter-label">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== API SERVICES ===================== */}
      <section id="services" ref={servicesRef as React.RefObject<HTMLElement>} className="fade-in-section" style={{ padding: '5rem 0' }}>
        <h2 style={{ textAlign: 'center' }}>Core Capabilities</h2>
        <div className="grid">
          {services.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No services available yet.</p>
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

      {/* ===================== DETAILED SERVICES ===================== */}
      <section ref={detailedServicesRef as React.RefObject<HTMLElement>} className="detailed-services-section fade-in-section">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>Innovative IT Services Designed to Empower Your Business</h2>
          <p className="section-subtitle">
            From custom software to robust cybersecurity — we deliver end-to-end technology solutions tailored to your needs.
          </p>

          <div className="services-detailed-grid">
            {detailedServices.map((svc, i) => (
              <div key={i} className="service-detail-card">
                <div className="service-detail-icon">{svc.icon}</div>
                <div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="schedule-cta">
            <CalendarCheck size={36} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <p>Schedule a meeting with our experts to explore how our innovative solutions can drive your business forward.</p>
            <a href="#contact" className="btn btn-primary">Schedule Meeting</a>
          </div>
        </div>
      </section>

      {/* ===================== PACKAGES ===================== */}
      <section id="packages" style={{ padding: '5rem 0' }}>
        <h2 style={{ textAlign: 'center' }}>Enterprise Service Tiers</h2>
        <div className="grid">
          {packages.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No packages available yet.</p>
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

      {/* ===================== GALLERY ===================== */}
      <section id="gallery" ref={galleryRef as React.RefObject<HTMLElement>} className="gallery-section fade-in-section">
        <h2 style={{ textAlign: 'center' }}>Our Gallery</h2>
        <p className="section-subtitle">Behind the Scenes: A Glimpse into Our Company and Team</p>

        <div className="gallery-filters">
          {['all', 'space', 'ceremony', 'team'].map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn ${galleryFilter === cat ? 'active' : ''}`}
              onClick={() => setGalleryFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGallery.map((item, i) => (
            <div key={i} className="gallery-item">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TEAM / BOARD ===================== */}
      <section id="team" ref={teamRef as React.RefObject<HTMLElement>} className="team-section fade-in-section">
        <h2 style={{ textAlign: 'center' }}>Board Of Directors</h2>
        <p className="section-subtitle">Meet Our Board of Directors</p>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card">
              <div className={`team-avatar ${member.avatarClass}`}>
                {member.initials}
              </div>
              <h4>{member.name}</h4>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" ref={faqRef as React.RefObject<HTMLElement>} className="faq-section fade-in-section">
        <h2 style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
        <p className="section-subtitle">Answers to Common Questions About Our Services and How We Can Help Your Business</p>

        <div className="faq-container">
          {faqData.map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-icon"><ChevronDown size={16} /></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" ref={contactRef as React.RefObject<HTMLElement>} className="fade-in-section" style={{ padding: '5rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Get in Touch</h2>
        <p className="section-subtitle">We're Here to Assist You with Any Questions or Inquiries</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="service-detail-icon"><MapPin size={22} /></div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Address</h3>
                <p style={{ fontSize: '0.9rem' }}>Palali Road, Jaffna, Sri Lanka</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="service-detail-icon"><Phone size={22} /></div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Call Us</h3>
                <p style={{ fontSize: '0.9rem' }}>+94 21 412 5163</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="service-detail-icon"><Mail size={22} /></div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Email Us</h3>
                <p style={{ fontSize: '0.9rem' }}>info@saasglobal.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
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
        </div>
      </section>
    </div>
  );
}
