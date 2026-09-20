import React, { useState } from 'react';
import { api } from '../api/client';
import { formatPrice, parsePrice } from '../utils/productUtils';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    if (!orderNumber.trim()) {
      setError('Enter your order number (for example KH-XXXX).');
      return;
    }
    setLoading(true);
    try {
      const found = await api.trackOrder(orderNumber.trim());
      setOrder(found);
    } catch (err) {
      setError(err.message || 'Order not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sale-page-container" style={{ maxWidth: 720, margin: '40px auto', padding: '0 20px 80px' }}>
      <h1 style={{ fontSize: '1.8rem', letterSpacing: '3px', fontWeight: 400 }}>TRACK YOUR ORDER</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Enter the order number from your confirmation.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="KH-XXXX"
          style={{ flex: 1, padding: '12px 14px', border: '1px solid #ddd', borderRadius: 4 }}
        />
        <button type="submit" style={{ background: '#111', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 4, fontWeight: 600 }}>
          {loading ? 'CHECKING...' : 'TRACK'}
        </button>
      </form>
      {error && <p style={{ color: '#b42318' }}>{error}</p>}
      {order && (
        <div style={{ border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
          <p><strong>Order</strong> {order.orderNumber}</p>
          <p><strong>Status</strong> {(order.status || 'placed').toUpperCase()}</p>
          <p><strong>Email</strong> {order.email}</p>
          <p><strong>Total</strong> {formatPrice(parsePrice(order.total))}</p>
          <ul style={{ marginTop: 16, paddingLeft: 18 }}>
            {(order.items || []).map((item, idx) => (
              <li key={idx}>{item.title} × {item.qty || 1}{item.size ? ` (${item.size})` : ''}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
