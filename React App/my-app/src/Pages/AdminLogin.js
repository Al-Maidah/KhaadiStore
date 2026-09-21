import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, KeyRound, Eye, EyeOff, AlertCircle, ArrowLeft, LogIn } from 'lucide-react';
import { api } from '../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ adminId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

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
            <div className="admin-login-icon">
              <ShieldCheck size={40} strokeWidth={1.5} color="#1a237e" />
            </div>
            <h2>Admin Sign In</h2>
            <p>Enter your admin credentials to access the dashboard</p>
          </div>

          {error && (
            <div className="admin-login-error">
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label>Admin ID</label>
              <div className="admin-input-wrapper">
                <ShieldCheck size={15} className="admin-input-icon" />
                <input
                  type="text"
                  name="adminId"
                  value={form.adminId}
                  onChange={handleChange}
                  placeholder=""
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Email Address</label>
              <div className="admin-input-wrapper">
                <Mail size={15} className="admin-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=""
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <div className="admin-pwd-wrapper admin-input-wrapper">
                <KeyRound size={15} className="admin-input-icon" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder=""
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  className="admin-pwd-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd
                    ? <EyeOff size={16} color="#777" />
                    : <Eye size={16} color="#777" />}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading
                ? 'SIGNING IN…'
                : <><LogIn size={15} style={{ marginRight: 8, verticalAlign: 'middle' }} />SIGN IN TO DASHBOARD</>}
            </button>
          </form>

          <p className="admin-login-back">
            <a href="/"><ArrowLeft size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Back to Store</a>
          </p>
        </div>
      </div>
    </div>
  );
}
