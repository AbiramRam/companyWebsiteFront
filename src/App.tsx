import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import ManageServices from './pages/admin/ManageServices';
import ManagePackages from './pages/admin/ManagePackages';
import ViewMessages from './pages/admin/ViewMessages';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <div className="container">
        <nav className="navbar">
          <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(135deg, #4F46E5, #38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Saas Global</h2>
          <div className="nav-links">
            <a href="/#hero">Home</a>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#gallery">Gallery</a>
            <a href="/#team">Team</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Contact</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="packages" element={<ManagePackages />} />
            <Route path="messages" element={<ViewMessages />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
