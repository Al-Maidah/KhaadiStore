import {
  LOCAL_SALE_PRODUCTS,
  LOCAL_NEWIN_PRODUCTS,
  LOCAL_RTW_PRODUCTS,
  localRegister,
  localLogin,
  localCreateOrder,
  localGetOrders,
} from '../utils/localData';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:9000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Returns local fallback data keyed by collection name
function getLocalProducts(collection) {
  switch (collection) {
    case 'sale': return LOCAL_SALE_PRODUCTS;
    case 'newin': return LOCAL_NEWIN_PRODUCTS;
    case 'rtw': return LOCAL_RTW_PRODUCTS;
    default: return [...LOCAL_SALE_PRODUCTS, ...LOCAL_NEWIN_PRODUCTS];
  }
}

export const api = {
  // ── Products ─────────────────────────────────────────────
  getProducts: async (collection) => {
    try {
      return await request(`/products${collection ? `?collection=${encodeURIComponent(collection)}` : ''}`);
    } catch {
      return getLocalProducts(collection);
    }
  },

  getProduct: async (id) => {
    try { return await request(`/products/${id}`); }
    catch { return null; }
  },

  // ── Auth ─────────────────────────────────────────────────
  register: async (body) => {
    try { return await request('/users/register', { method: 'POST', body }); }
    catch { return localRegister(body); }
  },

  login: async (body) => {
    try { return await request('/users/login', { method: 'POST', body }); }
    catch { return localLogin(body); }
  },

  // ── User ─────────────────────────────────────────────────
  saveCart: async (userId, cart) => {
    try { return await request(`/users/${userId}/cart`, { method: 'PUT', body: { cart } }); }
    catch { return { cart }; }
  },

  saveWishlist: async (userId, wishlist) => {
    try { return await request(`/users/${userId}/wishlist`, { method: 'PUT', body: { wishlist } }); }
    catch { return { wishlist }; }
  },

  getUser: async (userId) => {
    try { return await request(`/users/${userId}`); }
    catch { return null; }
  },

  updateUser: async (userId, body) => {
    try { return await request(`/users/${userId}`, { method: 'PUT', body }); }
    catch { return body; }
  },

  // ── Orders ───────────────────────────────────────────────
  createOrder: async (body) => {
    try { return await request('/orders', { method: 'POST', body }); }
    catch { return localCreateOrder(body); }
  },

  getOrders: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await request(`/orders${query ? `?${query}` : ''}`);
    } catch {
      return localGetOrders(params);
    }
  },

  trackOrder: async (orderNumber) => {
    try { return await request(`/orders/track/${encodeURIComponent(orderNumber)}`); }
    catch {
      const orders = localGetOrders();
      const found = orders.find(o => o.orderNumber === orderNumber);
      if (!found) throw new Error('Order not found.');
      return found;
    }
  },

  // ── Admin ─────────────────────────────────────────────────
  adminLogin: async (body) => {
    return await request('/admin/login', { method: 'POST', body });
  },
  adminCheck: async () => {
    return await request('/admin/check');
  },
  adminStats: async () => {
    return await request('/admin/stats');
  },
  adminOrders: async () => {
    return await request('/admin/orders');
  },
  adminCustomers: async () => {
    return await request('/admin/customers');
  },
  adminUpdateStatus: async (id, status) => {
    return await request(`/admin/orders/${id}/status`, { method: 'PUT', body: { status } });
  },
  adminLogout: async () => {
    return await request('/admin/logout', { method: 'POST' });
  },
};

export default api;
