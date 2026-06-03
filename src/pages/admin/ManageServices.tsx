import { useState, useEffect } from 'react';

export default function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchServices = () => {
    fetch('http://localhost:8081/api/services')
      .then(res => res.json())
      .then(setServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    await fetch('http://localhost:8081/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, iconUrl: '' })
    });
    setTitle('');
    setDescription('');
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`http://localhost:8081/api/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchServices();
  };

  return (
    <div>
      <h3>Add Service</h3>
      <form onSubmit={handleAdd} style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <input className="form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <textarea className="form-textarea" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Add Service</button>
      </form>

      <h3>Existing Services</h3>
      <ul>
        {services.map(s => (
          <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <div>
              <strong>{s.title}</strong>
              <p style={{ margin: 0 }}>{s.description}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="btn" style={{ background: 'red', color: 'white' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
