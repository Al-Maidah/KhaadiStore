import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ adminId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (sessionStorage.getItem('admin_logged_in')) {
      api.adminCheck()
        .then(() => navigate('/admin/dashboard'))
        .catch(() => sessionStorage.removeItem('admin_logged_in'));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.adminId || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await api.adminLogin(form);
      sessionStorage.setItem('admin_logged_in', '1');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-left">
        <div className="admin-login-brand">
          <h1>KHAADI</h1>
          <p>Admin Portal</p>
        </div>
        <div className="admin-login-tagline">
          <h2>Manage your store<br />with full control.</h2>
          <p>Orders · Customers · Revenue · Analytics</p>
        </div>
      </div>

      <div className="admin-login-right">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon">🔐</div>
            <h2>Admin Sign In</h2>
            <p>Enter your admin credentials to access the dashboard</p>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label>Admin ID</label>
              <input
                type="text"
                name="adminId"
                value={form.adminId}
                onChange={handleChange}
                placeholder="Enter admin ID"
                autoComplete="off"
              />
            </div>

            <div className="admin-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@khaadi.com"
                autoComplete="off"
              />
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <div className="admin-pwd-wrapper">
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="admin-pwd-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN TO DASHBOARD'}
            </button>
          </form>

          <p className="admin-login-back">
            <a href="/">← Back to Store</a>
          </p>
        </div>
      </div>
    </div>
  );
}
