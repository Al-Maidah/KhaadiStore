import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Common/AuthContext';
import { useWishlist } from '../Common/WishlistContext';
import { api } from '../../api/client';
import { formatPrice, parsePrice } from '../../utils/productUtils';

export default function MyAccount({ user: userProp }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState('');
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { wishlist } = useWishlist();
  const user = userProp || authUser;

  const displayName = user?.firstName || user?.email || 'Guest';
  const fullName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || '—';
  const email = user?.email || '—';
  const isSubscribedText = user?.isSubscribed ? 'Yes' : 'No';

  useEffect(() => {
    if (!user?.id && !user?.email) return;
    const params = user.id ? { userId: user.id } : { email: user.email };
    api
      .getOrders(params)
      .then(setOrders)
      .catch((err) => setOrderError(err.message || 'Could not load orders.'));
  }, [user?.id, user?.email]);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const renderMain = () => {
    if (activeTab === 'order-history' || activeTab === 'order-tracking') {
      return (
        <div>
          <h2 style={{ fontSize: '1.1rem', letterSpacing: '2px', marginBottom: 16 }}>
            {activeTab === 'order-tracking' ? 'ORDER TRACKING' : 'ORDER HISTORY'}
          </h2>
          {orderError && <p style={{ color: '#b42318' }}>{orderError}</p>}
          {orders.length === 0 && !orderError && <p>You have no orders yet.</p>}
          {orders.map((order) => (
            <div key={order._id || order.orderNumber} style={{ border: '1px solid #eee', padding: 16, marginBottom: 12, borderRadius: 8 }}>
              <p><strong>{order.orderNumber}</strong> — {(order.status || 'placed').toUpperCase()}</p>
              <p style={{ color: '#666', fontSize: 13 }}>
                {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''} · {formatPrice(parsePrice(order.total))}
              </p>
              {(order.items || []).map((item, idx) => (
                <p key={idx} style={{ fontSize: 13 }}>{item.title} × {item.qty || 1}</p>
              ))}
            </div>
          ))}
          {activeTab === 'order-tracking' && (
            <button className="manage-address-btn" onClick={() => navigate('/track-order')}>
              Track by order number
            </button>
          )}
        </div>
      );
    }

    if (activeTab === 'all-items') {
      return (
        <div>
          <h2 style={{ fontSize: '1.1rem', letterSpacing: '2px', marginBottom: 16 }}>WISHLIST</h2>
          {wishlist.length === 0 && <p>No saved items yet.</p>}
          {wishlist.map((item) => (
            <p key={item.id}>{item.title} — {item.price || item.salePrice}</p>
          ))}
        </div>
      );
    }

    return (
      <>
        <div className="account-promo-banner">
          <img
            src="https://pk.khaadi.com/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwba678f29/images/acc-dashboard-img.png"
            alt="Promo Banner"
            className="account-banner-img"
          />
        </div>

        <div className="account-cards-grid">
          <div className="account-info-card address-card">
            <h3 className="card-title">ADDRESS BOOK</h3>
            <div className="card-content-center">
              <p style={{ color: '#666', fontSize: 13 }}>
                {user?.address?.street
                  ? `${user.address.street}, ${user.address.city || ''}`
                  : 'No saved address yet. Addresses are stored with your orders at checkout.'}
              </p>
            </div>
          </div>

          <div className="account-info-card details-card">
            <div className="card-header">
              <h3 className="card-title">ACCOUNT DETAILS</h3>
            </div>
            <div className="details-card-body">
              <div className="detail-field">
                <span className="field-label">NAME</span>
                <span className="field-value">{fullName}</span>
              </div>
              <div className="detail-field">
                <span className="field-label">EMAIL ADDRESS</span>
                <span className="field-value">{email}</span>
              </div>
              <div className="detail-field full-width">
                <span className="field-label">SUBSCRIBED TO NEWSLETTER</span>
                <span className="field-value">{isSubscribedText}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="account-page-container">
      <nav className="account-breadcrumb">
        <span>Home</span> &gt; <span className="active-page">My Account</span>
      </nav>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="sidebar-section">
            <button
              className={`sidebar-nav-btn heading ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              DASHBOARD
            </button>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-heading">MY ORDERS</h4>
            <ul>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeTab === 'order-history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('order-history')}
                >
                  Order History
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeTab === 'order-tracking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('order-tracking')}
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-heading">WISHLIST</h4>
            <ul>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeTab === 'all-items' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all-items')}
                >
                  All Items
                </button>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-heading">MY ACCOUNT</h4>
            <ul>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeTab === 'account-details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('account-details')}
                >
                  Account Details
                </button>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h4 className="sidebar-heading">SETTINGS</h4>
            <ul>
              <li>
                <button className="sidebar-nav-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="account-content-area">
          <h1 className="welcome-banner-title">WELCOME {String(displayName).toUpperCase()}</h1>
          {renderMain()}
        </main>
      </div>
    </div>
  );
}
