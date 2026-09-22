import {
  LOCAL_SALE_PRODUCTS,
  LOCAL_NEWIN_PRODUCTS,
  LOCAL_RTW_PRODUCTS,
} from '../utils/localData';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:9000';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Start the backend on port 9000 and make sure MongoDB is running.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function getLocalProducts(collection) {
  switch (collection) {
    case 'sale': return LOCAL_SALE_PRODUCTS;
    case 'newin': return LOCAL_NEWIN_PRODUCTS;
    case 'rtw': return LOCAL_RTW_PRODUCTS;
    default: return [...LOCAL_SALE_PRODUCTS, ...LOCAL_NEWIN_PRODUCTS];
  }
}

function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem('local_users') || '[]');
  } catch {
    return [];
  }
}

export const api = {
  getProducts: async (collection) => {
    try {
      return await request(`/products${collection ? `?collection=${encodeURIComponent(collection)}` : ''}`);
    } catch {
      return getLocalProducts(collection);
    }
  },

  getProduct: async (id) => request(`/products/${id}`),

  register: (body) =>
    request('/users/register', {
      method: 'POST',
      body: {
        ...body,
        email: (body.email || '').trim(),
      },
    }),

  login: async (body) => {
    const email = (body.email || '').trim();
    const password = body.password;
    try {
      return await request('/users/login', { method: 'POST', body: { email, password } });
    } catch (err) {
      const local = getLocalUsers().find(
        (u) => (u.email || '').toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (local) {
        return await request('/users/register', {
          method: 'POST',
          body: {
            firstName: local.firstName || email.split('@')[0],
            lastName: local.lastName || '',
            email,
            password,
            isSubscribed: !!local.isSubscribed,
          },
        });
      }
      throw err;
    }
  },

  saveCart: (userId, cart) => request(`/users/${userId}/cart`, { method: 'PUT', body: { cart } }),
  saveWishlist: (userId, wishlist) => request(`/users/${userId}/wishlist`, { method: 'PUT', body: { wishlist } }),
  getUser: (userId) => request(`/users/${userId}`),
  updateUser: (userId, body) => request(`/users/${userId}`, { method: 'PUT', body }),

  createOrder: (body) => request('/orders', { method: 'POST', body }),
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/orders${query ? `?${query}` : ''}`);
  },
  trackOrder: (orderNumber) => request(`/orders/track/${encodeURIComponent(orderNumber)}`),

  adminLogin: (body) => request('/admin/login', { method: 'POST', body }),
  adminCheck: () => request('/admin/check'),
  adminStats: () => request('/admin/stats'),
  adminOrders: () => request('/admin/orders'),
  adminCustomers: () => request('/admin/customers'),
  adminUpdateStatus: (id, status) => request(`/admin/orders/${id}/status`, { method: 'PUT', body: { status } }),
  adminLogout: () => request('/admin/logout', { method: 'POST' }),

  // Product CRUD (admin)
  adminGetProducts: (collection) =>
    request(`/admin/products${collection && collection !== 'all' ? `?collection=${encodeURIComponent(collection)}` : ''}`),
  adminCreateProduct: (body) => request('/admin/products', { method: 'POST', body }),
  adminUpdateProduct: (id, body) => request(`/admin/products/${id}`, { method: 'PUT', body }),
  adminDeleteProduct: (id) => request(`/admin/products/${id}`, { method: 'DELETE' }),
};

export default api;
