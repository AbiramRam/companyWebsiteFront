import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Social */}
          <div className="footer-brand">
            <h3>Saas Global</h3>
            <p>
              Founded in 2025, we deliver smart and scalable IT solutions from Jaffna, Sri Lanka.
              Our skilled engineers tackle any technical challenge to provide valuable services to clients worldwide.
            </p>

            {/* Office addresses */}
            <div className="footer-office">
              <div className="footer-office-item">
                <MapPin size={18} className="office-icon" />
                <p><strong>Branch Office:</strong><br />Palali Road,<br />Jaffna, Sri Lanka</p>
              </div>
              <div className="footer-office-item">
                <Phone size={18} className="office-icon" />
                <p>+94 21 413 2415&nbsp;|&nbsp; +94 77 587 1143</p>
              </div>
              <div className="footer-office-item">
                <Mail size={18} className="office-icon" />
                <p>info@saasglobal.com</p>
              </div>
            </div>

            <div className="footer-social" style={{ marginTop: '1.25rem' }}>
            </div>
          </div>

          {/* Useful Links */}
          <div className="footer-col">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/#hero">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#gallery">Gallery</a></li>
              <li><a href="/#team">Team</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Software Development</a></li>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Product Management</a></li>
              <li><a href="#">IT Consulting</a></li>
              <li><a href="#">Cloud Solutions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <a href="/">Saas Global</a>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
