/**
 * LOCAL DATA STORE
 * ================
 * These are the hardcoded products used as a fallback when the backend
 * API server is not running. This way the website always shows data.
 */

export const LOCAL_SALE_PRODUCTS = [
  { id: 201, category: 'Embroidered | Cotton Dobby', title: 'Cotton Dobby Kurta', subtitle: 'Sale', originalPrice: 'PKR 6,000', salePrice: 'PKR 3,000', price: 'PKR 3,000', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd9909f37/images/hi-res/t-a22-26-210fe2_multi_2.jpg?sw=400&sh=600' },
  { id: 202, category: 'Embroidered | Raw Silk', title: 'Short Black Kurta', subtitle: 'Sale', originalPrice: 'PKR 7,000', salePrice: 'PKR 3,500', price: 'PKR 3,500', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwcd0e615c/images/hi-res/t-a33-26-112ff1_multi_2.jpg?sw=400&sh=600' },
  { id: 203, category: 'Embroidered | Arabic Lawn', title: 'Lawn Sleeveless Kurta', subtitle: 'Sale', originalPrice: 'PKR 4,000', salePrice: 'PKR 2,800', price: 'PKR 2,800', discountTag: '30% OFF', discountPercent: 30, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw96957cb5/images/hi-res/1-26-106-a-c_multi_2.jpg?sw=400&sh=600' },
  { id: 204, category: 'Printed | Lawn', title: 'Floral Tailored 3-Piece', subtitle: 'Sale', originalPrice: 'PKR 10,000', salePrice: 'PKR 7,000', price: 'PKR 7,000', discountTag: '30% OFF', discountPercent: 30, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdb22ff58/images/hi-res/t-a33-26-102ff_multi_2.jpg?sw=400&sh=600' },
  { id: 205, category: 'Embroidered | Cambric', title: 'Tailored 3-Piece Set', subtitle: 'Sale', originalPrice: 'PKR 12,000', salePrice: 'PKR 6,000', price: 'PKR 6,000', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwea10a196/images/hi-res/1-26-327-a-a1_multi_2.jpg?sw=400&sh=600' },
  { id: 206, category: 'Embroidered | Textured Weave', title: 'Embroidered V-Neck Kurta', subtitle: 'Sale', originalPrice: 'PKR 6,000', salePrice: 'PKR 3,600', price: 'PKR 3,600', discountTag: '40% OFF', discountPercent: 40, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6aa25d0b/images/hi-res/2-26-208-a-i1_multi_2.jpg?sw=400&sh=600' },
  { id: 207, category: 'Embroidered | Raw Silk', title: 'Silk 2-Piece Tailored', subtitle: 'Sale', originalPrice: 'PKR 10,000', salePrice: 'PKR 3,000', price: 'PKR 3,000', discountTag: '70% OFF', discountPercent: 70, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw355b79e5/images/hi-res/2-26-201-a-e_multi_2.jpg?sw=400&sh=600' },
  { id: 208, category: 'Embroidered | Cotton Dobby', title: 'Solid Stitched Kurta', subtitle: 'Sale', originalPrice: 'PKR 5,000', salePrice: 'PKR 2,500', price: 'PKR 2,500', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwee179446/images/hi-res/1-26-205-a-i1_multi_2.jpg?sw=400&sh=600' },
  { id: 209, category: 'Printed | Lawn', title: 'Casual Printed Kurta', subtitle: 'Sale', originalPrice: 'PKR 4,500', salePrice: 'PKR 1,350', price: 'PKR 1,350', discountTag: '70% OFF', discountPercent: 70, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3cc83aa8/images/hi-res/25-09-10e4-10ta_multi_2.jpg?sw=400&sh=600' },
  { id: 210, category: 'Embroidered | Jacquard', title: 'Festive Jacquard Suite', subtitle: 'Sale', originalPrice: 'PKR 14,000', salePrice: 'PKR 7,000', price: 'PKR 7,000', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf8142c55/images/hi-res/t-a22-26-207ef2_multi_2.jpg?sw=400&sh=600' },
  { id: 211, category: 'Embroidered | Cambric', title: 'Classic Cambric Shirt', subtitle: 'Sale', originalPrice: 'PKR 5,500', salePrice: 'PKR 3,850', price: 'PKR 3,850', discountTag: '30% OFF', discountPercent: 30, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw89c4a939/images/hi-res/1-26-236-a-a1_multi_2.jpg?sw=400&sh=600' },
  { id: 212, category: 'Embroidered | Arabic Lawn', title: 'Printed Summer Kurta', subtitle: 'Sale', originalPrice: 'PKR 4,800', salePrice: 'PKR 2,880', price: 'PKR 2,880', discountTag: '40% OFF', discountPercent: 40, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd1f2f6d7/images/hi-res/8-26-203-a-c1_multi_2.jpg?sw=400&sh=600' },
  { id: 213, category: 'Printed | Lawn', title: 'Pastel Tailored 3-Piece', subtitle: 'Sale', originalPrice: 'PKR 9,000', salePrice: 'PKR 4,500', price: 'PKR 4,500', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw692a3a0d/images/hi-res/2-26-203-a-g1_multi_2.jpg?sw=400&sh=600' },
  { id: 214, category: 'Embroidered | Raw Silk', title: 'Formal Silk Tunic', subtitle: 'Sale', originalPrice: 'PKR 11,000', salePrice: 'PKR 3,300', price: 'PKR 3,300', discountTag: '70% OFF', discountPercent: 70, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwb3b6e546/images/hi-res/8-26-203-a-a1_multi_2.jpg?sw=400&sh=600' },
  { id: 215, category: 'Embroidered | Cotton Dobby', title: 'Textured Dobby Shirt', subtitle: 'Sale', originalPrice: 'PKR 6,500', salePrice: 'PKR 3,250', price: 'PKR 3,250', discountTag: '50% OFF', discountPercent: 50, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwab86e137/images/hi-res/2-26-208-a-b1_multi_2.jpg?sw=400&sh=600' },
  { id: 216, category: 'Embroidered | Chiffon', title: 'Chiffon Dupatta Suite', subtitle: 'Sale', originalPrice: 'PKR 13,000', salePrice: 'PKR 3,900', price: 'PKR 3,900', discountTag: '70% OFF', discountPercent: 70, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw04e5b5a2/images/hi-res/8-26-210-a-b1_multi_2.jpg?sw=400&sh=600' },
  { id: 217, category: 'Printed | Lawn', title: 'Daily Wear Lawn Kurta', subtitle: 'Sale', originalPrice: 'PKR 3,800', salePrice: 'PKR 2,280', price: 'PKR 2,280', discountTag: '40% OFF', discountPercent: 40, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdb335061/images/hi-res/2-26-208-a-g1_multi_2.jpg?sw=400&sh=600' },
  { id: 218, category: 'Embroidered | Cambric', title: 'Embroidered Kurta Set', subtitle: 'Sale', originalPrice: 'PKR 8,000', salePrice: 'PKR 5,600', price: 'PKR 5,600', discountTag: '30% OFF', discountPercent: 30, image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwca2ad635/images/hi-res/1-26-131-a-h_multi_2.jpg?sw=400&sh=600' },
];

export const LOCAL_NEWIN_PRODUCTS = [
  { id: 1,   category: 'Embroidered | Lawn',     title: 'Lawn Tailored 3-Piece',  subtitle: 'New In', price: 'PKR 12,500', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6239dc00/images/hi-res/1-26-249-a-j2_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 6,   category: 'Printed | Lawn',         title: 'Printed Lawn Suit',       subtitle: 'New In', price: 'PKR 4,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwbba1c3bb/images/hi-res/5-26-201-e-d_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 7,   category: 'Embroidered | Silk',     title: 'Silk Embroidered Shirt',  subtitle: 'New In', price: 'PKR 8,200',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw841246f9/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 8,   category: 'Jacquard | Cotton',      title: 'Jacquard Kurta Set',      subtitle: 'New In', price: 'PKR 5,100',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw742443b5/images/hi-res/1-26-305-a-b2_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 9,   category: 'Embroidered | Chiffon',  title: 'Chiffon Dupatta Suit',    subtitle: 'New In', price: 'PKR 9,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw82224b41/images/hi-res/1-26-305-a-j2_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 10,  category: 'Basic | Cotton',         title: 'Casual Solid Kurta',      subtitle: 'New In', price: 'PKR 2,900',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0b29bd70/images/hi-res/5-26-201-f-a_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 102, category: 'Printed | Cambric',      title: 'Short Floral Kurta',      subtitle: 'New In', price: 'PKR 4,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf4b25f62/images/hi-res/1-26-315-a-b1_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 103, category: 'Printed | Cambric',      title: 'Yellow Cambric Kurta',    subtitle: 'New In', price: 'PKR 4,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2df44dbd/images/hi-res/1-26-315-c-b1_multi_3.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 104, category: 'Printed | Cambric',      title: 'Printed Cambric Kurta',   subtitle: 'New In', price: 'PKR 4,000',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdaecbc19/images/hi-res/1-26-313-a-a1_multi_1.jpg?sw=400&sh=600',  tag: 'New' },
  { id: 105, category: 'Printed | Raw Silk',     title: 'Kurta',                   subtitle: 'New In', price: 'PKR 7,000',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw44945494/images/hi-res/5-26-201-e-b_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 107, category: 'Printed | Cambric',      title: 'Short Floral Kurta',      subtitle: 'New In', price: 'PKR 4,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdc694748/images/hi-res/1-26-319-b-a2_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
  { id: 108, category: 'Printed | Cambric',      title: 'Yellow Cambric Kurta',    subtitle: 'New In', price: 'PKR 4,500',  image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw309ebb82/images/hi-res/1-26-315-b-e1_multi_1.jpg?sw=800&sh=1200', tag: 'New' },
];

export const LOCAL_RTW_PRODUCTS = [
  { id: 1,   category: 'Embroidered | Lawn',    title: 'Lawn Tailored 3-Piece',  subtitle: 'Ready To Wear', price: 'PKR 12,500', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6239dc00/images/hi-res/1-26-249-a-j2_multi_1.jpg?sw=800&sh=1200' },
  { id: 2,   category: 'Embroidered | Cambric', title: 'Tailored 2 Piece',        subtitle: 'Ready To Wear', originalPrice: 'PKR 6,500', price: 'PKR 3,250', discountPercent: 50, discountTag: '50% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3484b1d4/images/hi-res/t-a11-26-215fd1_multi_1.jpg?sw=400&sh=600' },
  { id: 3,   category: 'Embroidered | Jacquard',title: 'Black Tailored 3-Piece', subtitle: 'Ready To Wear', originalPrice: 'PKR 12,500', price: 'PKR 6,250', discountPercent: 50, discountTag: '50% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2491a3f7/images/hi-res/1-26-322-a-b1_multi_1.jpg?sw=800&sh=1200' },
  { id: 4,   category: 'Embroidered | Messuri', title: 'Messuri Tailored 3-Piece',subtitle: 'Ready To Wear', originalPrice: 'PKR 11,000', price: 'PKR 7,700', discountPercent: 30, discountTag: '30% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwa90b2316/images/hi-res/8-26-301-a-d1_multi_2.jpg?sw=800&sh=1200' },
  { id: 5,   category: 'Embroidered | Cotton Dobby', title: 'Cotton Dobby Kurta', subtitle: 'Ready To Wear', originalPrice: 'PKR 5,500', price: 'PKR 1,650', discountPercent: 70, discountTag: '70% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bd71ebc/images/hi-res/t-a11-26-112fe1_multi_1.jpg?sw=800&sh=1200' },
  { id: 6,   category: 'Printed | Lawn',        title: 'Printed Lawn Suit',       subtitle: 'Ready To Wear', price: 'PKR 4,500', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwbba1c3bb/images/hi-res/5-26-201-e-d_multi_1.jpg?sw=800&sh=1200' },
  { id: 7,   category: 'Embroidered | Silk',    title: 'Silk Embroidered Shirt',  subtitle: 'Ready To Wear', price: 'PKR 8,200', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw841246f9/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800&sh=1200' },
  { id: 8,   category: 'Jacquard | Cotton',     title: 'Jacquard Kurta Set',      subtitle: 'Ready To Wear', price: 'PKR 5,100', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw742443b5/images/hi-res/1-26-305-a-b2_multi_1.jpg?sw=800&sh=1200' },
  { id: 9,   category: 'Embroidered | Chiffon', title: 'Chiffon Dupatta Suit',    subtitle: 'Ready To Wear', price: 'PKR 9,500', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw82224b41/images/hi-res/1-26-305-a-j2_multi_1.jpg?sw=800&sh=1200' },
  { id: 10,  category: 'Basic | Cotton',        title: 'Casual Solid Kurta',      subtitle: 'Ready To Wear', price: 'PKR 2,900', tag: 'New', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0b29bd70/images/hi-res/5-26-201-f-a_multi_1.jpg?sw=800&sh=1200' },
  { id: 101, category: 'Embroidered | Raw Silk',title: 'Black Co-ord Set',        subtitle: 'Ready To Wear', originalPrice: 'PKR 25,000', price: 'PKR 12,500', discountPercent: 50, discountTag: '50% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd6fab7d3/images/hi-res/5-26-201-f-c_multi_7.jpg?sw=800&sh=1200' },
  { id: 104, category: 'Printed | Cambric',     title: 'Printed Cambric Kurta',   subtitle: 'Ready To Wear', originalPrice: 'PKR 4,000', price: 'PKR 2,400', discountPercent: 40, discountTag: '40% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdaecbc19/images/hi-res/1-26-313-a-a1_multi_1.jpg?sw=400&sh=600' },
  { id: 106, category: 'Embroidered | Raw Silk',title: 'Black Co-ord Set',        subtitle: 'Ready To Wear', originalPrice: 'PKR 25,000', price: 'PKR 7,500', discountPercent: 70, discountTag: '70% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw89b4d593/images/hi-res/25-09-11e7-09bby_multi_1.jpg?sw=800&sh=1200' },
  { id: 109, category: 'Printed | Cambric',     title: 'Printed Cambric Kurta',   subtitle: 'Ready To Wear', originalPrice: 'PKR 4,000', price: 'PKR 2,000', discountPercent: 50, discountTag: '50% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwed51adb7/images/hi-res/25-09-11e7-09bbx_multi_1.jpg?sw=800&sh=1200' },
  { id: 110, category: 'Printed | Raw Silk',    title: 'Kurta',                   subtitle: 'Ready To Wear', originalPrice: 'PKR 7,000', price: 'PKR 2,100', discountPercent: 70, discountTag: '70% OFF', image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw68b035e6/images/hi-res/1-26-319-b-b1_multi_2.jpg?sw=800&sh=1200' },
];

// ---- LOCAL AUTH (stored in localStorage) ----
const USERS_KEY = 'local_users';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function localRegister(payload) {
  const users = getUsers();
  if (users.find(u => u.email === payload.email)) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = {
    id: Date.now(),
    firstName: payload.firstName || payload.email.split('@')[0],
    lastName: payload.lastName || '',
    email: payload.email,
    password: payload.password,
    isSubscribed: payload.isSubscribed || false,
    cart: [],
    wishlist: [],
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, newUser]);
  // Don't expose password in returned object
  const { password, ...safeUser } = newUser;
  return safeUser;
}

export function localLogin({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('No account found with this email.');
  if (user.password !== password) throw new Error('Incorrect password.');
  const { password: _pwd, ...safeUser } = user;
  return safeUser;
}

// Local order storage
const ORDERS_KEY = 'local_orders';
export function localCreateOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const newOrder = { ...order, _id: Date.now(), orderNumber: `ORD-${Date.now()}`, status: 'placed', createdAt: new Date().toISOString() };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...orders]));
  return newOrder;
}
export function localGetOrders({ email, userId } = {}) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  if (userId) return orders.filter(o => o.userId === userId);
  if (email) return orders.filter(o => o.email === email);
  return orders;
}
