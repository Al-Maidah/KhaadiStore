import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Users, Store,
  LogOut, AlertTriangle, Search, RefreshCw,
  TrendingUp, DollarSign, Calendar, Package,
  CheckCircle2, Loader2,
} from 'lucide-react';
import { api } from '../api/client';

const STATUS_COLORS = {
  placed:     { bg: '#e8f4fd', color: '#1565c0' },
  processing: { bg: '#fff3e0', color: '#e65100' },
  shipped:    { bg: '#f3e5f5', color: '#6a1b9a' },
  delivered:  { bg: '#e8f5e9', color: '#2e7d32' },
  cancelled:  { bg: '#fce4ec', color: '#b71c1c' },
};
const STATUS_OPTIONS = ['placed', 'processing', 'shipped', 'delivered', 'cancelled'];

/* ── small reusable components ── */
function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div className="adm-stat-card" style={{ borderTop: `4px solid ${accent}` }}>
      <div className="adm-stat-icon" style={{ background: accent + '18', color: accent }}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <div className="adm-stat-body">
        <p className="adm-stat-label">{label}</p>
        <h3 className="adm-stat-value">{value}</h3>
        {sub && <p className="adm-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.revenue), 1);
  return (
    <div className="adm-chart-bars">
      {data.map((d, i) => (
        <div key={i} className="adm-bar-col">
          <div className="adm-bar-track">
            <div
              className="adm-bar-fill"
              style={{ height: `${Math.max((d.revenue / max) * 100, 2)}%` }}
              title={`PKR ${d.revenue.toLocaleString()} · ${d.orders} order${d.orders !== 1 ? 's' : ''}`}
            />
          </div>
          <span className="adm-bar-label">{d.label}</span>
          <span className="adm-bar-val">{d.orders > 0 ? d.orders : '–'}</span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = status || 'placed';
  const c = STATUS_COLORS[s] || STATUS_COLORS.placed;
  return (
    <span style={{
      background: c.bg, color: c.color,
      padding: '3px 10px', borderRadius: 12,
      fontSize: 11, fontWeight: 700, letterSpacing: 1,
      textTransform: 'uppercase',
    }}>
      {s}
    </span>
  );
}

/* ── main component ── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]   = useState('dashboard');
  const [stats, setStats]           = useState(null);
  const [orders, setOrders]         = useState([]);
  const [customers, setCustomers]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch]         = useState('');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  /* verify session */
  useEffect(() => {
    if (!sessionStorage.getItem('admin_logged_in')) { navigate('/admin/login'); return; }
    api.adminCheck().catch(() => {
      sessionStorage.removeItem('admin_logged_in');
      navigate('/admin/login');
    });
  }, [navigate]);

  const loadDashboard = useCallback(async () => {
    setLoading(true); setError('');
    try { setStats(await api.adminStats()); }
    catch (e) { setError(e.message || 'Failed to load dashboard.'); }
    finally { setLoading(false); }
  }, []);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try { setOrders(await api.adminOrders()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try { setCustomers(await api.adminCustomers()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') loadDashboard();
    else if (activeTab === 'orders')    loadOrders();
    else if (activeTab === 'customers') loadCustomers();
  }, [activeTab, loadDashboard, loadOrders, loadCustomers]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await api.adminUpdateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: updated.status } : o));
      if (stats) setStats(await api.adminStats());
    } catch (e) { alert('Failed to update status: ' + e.message); }
    finally { setUpdatingId(null); }
  };

  const handleLogout = async () => {
    try { await api.adminLogout(); } catch {}
    sessionStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  const fmt = (n) => `PKR ${(n || 0).toLocaleString()}`;

  const filteredOrders = orders.filter(o =>
    !search ||
    (o.orderNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredCustomers = customers.filter(c =>
    !search ||
    (c.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { id: 'dashboard', Icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders',    Icon: ShoppingBag,     label: 'Orders'    },
    { id: 'customers', Icon: Users,           label: 'Customers' },
  ];

  return (
    <div className="adm-layout">
      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <span className="adm-brand-logo">K</span>
          <div>
            <h3>KHAADI</h3>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="adm-nav">
          {navItems.map(({ id, Icon, label }) => (
            <button
              key={id}
              className={`adm-nav-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => { setActiveTab(id); setSearch(''); }}
            >
              <Icon size={16} strokeWidth={activeTab === id ? 2.2 : 1.8} className="adm-nav-icon" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <a href="/" className="adm-nav-btn" style={{ textDecoration: 'none' }}>
            <Store size={16} strokeWidth={1.8} className="adm-nav-icon" />
            <span>View Store</span>
          </a>
          <button className="adm-nav-btn adm-logout-btn" onClick={handleLogout}>
            <LogOut size={16} strokeWidth={1.8} className="adm-nav-icon" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="adm-main">
        {/* Topbar */}
        <div className="adm-topbar">
          <div>
            <h1 className="adm-page-title">
              {activeTab === 'dashboard' ? 'Dashboard' :
               activeTab === 'orders'    ? 'All Orders' : 'Customers'}
            </h1>
            <p className="adm-page-date">{today}</p>
          </div>
          <div className="adm-topbar-right">
            {(activeTab === 'orders' || activeTab === 'customers') && (
              <div className="adm-search-wrap">
                <Search size={14} className="adm-search-icon" />
                <input
                  className="adm-search"
                  placeholder={activeTab === 'orders' ? 'Search by order # or email…' : 'Search by name or email…'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}
            {activeTab === 'dashboard' && (
              <button
                className="adm-refresh-btn"
                onClick={loadDashboard}
                title="Refresh"
              >
                <RefreshCw size={15} />
              </button>
            )}
            <div className="adm-avatar">A</div>
          </div>
        </div>

        {error && (
          <div className="adm-error-banner">
            <AlertTriangle size={15} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="adm-loading">
            <Loader2 size={22} className="adm-spinner" />
            Loading…
          </div>
        )}

        {/* ── DASHBOARD TAB ── */}
        {!loading && activeTab === 'dashboard' && stats && (
          <div className="adm-dashboard-content">

            <div className="adm-stats-grid">
              <StatCard label="Total Orders"    value={stats.totalOrders}       sub="All time"                            icon={Package}    accent="#1565c0" />
              <StatCard label="Total Revenue"   value={fmt(stats.totalRevenue)} sub="All time"                            icon={DollarSign} accent="#2e7d32" />
              <StatCard label="Total Customers" value={stats.totalCustomers}    sub="Registered accounts"                 icon={Users}      accent="#6a1b9a" />
              <StatCard label="Today's Orders"  value={stats.todayOrders}       sub={fmt(stats.todayRevenue) + ' revenue'} icon={Calendar}   accent="#e65100" />
            </div>

            <div className="adm-revenue-row">
              <div className="adm-revenue-card">
                <p className="adm-rev-label">TODAY</p>
                <h3 className="adm-rev-value">{fmt(stats.todayRevenue)}</h3>
                <p className="adm-rev-sub">{stats.todayOrders} order{stats.todayOrders !== 1 ? 's' : ''}</p>
              </div>
              <div className="adm-revenue-card">
                <p className="adm-rev-label">YESTERDAY</p>
                <h3 className="adm-rev-value">{fmt(stats.yestRevenue)}</h3>
                <p className="adm-rev-sub">{stats.yestOrders} order{stats.yestOrders !== 1 ? 's' : ''}</p>
              </div>
              <div className="adm-revenue-card adm-revenue-card--accent">
                <p className="adm-rev-label">THIS MONTH</p>
                <h3 className="adm-rev-value">{fmt(stats.monthRevenue)}</h3>
                <p className="adm-rev-sub">{stats.monthOrders} order{stats.monthOrders !== 1 ? 's' : ''}</p>
              </div>
              <div className="adm-revenue-card adm-status-breakdown">
                <p className="adm-rev-label">
                  <TrendingUp size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  ORDER STATUS
                </p>
                {Object.entries(stats.statusBreakdown || {}).map(([s, n]) => (
                  <div key={s} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <StatusBadge status={s} />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{n}</span>
                  </div>
                ))}
                {Object.keys(stats.statusBreakdown || {}).length === 0 && (
                  <p style={{ color: '#aaa', fontSize: 12 }}>No orders yet</p>
                )}
              </div>
            </div>

            <div className="adm-card adm-chart-card">
              <div className="adm-card-header">
                <h4>Sales — Last 7 Days</h4>
                <span className="adm-card-badge">Revenue &amp; Orders / day</span>
              </div>
              {stats.last7 && stats.last7.some(d => d.revenue > 0)
                ? <BarChart data={stats.last7} />
                : <div className="adm-empty-chart">No sales data yet for the last 7 days</div>
              }
            </div>

            <div className="adm-card">
              <div className="adm-card-header">
                <h4>Recent Orders</h4>
                <button className="adm-card-link" onClick={() => setActiveTab('orders')}>View All →</button>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr><th>#</th><th>Order No.</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {(stats.recentOrders || []).length === 0 && (
                      <tr><td colSpan={7} className="adm-empty-row">No orders yet</td></tr>
                    )}
                    {(stats.recentOrders || []).map((o, i) => (
                      <tr key={o._id}>
                        <td>{i + 1}</td>
                        <td><strong>{o.orderNumber}</strong></td>
                        <td>
                          {o.shipping?.firstName} {o.shipping?.lastName}
                          <br /><span className="adm-sub-text">{o.email}</span>
                        </td>
                        <td>{(o.items || []).length} item{(o.items || []).length !== 1 ? 's' : ''}</td>
                        <td><strong>{fmt(o.total)}</strong></td>
                        <td><StatusBadge status={o.status} /></td>
                        <td className="adm-sub-text">{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {!loading && activeTab === 'orders' && (
          <div className="adm-card">
            <div className="adm-card-header">
              <h4>All Orders ({filteredOrders.length})</h4>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Order No.</th><th>Email</th><th>Shipping To</th>
                    <th>Items</th><th>Total</th><th>Payment</th>
                    <th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 && (
                    <tr><td colSpan={8} className="adm-empty-row">No orders found</td></tr>
                  )}
                  {filteredOrders.map(o => (
                    <tr key={o._id}>
                      <td><strong>{o.orderNumber}</strong></td>
                      <td className="adm-sub-text">{o.email}</td>
                      <td>
                        {o.shipping?.firstName} {o.shipping?.lastName}
                        <br /><span className="adm-sub-text">{o.shipping?.city}, {o.shipping?.state}</span>
                      </td>
                      <td>
                        {(o.items || []).map((item, idx) => (
                          <div key={idx} style={{ fontSize: 11, color: '#555' }}>
                            {item.title} {item.size ? `(${item.size})` : ''} × {item.qty}
                          </div>
                        ))}
                      </td>
                      <td><strong>{fmt(o.total)}</strong></td>
                      <td style={{ textTransform: 'uppercase', fontSize: 11 }}>{o.paymentMethod}</td>
                      <td>
                        <select
                          className="adm-status-select"
                          value={o.status || 'placed'}
                          onChange={e => handleStatusChange(o._id, e.target.value)}
                          disabled={updatingId === o._id}
                          style={{
                            background: STATUS_COLORS[o.status || 'placed']?.bg,
                            color:      STATUS_COLORS[o.status || 'placed']?.color,
                          }}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        {updatingId === o._id && (
                          <Loader2 size={12} className="adm-spinner" style={{ marginLeft: 6 }} />
                        )}
                      </td>
                      <td className="adm-sub-text">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CUSTOMERS TAB ── */}
        {!loading && activeTab === 'customers' && (
          <div className="adm-card">
            <div className="adm-card-header">
              <h4>All Customers ({filteredCustomers.length})</h4>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Email</th>
                    <th>Newsletter</th><th>Cart Items</th>
                    <th>Wishlist Items</th><th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 && (
                    <tr><td colSpan={7} className="adm-empty-row">No customers found</td></tr>
                  )}
                  {filteredCustomers.map((c, i) => (
                    <tr key={c._id}>
                      <td>{i + 1}</td>
                      <td><strong>{c.firstName} {c.lastName}</strong></td>
                      <td className="adm-sub-text">{c.email}</td>
                      <td>
                        {c.isSubscribed
                          ? <CheckCircle2 size={14} color="#2e7d32" strokeWidth={2.5} />
                          : <span style={{ color: '#ccc' }}>—</span>}
                      </td>
                      <td>{(c.cart || []).length}</td>
                      <td>{(c.wishlist || []).length}</td>
                      <td className="adm-sub-text">{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
