import { useState, useEffect } from 'react';

export default function ManagePackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [featuresStr, setFeaturesStr] = useState('');

  const fetchPackages = () => {
    fetch('http://localhost:8081/api/packages')
      .then(res => res.json())
      .then(setPackages);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const features = featuresStr.split(',').map(f => f.trim());
    await fetch('http://localhost:8081/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, price: parseFloat(price), features })
    });
    setName('');
    setPrice('');
    setFeaturesStr('');
    fetchPackages();
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`http://localhost:8081/api/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchPackages();
  };

  return (
    <div>
      <h3>Add Package</h3>
      <form onSubmit={handleAdd} style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <input className="form-input" placeholder="Package Name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="number" className="form-input" placeholder="Price (e.g. 29.99)" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <textarea className="form-textarea" placeholder="Features (comma separated)" value={featuresStr} onChange={e => setFeaturesStr(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Add Package</button>
      </form>

      <h3>Existing Packages</h3>
      <ul>
        {packages.map(p => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <div>
              <strong>{p.name} - ${p.price}</strong>
              <p style={{ margin: 0 }}>{p.features?.join(', ')}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="btn" style={{ background: 'red', color: 'white' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
