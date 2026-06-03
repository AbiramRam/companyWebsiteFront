import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import ManageServices from './pages/admin/ManageServices';
import ManagePackages from './pages/admin/ManagePackages';
import ViewMessages from './pages/admin/ViewMessages';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <h2>SaaS.io</h2>
        <div className="nav-links">
          <a href="/#">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#services">Services</a>
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
  );
}

export default App;
