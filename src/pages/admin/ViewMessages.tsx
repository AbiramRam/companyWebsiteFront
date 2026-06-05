import { useState, useEffect } from 'react';

export default function ViewMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetch('https://charismatic-art-production-3e7a.up.railway.app/api/messages', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Messages</h3>
      {messages.length === 0 ? <p>No messages found.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {messages.map(m => (
            <li key={m.id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
              <strong>{m.name} ({m.email})</strong> <small style={{ color: 'var(--text-muted)' }}>{new Date(m.createdAt).toLocaleString()}</small>
              <p style={{ marginTop: '0.5rem' }}>{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
