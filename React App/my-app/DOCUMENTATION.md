# 📚 Khaadi Store — Complete Full-Stack Documentation

> Written in **simple, plain English** — no assumed knowledge required.
> Last updated: September 2026

---

## 🗂️ Table of Contents

1. [What This App Is](#1-what-this-app-is)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Backend Architecture](#4-backend-architecture)
5. [Database Schemas](#5-database-schemas)
6. [API Reference](#6-api-reference)
7. [Admin Dashboard](#7-admin-dashboard)
8. [Email Notification System](#8-email-notification-system)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Context (Shared State) System](#10-context-shared-state-system)
11. [Page by Page Explanation](#11-page-by-page-explanation)
12. [Component Explanations](#12-component-explanations)
13. [Shopping & Checkout Flow](#13-shopping--checkout-flow)
14. [User Account System](#14-user-account-system)
15. [Data Fallback System](#15-data-fallback-system)
16. [CSS & Styling](#16-css--styling)
17. [Local Development Setup](#17-local-development-setup)
18. [Deployment Guide (Vercel + MongoDB Atlas)](#18-deployment-guide-vercel--mongodb-atlas)
19. [Environment Variables Reference](#19-environment-variables-reference)
20. [Key Things to Remember](#20-key-things-to-remember)

---

## 1. What This App Is

A **full-stack e-commerce web application** inspired by the Khaadi clothing brand. Users can:

- Browse products across Home, Sale, New In, Ready To Wear, Fabrics, and Fragrances pages
- Add products to a **Wishlist** and **Shopping Bag (Cart)**
- Complete a full **Checkout** (requires login) and receive an **email confirmation with tracking ID**
- **Register / Sign In** to their account with secure password hashing
- View their **Order History**, saved wishlist, and profile on the Account page
- **Track orders** by order number

Admins can:
- Log into a **separate, protected Admin Dashboard**
- View live stats: total orders, revenue, customers, daily charts
- Manage all orders and update their status
- View all registered customers

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v7, Context API |
| **Styling** | Custom CSS + Bootstrap 5 + Swiper.js |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB with Mongoose 9 |
| **Authentication** | bcryptjs (password hashing) + express-session (sessions) |
| **Session Store** | connect-mongo (sessions stored in MongoDB) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Deployment** | Vercel (frontend + backend) + MongoDB Atlas |

---

## 3. Project Structure

```
React Project/
│
├── Backend React/               ← Express API server
│   ├── server.js                ← Entry point — registers all middleware + routes
│   ├── vercel.json              ← Vercel deployment config for backend
│   ├── .env.example             ← Template for environment variables
│   │
│   ├── Database/
│   │   ├── connection.js        ← Connects to MongoDB, calls seedProducts
│   │   ├── productCatalog.js    ← All 48 products hardcoded (seed data)
│   │   └── seedProducts.js      ← Upserts catalog into DB on startup
│   │
│   ├── Apis/
│   │   ├── Models/
│   │   │   ├── userModel.js     ← User schema (bcrypt, toJSON strips password)
│   │   │   ├── productModel.js  ← Product schema
│   │   │   ├── orderModel.js    ← Order schema with embedded shipping + items
│   │   │   └── studModel.js     ← Student schema (demo)
│   │   │
│   │   └── Controllers/
│   │       ├── userController.js    ← register, login, getById, update, cart, wishlist
│   │       ├── productController.js ← getAll (with collection filter), getById
│   │       ├── orderController.js   ← create (+ sends email), getByUser, track
│   │       ├── adminController.js   ← admin login/logout/check/stats/orders/customers
│   │       └── studController.js    ← create student
│   │
│   ├── Routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── adminRoutes.js
│   │   └── studRoutes.js
│   │
│   └── utils/
│       └── emailService.js      ← Nodemailer order confirmation emails
│
└── React App/my-app/            ← React frontend
    ├── public/
    └── src/
        ├── App.js               ← Routes — admin routes separate from store routes
        ├── index.js             ← React entry point
        ├── index.css            ← All styles (~3800+ lines)
        │
        ├── api/
        │   └── client.js        ← All API calls + local fallbacks
        │
        ├── utils/
        │   ├── productUtils.js  ← parsePrice, formatPrice
        │   └── localData.js     ← Local product data + localStorage auth fallback
        │
        ├── Components/
│   ├── Common/
        │   │   ├── Header.js         ← Navbar
        │   │   ├── Footer.js
        │   │   ├── AuthContext.js    ← Login/register state + API calls
        │   │   ├── AuthModal.js      ← Sign In / Sign Up popup
        │   │   ├── CartContext.js    ← Cart state, auto-syncs to DB
        │   │   ├── CartDrawer.js     ← Slide-out cart panel
        │   │   ├── WishlistContext.js ← Wishlist state, auto-syncs to DB
        │   │   ├── EditCartModal.js
        │   │   └── MoveToWishlistModal.js
│   ├── Cart/
        │   │   ├── ProductBagButton.js
        │   │   ├── AddToBagModal.js
        │   │   └── CardSizeSelector.js
│   ├── Home/
        │   │   ├── HeroSlider.js
        │   │   ├── ProductSlider.js
        │   │   ├── TopPicksBanner.js
        │   │   └── BestsellersSection.js
│   ├── Product/
        │   │   ├── ProductBundleDetail.js
        │   │   ├── CollectionListing.js
        │   │   └── SizeGuide.js
│   ├── Sales/
        │   │   ├── SaleBanner.js
        │   │   ├── FilterBar.js
        │   │   └── DiscountGrid.js
        │   ├── Fabrics/
        │   │   └── FabricsBanner.js
│   └── Account/
        │       └── MyAccount.js      ← Full account dashboard component
        │
        └── Pages/
            ├── Home.js
            ├── Sale.js
            ├── NewIn.js
            ├── ReadyToWear.js         ← Product detail page
            ├── ReadyToWearListing.js  ← Product grid
            ├── Fabrics.js
            ├── Fragrances.js
            ├── NowHappening.js
            ├── Wishlist.js
            ├── CartPage.js
            ├── Checkout.js            ← Requires login; sends email on order
            ├── Account.js             ← Wrapper (redirects if not logged in)
            ├── TrackOrder.js
            ├── AdminLogin.js          ← /admin/login — 3-field admin auth
            └── AdminDashboard.js      ← /admin/dashboard — full dashboard
```

---

## 4. Backend Architecture

### How the server starts

```
node server.js
  ↓
dotenv loads .env variables
  ↓
Express app created
  ↓
CORS configured (allowed origins from ALLOWED_ORIGINS env var)
  ↓
express.json() + express.urlencoded() body parsers
  ↓
express-session middleware (sessions stored in MongoDB)
  ↓
Routes mounted: /students, /products, /users, /orders, /admin
  ↓
connectToDatabase() called:
  ↓ connects to MongoDB
  ↓ seedProducts() upserts all 48 catalog products
  ↓
app.listen(PORT) — server starts
```

### Session Security
- Sessions are stored server-side in MongoDB (not in the browser)
- The browser only gets a **session cookie** (`connect.sid`) — it contains no user data
- `httpOnly: true` — JavaScript cannot read the cookie (XSS protection)
- `secure: true` in production — only sent over HTTPS
- Sessions last 7 days
- Admin sessions are completely separate from user sessions

---

## 5. Database Schemas

### User
```
{
  firstName:    String (required)
  lastName:     String
  email:        String (unique, lowercase)
  password:     String (bcrypt hashed — NEVER stored plain)
  isSubscribed: Boolean
  cart:         Array (cart items)
  wishlist:     Array (wishlist items)
  createdAt:    Date (auto)
  updatedAt:    Date (auto)
}
```
> `toJSON()` automatically removes `password` from all responses.  
> `id` (string version of `_id`) is added for frontend compatibility.

### Product
```
{
  id:              Number (unique catalog ID)
  category:        String (e.g. "Embroidered | Lawn")
  title:           String
  subtitle:        String
  price:           String (formatted, e.g. "PKR 3,000")
  originalPrice:   String
  salePrice:       String
  discountPercent: Number
  discountTag:     String (e.g. "50% OFF")
  tag:             String (e.g. "New")
  image:           String (URL)
  images:          [String] (array of URLs)
  collections:     [String] (e.g. ["sale", "rtw"])
}
```

### Order
```
{
  orderNumber:   String (auto-generated: "ORD-<timestamp>")
  userId:        String (null for guests)
  email:         String (required)
  newsletter:    Boolean
  shipping: {
    firstName, lastName, mobile, street,
    country, state, city, shippingMethod
  }
  paymentMethod: String ("cod")
  items: [{
    id, title, price, salePrice, image, size, qty
  }]
  subtotal:      Number
  shippingCost:  Number
  total:         Number
  status:        String ("placed" | "processing" | "shipped" | "delivered" | "cancelled")
  createdAt:     Date (auto)
}
```

### Student (demo)
```
{ name, email, age, grade, phone, createdAt, updatedAt }
```

---

## 6. API Reference

### Base URL
- **Development:** `http://localhost:9000`
- **Production:** Your Vercel backend URL

---

### 🧑 Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/users/register` | Create account | None |
| POST | `/users/login` | Sign in | None |
| GET | `/users/:id` | Get user profile | None |
| PUT | `/users/:id` | Update profile | None |
| PUT | `/users/:id/cart` | Save cart to DB | None |
| PUT | `/users/:id/wishlist` | Save wishlist to DB | None |

**Register / Login body:**
```json
{
  "firstName": "Maidah",
  "lastName": "Nadeem",
  "email": "maidah@email.com",
  "password": "secret123",
  "isSubscribed": true
}
```

**Response (password is NEVER returned):**
```json
{
  "id": "abc123",
  "firstName": "Maidah",
  "email": "maidah@email.com",
  "cart": [],
  "wishlist": []
}
```

---

### 📦 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | All products |
| GET | `/products?collection=sale` | Filter by collection |
| GET | `/products/:id` | Single product by catalog ID |

**Collections:** `home-top`, `home-best`, `rtw`, `newin`, `sale`, `fabrics`, `fragrances`

---

### 🛒 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Place order (sends confirmation email) |
| GET | `/orders?userId=<id>` | Get user's orders |
| GET | `/orders?email=<email>` | Get orders by email |
| GET | `/orders/track/:orderNumber` | Track specific order |

**Order body:**
```json
{
  "userId": "abc123",
  "email": "maidah@email.com",
  "newsletter": true,
  "shipping": { "firstName": "Maidah", "city": "Lahore", ... },
  "paymentMethod": "cod",
  "items": [{ "id": 1, "title": "...", "price": "PKR 3,000", "qty": 1, "size": "M" }],
  "subtotal": 3000,
  "shippingCost": 240,
  "total": 3240
}
```

---

### 🔐 Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/admin/login` | Admin sign in | None |
| POST | `/admin/logout` | Admin sign out | None |
| GET | `/admin/check` | Verify admin session | None |
| GET | `/admin/stats` | Dashboard statistics | **Admin** |
| GET | `/admin/orders` | All orders | **Admin** |
| GET | `/admin/customers` | All users | **Admin** |
| PUT | `/admin/orders/:id/status` | Update order status | **Admin** |

**Admin Login body:**
```json
{
  "adminId": "KHAADI_ADMIN_001",
  "email": "admin@khaadi.com",
  "password": "KhaadiAdmin@2024"
}
```

---

## 7. Admin Dashboard

### Access
- URL: `/admin/login`
- Requires **all three**: Admin ID + Email + Password
- These are set in environment variables — no user can guess or access them
- Admin session is completely separate from regular user sessions

### Features

| Section | What it shows |
|---------|--------------|
| **Dashboard** | Stats cards, daily revenue bar chart, revenue summary, recent orders |
| **Orders** | Full orders table with live status update dropdown |
| **Customers** | All registered users with cart/wishlist counts |

### Stats shown
- Total Orders (all time)
- Total Revenue (all time)  
- Total Customers (registered accounts)
- Today's Orders & Revenue
- Yesterday's Orders & Revenue
- This Month's Orders & Revenue
- Orders by Status breakdown
- Last 7 Days bar chart (revenue + order count per day)

### Order Status Management
Admins can update any order status via dropdown:
- **placed** (blue) → order received
- **processing** (orange) → being prepared
- **shipped** (purple) → out for delivery
- **delivered** (green) → delivered to customer
- **cancelled** (red) → cancelled

### Security
- Admin routes on the backend check `req.session.isAdmin` before responding
- Any request to `/admin/stats`, `/admin/orders`, `/admin/customers` without a valid admin session returns **401 Unauthorized**
- Admin credentials are stored only in environment variables (never in code)
- Admin dashboard has no access to the store's Header/Footer — it's a completely separate UI

---

## 8. Email Notification System

### When an email is sent
Every time a user places an order via `POST /orders`, an order confirmation email is automatically sent to the email address provided.

### What the email contains
- ✅ Large **Tracking ID** prominently displayed
- Order items table (name, size, quantity, price)
- Subtotal, shipping cost, and total
- Shipping address details
- Payment method
- Khaadi brand styling

### Setup (Gmail App Password)
1. Enable **2-Step Verification** on your Gmail account
2. Go to **Google Account → Security → App Passwords**
3. Create a new App Password for "Mail"
4. Copy the 16-character password
5. Set in `.env`:
   ```
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

### Non-blocking
If email credentials are not configured, or if the email fails to send, **the order is still created successfully**. The email is fire-and-forget — it never blocks or fails the order response.

---

## 9. Frontend Architecture

### Route Structure

```
App.js
├── /admin/login      → AdminLogin (no header/footer)
├── /admin/dashboard  → AdminDashboard (no header/footer)
└── /* (everything else) → wrapped in Header + CartDrawer + Footer
    ├── /              → Home
    ├── /sale          → Sale
    ├── /newin         → New In
    ├── /readytowear   → ReadyToWearListing
    ├── /product/:id   → ReadyToWear (detail)
    ├── /fabrics       → Fabrics
    ├── /fragrances    → Fragrances
    ├── /nowhappening  → NowHappening
    ├── /wishlist      → Wishlist
    ├── /cart          → CartPage
    ├── /checkout      → Checkout (requires login)
    ├── /account       → Account (requires login)
    └── /track-order   → TrackOrder
```

### Core Concepts

**React Components** — Each file is a self-contained UI piece.

**Props** — Data passed into components to customize them.

**State (useState)** — Data that changes. When it changes, the component re-renders.

**Context (useContext)** — Global shared state. Used for user auth, cart, and wishlist — any component can read from these anywhere.

**useEffect** — Runs code after component mounts (e.g. fetch data, set page title).

**React Router** — Navigates between pages without full page reload.

---

## 10. Context (Shared State) System

### AuthContext.js
```
Stores: current logged-in user object (or null)
Provides:
  user            → the user object
  login()         → calls API → stores user in localStorage
  register()      → calls API → stores user in localStorage
  logout()        → clears user from state + localStorage
  updateProfile() → calls API, updates stored user
  refreshUser()   → re-fetches user from server

Persistence: user stored in localStorage under "store_user" key
  → survives page refresh
  → cleared on logout
```

### CartContext.js
```
Stores: array of cart items — each item has { ...product, size, qty }
Provides:
  cart              → the array
  addToCart()       → add item (increments qty if same id+size)
  removeFromCart()  → remove by id + size
  updateCartItem()  → change size or quantity
  clearCart()       → empty bag
  cartCount         → total qty of all items

Auto-sync: whenever cart changes AND user is logged in → calls PUT /users/:id/cart
  → cart is saved to database automatically
  → loads from user.cart when user logs in
```

### WishlistContext.js
```
Stores: array of wishlisted products
Provides:
  wishlist          → the array
  toggleWishlist()  → add if not there, remove if already there
  toastMessage      → "Item added to wishlist!" notification

Auto-sync: whenever wishlist changes AND user is logged in → calls PUT /users/:id/wishlist
  → wishlist saved to DB automatically
```

---

## 11. Page by Page Explanation

### 🏠 Home.js
Landing page. Sections:
1. `<HeroSlider />` — rotating banner images
2. `<TopPicksBanner />` — heading
3. `<ProductSlider products={topPicksProducts} />` — 10 top-pick cards
4. `<BestsellersSection />` — heading
5. `<ProductSlider products={bestsellerProducts} />` — 10 bestseller cards

### 🏷️ Sale.js
Filter + sort + grid. State controls all:
- `filterDiscount` → which % discounts to show
- `sortBy` → recommended / price low-high / high-low / newest
- `columns` → 1, 2, 3, or 4 column grid
- `bannerDiscount` → clicking a circle in the banner auto-filters

### 🛍️ ReadyToWear.js (Product Detail)
Receives product via `location.state.product`. Features:
- Thumbnail gallery (click to change main image)
- Heart button (WishlistContext)
- Size selection required before adding to bag
- Add to Bag → validates size → addToCart()

### 💳 Checkout.js
**Requires login.** If not logged in → shows a login gate page with Sign In / Create Account buttons.

3-step accordion:
```
Step 1: Email     → must be valid email format
Step 2: Shipping  → all fields required
Step 3: Payment   → COD + optional Punch Points
```
On "PLACE YOUR ORDER" → `api.createOrder()` → server creates order + sends email → cart cleared → redirect home.

### 👤 Account.js / MyAccount.js
`Account.js` — wrapper that redirects to home if not logged in.
`MyAccount.js` — sidebar tabs:
- Dashboard → welcome + address + account details
- Order History → lists all past orders from API
- Order Tracking → link to /track-order
- Wishlist → all hearted products
- Sign Out

### 🔐 AdminLogin.js
Three fields: **Admin ID + Email + Password**. All three must match the environment variables. On success, sets `sessionStorage.admin_logged_in = '1'` and redirects to `/admin/dashboard`.

### 📊 AdminDashboard.js
Three tabs: Dashboard, Orders, Customers. Verifies admin session on load (checks both sessionStorage and server). Loads real data from admin API endpoints.

---

## 12. Component Explanations

### ProductBagButton.js
The ADD button on every product card.
```
Click ADD → CardSizeSelector appears (XS S M L)
Pick size → addToCart({ ...product, size }) called
           → AddToBagModal appears (confirmation)
```

### CardSizeSelector.js
Size picker popup. Props: `sizes`, `onSelect(size)`, `onClose`.

### AddToBagModal.js
"Added to bag!" confirmation. Two buttons:
- **CONTINUE SHOPPING** → closes modal
- **CHECKOUT** → navigates to /checkout

### CartDrawer.js
Slide-out panel from right. Shows all items, trash to remove, order total, VIEW BAG and PROCEED TO CHECKOUT buttons.

### FilterBar.js
Filter by discount %, sort, item count, grid view toggles.

### AuthModal.js
Sign In / Sign Up popup. Connects to `AuthContext.register()` and `AuthContext.login()`. Shows error messages inline. Toggles between modes.

### Header.js (Navbar)
- Logo → /
- Nav links: Sale, New In, Ready To Wear, Fabrics, Fragrances, Now Happening
- Heart → /wishlist (badge count)
- User → if logged in: /account; if not: AuthModal
- Bag → CartDrawer (badge count)

---

## 13. Shopping & Checkout Flow

```
1. User browses Home / Sale / New In page
   └─ Products in grid or slider

2. Hover product card → ADD button appears

3. Click ADD → CardSizeSelector shows (XS, S, M, L)

4. Pick size → addToCart({ id, title, price, size: "M", ... })
   └─ AddToBagModal shows

5. AddToBagModal:
   ├─ CONTINUE SHOPPING → close
   └─ CHECKOUT → /checkout

6. At /checkout:
   ├─ Not logged in → Login Gate page (Sign In / Create Account)
   └─ Logged in → 3-step checkout form

7. Step 1: Enter email (pre-filled from logged-in user)
8. Step 2: Shipping address + method (Fixed PKR 240 / Next Day PKR 570)
9. Step 3: Payment (COD)

10. PLACE YOUR ORDER:
    ├─ api.createOrder() called
    ├─ Order saved to MongoDB
    ├─ Confirmation email sent with Tracking ID
    ├─ Cart cleared
    └─ Redirect to home
```

---

## 14. User Account System

### Registration
```
AuthModal → Sign Up mode
User fills: First Name, Last Name, Email, Confirm Email, Password, Confirm Password
Validates: emails match, passwords match, password ≥ 6 chars
api.register() → POST /users/register → User created in MongoDB
Password hashed with bcryptjs (NEVER stored plain)
User logged in, redirected to /account
```

### Login
```
AuthModal → Sign In mode
User fills: Email + Password
api.login() → POST /users/login → Server finds user, compares hash
User stored in localStorage (persists refresh)
Redirected to /account
```

### Session Persistence
- User object stored in `localStorage` under key `store_user`
- Loaded on app start so user stays logged in after refresh
- Cleared on logout

### Account Dashboard
| Tab | Shows |
|-----|-------|
| Dashboard | Welcome, address from last order, account details |
| Order History | All past orders with items and totals |
| Order Tracking | Button to /track-order |
| Wishlist | All hearted products |
| Sign Out | Logout + redirect home |

---

## 15. Data Fallback System

Every API function tries the server first. If it fails (server down / network error), it falls back to local data:

| Feature | Server | Fallback |
|---------|--------|---------|
| Products | MongoDB | `utils/localData.js` arrays |
| Register | MongoDB User | localStorage `local_users` |
| Login | MongoDB User | localStorage `local_users` |
| Cart / Wishlist | MongoDB User | In-memory only |
| Orders | MongoDB Order | localStorage `local_orders` |
| Track Order | MongoDB Order | localStorage `local_orders` |

This means **the site works even without a backend running**.

---

## 16. CSS & Styling

All styles in `src/index.css` (~3800+ lines). Organized sections:

| Section | Classes |
|---------|---------|
| Product Cards | `.product-card`, `.product-img-wrapper` |
| Size Picker | `.card-size-selector` |
| Bag Modal | `.bag-modal-overlay`, `.bag-modal` |
| Cart Drawer | `.cart-drawer`, `.cart-drawer-open` |
| Checkout | `.checkout-page`, `.checkout-section`, `.checkout-section.locked` |
| Checkout Gate | `.checkout-login-gate`, `.checkout-login-gate-box` |
| Account | `.account-page-container`, `.account-sidebar` |
| Filter Bar | `.filter-bar-container` |
| Admin Login | `.admin-login-page`, `.admin-login-card` |
| Admin Dashboard | `.adm-layout`, `.adm-sidebar`, `.adm-stat-card`, `.adm-table` |

Libraries used:
- **Bootstrap 5** — Navbar structure
- **Swiper.js** — Horizontal product sliders on home page
- **Lucide React** — Icons in checkout (ChevronUp, Check, Pencil)
- **React Icons** — General icons

---

## 17. Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`)

### Backend
```bash
cd "Backend React"
npm install
# Create .env file from .env.example
cp .env.example .env
# Edit .env with your values
npm start
# → Server runs on http://localhost:9000
```

### Frontend
```bash
cd "React App/my-app"
npm install
npm start
# → App runs on http://localhost:3000
# → Proxy auto-routes API calls to localhost:9000
```

### Admin Access (local)
- URL: `http://localhost:3000/admin/login`
- Admin ID: `KHAADI_ADMIN_001`
- Email: `admin@khaadi.com`
- Password: `KhaadiAdmin@2024`
- *(or whatever you set in your `.env`)*

---

## 18. Deployment Guide (Vercel + MongoDB Atlas)

### Step 1: MongoDB Atlas
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free **M0 cluster**
3. Database Access → Add user (username + password)
4. Network Access → Add IP → `0.0.0.0/0` (allow all)
5. Connect → Drivers → copy URI:
   ```
   mongodb+srv://user:password@cluster.mongodb.net/myDatabase
   ```

### Step 2: Gmail App Password (for emails)
1. Enable 2-Step Verification on Gmail
2. Google Account → Security → App Passwords
3. Create app password → copy 16-char code

### Step 3: Deploy Backend to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import `Khaadi-Store`
2. **Root Directory:** `Backend React`
3. **Framework Preset:** Other
4. Add Environment Variables:

| Key | Value |
|-----|-------|
| `MONGO_URI` | mongodb+srv://... |
| `SESSION_SECRET` | any_long_random_string |
| `NODE_ENV` | production |
| `ADMIN_ID` | KHAADI_ADMIN_001 |
| `ADMIN_EMAIL` | your@gmail.com |
| `ADMIN_PASSWORD` | your_secure_password |
| `EMAIL_USER` | your@gmail.com |
| `EMAIL_PASS` | 16-char app password |
| `ALLOWED_ORIGINS` | *(add after frontend deploys)* |

5. Deploy → copy the backend URL (e.g. `https://khaadi-backend.vercel.app`)

### Step 4: Deploy Frontend to Vercel
1. Vercel → New Project → Import `Khaadi-Store` again
2. **Root Directory:** `React App/my-app`
3. **Framework Preset:** Create React App
4. Add Environment Variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | https://khaadi-backend.vercel.app |

5. Deploy → copy the frontend URL

### Step 5: Update Backend CORS
1. Go to backend Vercel project → Settings → Environment Variables
2. Add: `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`
3. Redeploy backend

---

## 19. Environment Variables Reference

### Backend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `SESSION_SECRET` | ✅ | Secret key for signing sessions |
| `PORT` | Optional | Server port (default: 9000) |
| `NODE_ENV` | ✅ prod | Set to `production` on Vercel |
| `ALLOWED_ORIGINS` | ✅ prod | Comma-separated frontend URLs |
| `ADMIN_ID` | ✅ | Admin login ID |
| `ADMIN_EMAIL` | ✅ | Admin login email |
| `ADMIN_PASSWORD` | ✅ | Admin login password |
| `EMAIL_USER` | Optional | Gmail address for sending emails |
| `EMAIL_PASS` | Optional | Gmail App Password (not regular password) |

### Frontend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_API_URL` | ✅ prod | Backend URL (e.g. https://backend.vercel.app) |

> In development, the `proxy` field in `package.json` routes API calls to `localhost:9000` automatically.

---

## 20. Key Things to Remember

1. **Adding to bag requires size selection** — `ProductBagButton` enforces this
2. **Checkout requires login** — guests see a login gate; after login, their cart is preserved
3. **Order confirmation email** is sent automatically — set `EMAIL_USER` and `EMAIL_PASS` to activate
4. **Admin dashboard** is completely separate from the store — different URL, different session, different UI
5. **Admin credentials are in env vars** — change `ADMIN_ID`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env`
6. **Passwords are always hashed** — bcryptjs hashes before saving; plain text is never stored
7. **Cart + Wishlist auto-sync to DB** — when logged in, every change is saved automatically
8. **The app works without a server** — all data falls back to localStorage if backend is unreachable
9. **Session survives page refresh** — user stays logged in via localStorage (`store_user` key)
10. **Admin session uses sessionStorage** — clears when the browser tab is closed (more secure)
