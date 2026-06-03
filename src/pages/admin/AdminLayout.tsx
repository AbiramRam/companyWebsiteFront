import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = btoa(`${username}:${password}`);

    try {
      const res = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Unable to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="card">
        <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</p>}
          <button className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin" className="btn" style={{ background: 'var(--secondary)' }}>Dashboard</Link>
        <Link to="/admin/services" className="btn" style={{ background: 'var(--secondary)' }}>Manage Services</Link>
        <Link to="/admin/packages" className="btn" style={{ background: 'var(--secondary)' }}>Manage Packages</Link>
        <Link to="/admin/messages" className="btn" style={{ background: 'var(--secondary)' }}>View Messages</Link>
      </div>
      <div className="card">
        <Outlet />
      </div>
    </div>
  );
}
