import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Users, Store, LogOut,
  AlertTriangle, Search, RefreshCw, TrendingUp,
  DollarSign, Calendar, Package, CheckCircle2, Loader2,
  Package2, Plus, Pencil, Trash2, X, ChevronDown, ChevronRight,
} from 'lucide-react';
import { api } from '../api/client';

/* ─────────────────────────────────────────────────────── constants */
const STATUS_COLORS = {
  placed:     { bg: '#e8f4fd', color: '#1565c0' },
  processing: { bg: '#fff3e0', color: '#e65100' },
  shipped:    { bg: '#f3e5f5', color: '#6a1b9a' },
  delivered:  { bg: '#e8f5e9', color: '#2e7d32' },
  cancelled:  { bg: '#fce4ec', color: '#b71c1c' },
};
const STATUS_OPTIONS = ['placed', 'processing', 'shipped', 'delivered', 'cancelled'];

const COLLECTION_OPTIONS = [
  { value: 'newin',    label: 'New In' },
  { value: 'rtw',      label: 'Ready To Wear' },
  { value: 'sale',     label: 'Sale' },
  { value: 'home-top', label: 'Home' },
];

const PRODUCT_COLLECTIONS = [
  { value: 'all',      label: 'All Products' },
  { value: 'newin',    label: 'New In' },
  { value: 'sale',     label: 'Sale' },
  { value: 'rtw',      label: 'Ready To Wear' },
  { value: 'home-top', label: 'Home' },
];

const EMPTY_FORM = {
  title: '', category: '', priceNum: '', originalNum: '',
  image: '', collections: [], tag: '',
};

/* ─────────────────────────────────────────────────────── helpers */
function parsePkr(str) {
  if (!str) return '';
  return String(str).replace(/PKR\s*/i, '').replace(/,/g, '').trim();
}

function buildProductPayload(form) {
  const priceNum    = parseFloat(form.priceNum)    || 0;
  const originalNum = form.originalNum ? parseFloat(form.originalNum) : null;
  const discountPct = originalNum ? Math.round(100 - (priceNum / originalNum) * 100) : null;

  let subtitle = 'Ready To Wear';
  if (form.collections.includes('newin') && !form.collections.includes('rtw')) subtitle = 'New In';
  if (form.collections.includes('sale')) subtitle = 'Sale';

  return {
    title:          form.title.trim(),
    category:       form.category.trim(),
    subtitle,
    price:          `PKR ${priceNum.toLocaleString()}`,
    salePrice:      originalNum ? `PKR ${priceNum.toLocaleString()}`    : undefined,
    originalPrice:  originalNum ? `PKR ${originalNum.toLocaleString()}` : undefined,
    discountPercent: discountPct || undefined,
    discountTag:    discountPct  ? `${discountPct}% OFF`  : undefined,
    discount:       form.tag === 'New' ? 'New' : (discountPct ? `${discountPct}% OFF` : undefined),
    tag:            form.tag || undefined,
    image:          form.image.trim(),
    images:         [form.image.trim()],
    collections:    form.collections,
  };
}

function productToForm(p) {
  return {
    title:       p.title || '',
    category:    p.category || '',
    priceNum:    parsePkr(p.salePrice || p.price),
    originalNum: parsePkr(p.originalPrice),
    image:       p.image || (p.images && p.images[0]) || '',
    collections: p.collections || [],
    tag:         p.tag || '',
  };
}

/* ─────────────────────────────────────────────────────── small components */
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

/* ── Product Card ── */
function ProductCard({ product, onEdit, onDelete, deleting }) {
  const col = (product.collections || []);
  return (
    <div className="adm-product-card">
      <div className="adm-product-img-wrap">
        {product.image
          ? <img src={product.image} alt={product.title} className="adm-product-img" />
          : <div className="adm-product-img-placeholder"><Package2 size={32} color="#ccc" /></div>
        }
        {product.tag && <span className="adm-product-tag">{product.tag}</span>}
      </div>
      <div className="adm-product-body">
        <p className="adm-product-category">{product.category}</p>
        <p className="adm-product-title">{product.title}</p>
        <div className="adm-product-pricing">
          <span className="adm-product-price">{product.salePrice || product.price}</span>
          {product.originalPrice && (
            <span className="adm-product-original">{product.originalPrice}</span>
          )}
          {product.discountTag && (
            <span className="adm-product-discount">{product.discountTag}</span>
          )}
        </div>
        <div className="adm-product-cols">
          {col.map(c => {
            const opt = COLLECTION_OPTIONS.find(o => o.value === c);
            return opt
              ? <span key={c} className="adm-col-badge">{opt.label}</span>
              : null;
          })}
        </div>
        <div className="adm-product-actions">
          <button className="adm-prod-btn adm-prod-edit" onClick={() => onEdit(product)}>
            <Pencil size={13} /> Edit
          </button>
          <button
            className="adm-prod-btn adm-prod-delete"
            onClick={() => onDelete(product._id)}
            disabled={deleting === product._id}
          >
            {deleting === product._id
              ? <Loader2 size={13} className="adm-spinner" />
              : <Trash2 size={13} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Product Modal ── */
function ProductModal({ modal, onClose, onSaved }) {
  const isEdit = modal.mode === 'edit';
  const [form, setForm] = useState(isEdit ? productToForm(modal.product) : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const toggleCol = (val) => {
    setForm(prev => ({
      ...prev,
      collections: prev.collections.includes(val)
        ? prev.collections.filter(c => c !== val)
        : [...prev.collections, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.priceNum || !form.image) {
      setErr('Title, category, price and image URL are required.'); return;
    }
    if (form.collections.length === 0) {
      setErr('Select at least one collection.'); return;
    }
    setSaving(true); setErr('');
    try {
      const payload = buildProductPayload(form);
      const saved = isEdit
        ? await api.adminUpdateProduct(modal.product._id, payload)
        : await api.adminCreateProduct(payload);
      onSaved(saved, isEdit);
    } catch (e) {
      setErr(e.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <h3>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="adm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {err && <p className="adm-modal-error"><AlertTriangle size={13} /> {err}</p>}

        <form onSubmit={handleSubmit} className="adm-modal-form">
          <div className="adm-modal-grid">
            <div className="adm-modal-field adm-modal-full">
              <label>Product Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Lawn Tailored 3-Piece" />
            </div>
            <div className="adm-modal-field">
              <label>Category *</label>
              <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Embroidered | Lawn" />
            </div>
            <div className="adm-modal-field">
              <label>Tag</label>
              <select value={form.tag} onChange={e => set('tag', e.target.value)}>
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Hot">Hot</option>
              </select>
            </div>
            <div className="adm-modal-field">
              <label>Price (PKR) *</label>
              <input type="number" min="0" value={form.priceNum} onChange={e => set('priceNum', e.target.value)} placeholder="e.g. 4500" />
            </div>
            <div className="adm-modal-field">
              <label>Original Price (PKR) <span className="adm-modal-hint">— for sale/discounted items</span></label>
              <input type="number" min="0" value={form.originalNum} onChange={e => set('originalNum', e.target.value)} placeholder="e.g. 9000 (leave blank if no discount)" />
            </div>
            <div className="adm-modal-field adm-modal-full">
              <label>Image URL *</label>
              <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="adm-modal-field" style={{ marginTop: 18 }}>
            <label>Collections * <span className="adm-modal-hint">— select where this product appears</span></label>
            <div className="adm-col-checkboxes">
              {COLLECTION_OPTIONS.map(opt => (
                <label key={opt.value} className="adm-col-check">
                  <input
                    type="checkbox"
                    checked={form.collections.includes(opt.value)}
                    onChange={() => toggleCol(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {form.image && (
            <div className="adm-modal-preview">
              <p className="adm-modal-hint">Image preview:</p>
              <img src={form.image} alt="preview" onError={e => { e.target.style.display = 'none'; }} />
            </div>
          )}

          <div className="adm-modal-footer">
            <button type="button" className="adm-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="adm-modal-save" disabled={saving}>
              {saving ? <><Loader2 size={14} className="adm-spinner" /> Saving…</> : (isEdit ? 'Save Changes' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── main component */
export default function AdminDashboard() {
  const navigate = useNavigate();

  // tab state
  const [activeTab,        setActiveTab]        = useState('dashboard');
  const [productsOpen,     setProductsOpen]     = useState(false);
  const [productCollection,setProductCollection]= useState('all');

  // data
  const [stats,     setStats]     = useState(null);
  const [orders,    setOrders]    = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products,  setProducts]  = useState([]);

  // ui
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search,     setSearch]     = useState('');
  const [modal,      setModal]      = useState(null); // { mode:'add'|'edit', product? }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  /* verify admin session */
  useEffect(() => {
    if (!sessionStorage.getItem('admin_logged_in')) { navigate('/admin/login'); return; }
    api.adminCheck().catch(() => {
      sessionStorage.removeItem('admin_logged_in');
      navigate('/admin/login');
    });
  }, [navigate]);

  /* data loaders */
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

  const loadProducts = useCallback(async (col) => {
    setLoading(true); setError('');
    try { setProducts(await api.adminGetProducts(col)); }
    catch (e) { setError(e.message || 'Failed to load products.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') loadDashboard();
    else if (activeTab === 'orders')    loadOrders();
    else if (activeTab === 'customers') loadCustomers();
    else if (activeTab === 'products')  loadProducts(productCollection);
  }, [activeTab, productCollection, loadDashboard, loadOrders, loadCustomers, loadProducts]);

  /* handlers */
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await api.adminUpdateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: updated.status } : o));
      if (stats) setStats(await api.adminStats());
    } catch (e) { alert('Failed to update status: ' + e.message); }
    finally { setUpdatingId(null); }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.adminDeleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (e) { alert('Delete failed: ' + e.message); }
    finally { setDeletingId(null); }
  };

  const handleProductSaved = (savedProduct, isEdit) => {
    if (isEdit) {
      setProducts(prev => prev.map(p => p._id === savedProduct._id ? savedProduct : p));
    } else {
      setProducts(prev => [...prev, savedProduct]);
    }
    setModal(null);
  };

  const handleLogout = async () => {
    try { await api.adminLogout(); } catch {}
    sessionStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  const switchToProducts = (col) => {
    setActiveTab('products');
    setProductCollection(col);
    setSearch('');
    setProductsOpen(true);
  };

  const fmt = (n) => `PKR ${(n || 0).toLocaleString()}`;

  /* filtered lists */
  const filteredOrders = orders.filter(o =>
    !search ||
    (o.orderNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.email       || '').toLowerCase().includes(search.toLowerCase())
  );
  const filteredCustomers = customers.filter(c =>
    !search ||
    (c.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email     || '').toLowerCase().includes(search.toLowerCase())
  );
  const filteredProducts = products.filter(p =>
    !search ||
    (p.title    || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  /* page title */
  const pageTitle = () => {
    if (activeTab === 'orders')    return 'All Orders';
    if (activeTab === 'customers') return 'Customers';
    if (activeTab === 'products') {
      const col = PRODUCT_COLLECTIONS.find(c => c.value === productCollection);
      return `Products — ${col?.label || 'All'}`;
    }
    return 'Dashboard';
  };

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
          {/* Dashboard */}
          <button
            className={`adm-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSearch(''); setProductsOpen(false); }}
          >
            <LayoutDashboard size={16} strokeWidth={activeTab === 'dashboard' ? 2.2 : 1.8} className="adm-nav-icon" />
            <span>Dashboard</span>
          </button>

          {/* Orders */}
          <button
            className={`adm-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setSearch(''); setProductsOpen(false); }}
          >
            <ShoppingBag size={16} strokeWidth={activeTab === 'orders' ? 2.2 : 1.8} className="adm-nav-icon" />
            <span>Orders</span>
          </button>

          {/* Customers */}
          <button
            className={`adm-nav-btn ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('customers'); setSearch(''); setProductsOpen(false); }}
          >
            <Users size={16} strokeWidth={activeTab === 'customers' ? 2.2 : 1.8} className="adm-nav-icon" />
            <span>Customers</span>
          </button>

          {/* Products (expandable) */}
          <button
            className={`adm-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => {
              setProductsOpen(prev => !prev);
              if (activeTab !== 'products') switchToProducts('all');
            }}
          >
            <Package2 size={16} strokeWidth={activeTab === 'products' ? 2.2 : 1.8} className="adm-nav-icon" />
            <span style={{ flex: 1 }}>Products</span>
            {productsOpen
              ? <ChevronDown size={13} style={{ marginLeft: 'auto' }} />
              : <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
          </button>

          {productsOpen && (
            <div className="adm-nav-sub">
              {PRODUCT_COLLECTIONS.map(col => (
                <button
                  key={col.value}
                  className={`adm-nav-sub-btn ${activeTab === 'products' && productCollection === col.value ? 'active' : ''}`}
                  onClick={() => switchToProducts(col.value)}
                >
                  {col.label}
                </button>
              ))}
            </div>
          )}
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
            <h1 className="adm-page-title">{pageTitle()}</h1>
            <p className="adm-page-date">{today}</p>
          </div>
          <div className="adm-topbar-right">
            {(activeTab === 'orders' || activeTab === 'customers' || activeTab === 'products') && (
              <div className="adm-search-wrap">
                <Search size={14} className="adm-search-icon" />
                <input
                  className="adm-search"
                  placeholder={
                    activeTab === 'orders'    ? 'Search by order # or email…' :
                    activeTab === 'customers' ? 'Search by name or email…' :
                    'Search products…'
                  }
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}
            {activeTab === 'dashboard' && (
              <button className="adm-refresh-btn" onClick={loadDashboard} title="Refresh">
                <RefreshCw size={15} />
              </button>
            )}
            {activeTab === 'products' && (
              <button className="adm-add-product-btn" onClick={() => setModal({ mode: 'add' })}>
                <Plus size={15} /> Add Product
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
              <StatCard label="Total Orders"    value={stats.totalOrders}       sub="All time"                             icon={Package}    accent="#1565c0" />
              <StatCard label="Total Revenue"   value={fmt(stats.totalRevenue)} sub="All time"                             icon={DollarSign} accent="#2e7d32" />
              <StatCard label="Total Customers" value={stats.totalCustomers}    sub="Registered accounts"                  icon={Users}      accent="#6a1b9a" />
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
                      <td>{(c.cart     || []).length}</td>
                      <td>{(c.wishlist || []).length}</td>
                      <td className="adm-sub-text">{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {!loading && activeTab === 'products' && (
          <div>
            {/* Collection sub-tabs */}
            <div className="adm-collection-tabs">
              {PRODUCT_COLLECTIONS.map(col => (
                <button
                  key={col.value}
                  className={`adm-col-tab ${productCollection === col.value ? 'active' : ''}`}
                  onClick={() => switchToProducts(col.value)}
                >
                  {col.label}
                  {productCollection === col.value && (
                    <span className="adm-col-tab-count">{filteredProducts.length}</span>
                  )}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="adm-products-empty">
                <Package2 size={48} color="#ccc" />
                <p>No products found{search ? ` for "${search}"` : ''}.</p>
                <button className="adm-add-product-btn" onClick={() => setModal({ mode: 'add' })}>
                  <Plus size={14} /> Add First Product
                </button>
              </div>
            ) : (
              <div className="adm-product-grid">
                {filteredProducts.map(p => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onEdit={product => setModal({ mode: 'edit', product })}
                    onDelete={handleDeleteProduct}
                    deleting={deletingId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Product Modal ── */}
      {modal && (
        <ProductModal
          modal={modal}
          onClose={() => setModal(null)}
          onSaved={handleProductSaved}
        />
      )}
    </div>
  );
}
