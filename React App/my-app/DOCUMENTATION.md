# 📚 Khaadi-Inspired React App — Full Code Documentation

> Written in **simple, plain English** — no assumed knowledge required.

---

## 🗂️ Table of Contents
1. [What This App Is](#1-what-this-app-is)
2. [How the App is Organized](#2-how-the-app-is-organized)
3. [Core Concepts Used](#3-core-concepts-used)
4. [Page by Page Explanation](#4-page-by-page-explanation)
5. [Component Explanations](#5-component-explanations)
6. [Context (Shared State) System](#6-context-shared-state-system)
7. [The Shopping Flow — Step by Step](#7-the-shopping-flow--step-by-step)
8. [The Checkout Flow — Step by Step](#8-the-checkout-flow--step-by-step)
9. [User Account System](#9-user-account-system)
10. [API & Data Fallback System](#10-api--data-fallback-system)
11. [CSS & Styling Approach](#11-css--styling-approach)

---

## 1. What This App Is

This is a **full e-commerce front-end** inspired by the Khaadi clothing brand. It lets users:
- Browse products on the Home, Sale, New In, and Ready To Wear pages
- Add products to a **Wishlist** (saved items) and a **Shopping Bag** (cart)
- Go through a complete **Checkout** process (Email → Shipping → Payment)
- Create an account, sign in, and view their **Order History**

The app is built with **React** — a JavaScript library for building web interfaces.

---

## 2. How the App is Organized

```
my-app/src/
│
├── App.js                    ← The "main map" of the app — lists all pages/routes
├── index.js                  ← The very first file that runs, mounts the app to the page
│
├── Pages/                    ← Full pages the user navigates to
│   ├── Home.js               ← Homepage with hero, product sliders
│   ├── Sale.js               ← Sale page with filter and grid
│   ├── NewIn.js              ← New arrivals page
│   ├── ReadyToWear.js        ← Single product detail page
│   ├── ReadyToWearListing.js ← All "Ready To Wear" products grid
│   ├── Wishlist.js           ← Saved/favourited items
│   ├── Checkout.js           ← The buy-now checkout process
│   ├── CartPage.js           ← Full cart page
│   ├── Account.js            ← My Account wrapper
│   ├── Fabrics.js            ← Fabrics category page
│   ├── Fragrances.js         ← Fragrances category page
│   ├── NowHappening.js       ← Events/editorial page
│   └── TrackOrder.js         ← Order tracking page
│
├── Components/               ← Reusable building blocks used inside pages
│   ├── Common/
│   │   ├── Header.js         ← The top navigation bar
│   │   ├── Footer.js         ← The bottom footer
│   │   ├── AuthContext.js    ← Manages who is logged in (shared across app)
│   │   ├── AuthModal.js      ← The Login / Sign Up popup window
│   │   ├── CartContext.js    ← Manages what's in the shopping bag
│   │   ├── CartDrawer.js     ← The slide-out bag panel from the right
│   │   ├── WishlistContext.js← Manages the heart/wishlist items
│   │   └── MoveToWishlistModal.js ← Popup to move a cart item to wishlist
│   ├── Cart/
│   │   ├── ProductBagButton.js   ← "ADD" button that shows size picker
│   │   ├── AddToBagModal.js      ← "Added to bag!" confirmation popup
│   │   └── CardSizeSelector.js   ← XS / S / M / L size buttons on card
│   ├── Home/
│   │   ├── HeroSlider.js         ← Big banner slideshow at top of home
│   │   ├── ProductSlider.js      ← Horizontal swipeable product cards
│   │   ├── TopPicksBanner.js     ← "Top Picks" title/heading section
│   │   └── BestsellersSection.js ← "Bestsellers" title/heading section
│   ├── Product/
│   │   ├── ProductBundleDetail.js← Bundle items (shirt + pants + dupatta)
│   │   └── SizeGuide.js          ← Size guide popup
│   ├── Sales/
│   │   ├── SaleBanner.js         ← Sale page top banner + discount circles
│   │   ├── FilterBar.js          ← Filter & Sort bar
│   │   └── DiscountGrid.js       ← Grid of sale product cards
│   └── Account/
│       └── MyAccount.js          ← The full account dashboard
│
├── utils/
│   ├── productUtils.js       ← Helper functions (price formatting, defaults)
│   └── localData.js          ← Local product data + auth fallback (no server needed)
│
└── api/
    └── client.js             ← All network requests to the backend server
```

---

## 3. Core Concepts Used

### 🔷 React Components
Think of each file in `Components/` or `Pages/` as a **LEGO brick**. Each one is a small, self-contained piece of the UI. You snap them together in `App.js` to build the whole website.

```jsx
// Example: A simple component
function Greeting() {
  return <h1>Hello World!</h1>;
}
```

### 🔷 Props
**Props** are like arguments you pass to a component — they customize it.

```jsx
// Passing a "name" prop
<Greeting name="Maidah" />

// Inside the component, using the prop
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### 🔷 State (useState)
**State** is data that can change. When state changes, the component automatically re-draws itself.

```jsx
const [count, setCount] = useState(0);  // count starts at 0
// Clicking a button calls setCount(count + 1) which re-draws with new number
```

### 🔷 Context (useContext)
**Context** is like a "global variable" for your app. Instead of passing data through every component, you store it in Context and any component can access it directly. We use this for:
- The **Wishlist** (which items are hearted)
- The **Cart** (which items are in the bag)
- The **User** (who is logged in)

### 🔷 useEffect
**useEffect** runs code after the component appears on screen — useful for fetching data, updating the page title, etc.

```jsx
useEffect(() => {
  document.title = "Sale Page";  // Runs once after component loads
}, []); // Empty [] means "run once only"
```

### 🔷 React Router
**React Router** handles navigation between pages without reloading the entire browser.

```jsx
<Route path="/sale" element={<Sale />} />
// When user visits /sale, show the Sale component
```

---

## 4. Page by Page Explanation

### 🏠 Home.js
The landing page. It assembles these sections in order:
1. `<HeroSlider />` — Big rotating banner images
2. `<TopPicksBanner />` — "Top Picks" heading text
3. `<ProductSlider products={topPicksProducts} />` — 10 top-pick product cards
4. `<BestsellersSection />` — "Bestsellers" heading text
5. `<ProductSlider products={bestsellerProducts} />` — 10 bestseller product cards

The product data arrays (`topPicksProducts`, `bestsellerProducts`) are defined directly in this file with images, prices, and discount tags.

---

### 🏷️ Sale.js
The sale page with three connected pieces that work together:

```jsx
// State in Sale.js controls all three child components:
const [columns, setColumns] = useState(4);        // how many columns in the grid
const [filterDiscount, setFilterDiscount] = useState([]); // which % is filtered
const [sortBy, setSortBy] = useState('recommended');       // sort order
const [bannerDiscount, setBannerDiscount] = useState(null); // circle click
```

- Clicking a **circle** (Flat 30%, 50%, etc.) in `SaleBanner` → filters the grid
- Using the **Filter by** dropdown → also filters the grid
- Changing the **sort** dropdown → re-orders the products
- Clicking **grid view icons** → changes column count

---

### 🛍️ ReadyToWear.js (Product Detail Page)
When you click any product card, you land here. This page receives the product data via `location.state.product` (passed by the card when navigating).

Key features:
- **Thumbnail gallery** on the left — clicking a thumbnail changes the main image
- **Heart button** on the main image — connected to WishlistContext
- **Size selection** via `ProductBundleDetail` — must pick a size before adding to bag
- **"Add to Bag" button** — validates size is chosen, then calls `addToCart()`

---

### 💳 Checkout.js
A 3-step accordion form. Each step **locks** until the previous is complete:

```
Step 1: ENTER EMAIL    → must enter valid email to unlock Step 2
Step 2: SHIPPING       → must fill all address fields to unlock Step 3
Step 3: PAYMENT        → can now place order
```

The right side shows a **live bag summary** with all items, sizes, quantities, and total price.

---

### 👤 Account.js / MyAccount.js
`Account.js` is just a wrapper that checks if a user is logged in. If not, it redirects to home. If yes, it renders `MyAccount.js`.

`MyAccount.js` has a **sidebar navigation** with tabs:
- **Dashboard** — welcome banner + address card + account details card
- **Order History** — list of past orders (from API or local storage)
- **Order Tracking** — link to track an order by number
- **Wishlist (All Items)** — shows all hearted products
- **Sign Out** — logs the user out and redirects to home

---

## 5. Component Explanations

### 🧩 ProductBagButton.js
This is the **ADD button** on every product card. Here's its full behavior:

```
User clicks ADD
  ↓
Shows CardSizeSelector (XS, S, M, L buttons)
  ↓
User picks a size
  ↓
Calls addToCart({ ...product, size: "M" })
  ↓
CartContext automatically shows AddToBagModal
```

```jsx
// How it's used on any card:
<ProductBagButton product={item} className="add-to-cart-btn" />
```

It's a **reusable component** — the same component works on home cards, sale cards, New In cards, and Ready To Wear listing cards.

---

### 🧩 CardSizeSelector.js
A small popup that appears **over the product card** when you click ADD. It shows size buttons (XS, S, M, L). Clicking a size calls `onSelect(size)` which goes back to `ProductBagButton` to complete the add-to-cart action.

```jsx
// It receives these props:
// sizes: array like ["XS", "S", "M", "L"]
// onSelect: function called with chosen size
// onClose: function called to dismiss without selecting
```

---

### 🧩 AddToBagModal.js
The **confirmation popup** that appears after adding to bag (like image 2 you shared). It shows:
- The product image
- Product name + "successfully added to your shopping bag!"
- **CONTINUE SHOPPING** button → closes the modal, user stays on current page
- **CHECKOUT** button → navigates to `/checkout`

---

### 🧩 CartDrawer.js
The **slide-out panel** from the right side when you click the bag icon in the navbar. Shows:
- All items in the bag with image, price, size, quantity
- Trash icon to remove items
- Order summary with total
- **VIEW BAG** → goes to `/cart` full page
- **PROCEED TO CHECKOUT** → goes to `/checkout`

---

### 🧩 FilterBar.js
Used on Sale, New In, and Ready To Wear listing pages. It has:
- **Filter by** dropdown → opens a popover with discount % checkboxes
- **Sort** dropdown → Recommended / Newest / Price Low-High / Price High-Low
- **Item count** display
- **Grid view toggles** (1, 2, 3, or 4 columns)

Each selection calls a callback prop (`onFilterChange`, `onSortChange`, `onViewChange`) so the parent page can update the product grid.

---

### 🧩 AuthModal.js
The **sign in / sign up popup** that appears when clicking the user icon. Supports:
- **Sign In** mode: email + password + remember me
- **Sign Up** mode: first name + last name + email + confirm email + password + confirm password + newsletter
- Eye icon to show/hide password
- Error messages for mismatched passwords/emails
- Google/Facebook login buttons (visual only)
- Toggle between Sign In and Sign Up

---

### 🧩 Header.js (Navbar)
The top navigation bar. It:
- Shows the **Khaadi logo** (links to home)
- Has **nav links**: Sale, New In, Ready To Wear, Fabrics, Fragrances, Now Happening
- **Search icon** (no functionality yet)
- **Heart icon** → links to `/wishlist` + shows red badge with count
- **User icon** → if logged in: goes to `/account`; if not: opens `AuthModal`
- **Bag icon** → opens `CartDrawer` + shows red badge with cart count

---

## 6. Context (Shared State) System

### WishlistContext.js
```
What it stores: array of wishlisted products
What it provides:
  - wishlist          → the array
  - toggleWishlist(product) → adds if not there, removes if already there
  - toastMessage      → "Item added to wishlist!" notification text
```

**How the heart knows if a product is already wishlisted:**
```jsx
const isWishlisted = wishlist.some((w) => w.id === item.id);
// .some() checks if ANY item in the array has the same id
```

---

### CartContext.js
```
What it stores: array of cart items (each has { ...product, size, qty })
What it provides:
  - cart              → the array
  - addToCart(product)     → adds or increments quantity
  - removeFromCart(id, size) → removes specific item
  - updateCartItem(...)   → change size or quantity of an item
  - clearCart()       → empties the bag
  - cartCount         → total number of items (sum of all qty)
  - toggleCartDrawer()→ opens/closes the slide-out cart
```

**Key design — cart key uses both id AND size:**
```jsx
const cartKey = `${product.id}-${product.size || "default"}`;
// This means: same product in size S and size M are SEPARATE cart entries
```

**After adding to cart, it automatically shows the confirmation modal:**
```jsx
setAddedProductModal(product); // This triggers AddToBagModal to appear
```

---

### AuthContext.js
```
What it stores: the currently logged-in user object
What it provides:
  - user       → the user object (null if not logged in)
  - login()    → sign in with email + password
  - register() → create new account
  - logout()   → sign out, clear user
  - updateProfile() → save profile changes
```

**Persists across page refreshes** using `localStorage`:
```jsx
// When user logs in, save to browser storage
localStorage.setItem('store_user', JSON.stringify(user));

// When page loads, read from storage
const [user, setUserState] = useState(readStoredUser);
```

---

## 7. The Shopping Flow — Step by Step

```
1. User browses Home / Sale / New In / Ready To Wear page
   └─ Products displayed in grid or slider

2. User hovers over a product card
   └─ ADD button appears (ProductBagButton)

3. User clicks ADD
   └─ CardSizeSelector appears (XS, S, M, L)

4. User picks a size (e.g. "M")
   └─ addToCart({ id: 5, title: "...", price: "...", size: "M" }) called

5. AddToBagModal appears:
   ├─ "CONTINUE SHOPPING" → closes modal, stays on page
   └─ "CHECKOUT" → navigates to /checkout

6. Navbar bag icon now shows count badge (e.g. "1")

7. User can click bag icon → CartDrawer slides open
   ├─ Shows item details
   ├─ Can remove items (trash icon)
   ├─ "VIEW BAG" → /cart page
   └─ "PROCEED TO CHECKOUT" → /checkout
```

---

## 8. The Checkout Flow — Step by Step

```
STEP 1 — ENTER EMAIL (always open first)
├─ Type email address
├─ Check/uncheck newsletter subscription
└─ Click "PROCEED TO SHIPPING"
   └─ Validates email format
   └─ If valid: marks email as complete (✅ green circle appears)
              Step 2 SHIPPING section opens automatically

STEP 2 — SHIPPING (only opens after email is complete)
├─ Fill: First Name, Last Name, Mobile Number, Street Address
├─ Select: Country (Pakistan), State/Province, City
├─ Choose shipping method:
│   ├─ Fixed (4-8 days) — PKR 240
│   └─ Next Day Delivery (before 11 AM) — PKR 570
└─ Click "PROCEED TO PAYMENT"
   └─ Validates all required fields
   └─ If complete: marks shipping done (✅)
                  Step 3 PAYMENT section opens
                  Shipping summary shows (like image 7)

STEP 3 — PAYMENT (only opens after shipping is complete)
├─ Optional: PUNCH POINTS (enter mobile → Request OTP → Verify OTP)
├─ Payment method:
│   └─ COD (Cash on Delivery) — payment collected at delivery
└─ Click "PLACE YOUR ORDER"
   └─ Creates order (saved locally if no server)
   └─ Clears cart
   └─ Redirects to home page
```

**Right side bag summary** updates in real-time:
- Shows all cart items with image, name, price, size, qty
- Shows running total (subtotal + shipping cost)
- The "Proceed" button label changes based on current step

---

## 9. User Account System

### Registration
```
User clicks User icon in navbar
  ↓
AuthModal opens in "Sign Up" mode
  ↓
User fills: First Name, Last Name, Email, Confirm Email, Password, Confirm Password
  ↓
Form validates:
  - Emails must match
  - Passwords must match
  - Password must be 6+ characters
  ↓
api.register() is called
  ↓ (if no server running)
localRegister() creates user in localStorage under "local_users" key
  ↓
User is logged in → redirected to /account
```

### Login
```
User clicks User icon → AuthModal in "Sign In" mode
User enters email + password
api.login() called → falls back to localLogin() if no server
User object stored in localStorage for persistence
Redirected to /account page
```

### Account Dashboard (MyAccount.js)
The sidebar has these sections:
| Tab | What It Shows |
|-----|--------------|
| Dashboard | Welcome message, address card, account details |
| Order History | All past orders with items and total |
| Order Tracking | Button to go to /track-order page |
| Wishlist | All hearted/saved products |
| Sign Out | Logs out and returns to home |

---

## 10. API & Data Fallback System

### The Problem
The app is designed to connect to a backend server at `http://localhost:9000`. But when the server isn't running, everything would break.

### The Solution: Try Server → Fall Back to Local
Every API function in `client.js` tries the server first. If it fails (network error), it immediately uses **local fallbacks**:

```javascript
register: async (body) => {
  try {
    return await request('/users/register', { method: 'POST', body });
    // ↑ If server is running, use server
  } catch {
    return localRegister(body);
    // ↑ If server is down, save to localStorage instead
  }
},
```

### Where Data is Stored Locally
| Data | localStorage Key | Description |
|------|-----------------|-------------|
| Logged-in user | `store_user` | Current session user |
| All users | `local_users` | Registered accounts |
| Orders | `local_orders` | Placed orders |
| Cart | (in CartContext) | Active session cart |
| Wishlist | (in WishlistContext) | Hearted items |

### Product Data
Products (sale, new in, ready to wear) are defined as static arrays in `utils/localData.js`. The API returns these arrays when the server is unreachable.

---

## 11. CSS & Styling Approach

All custom styles are in **`src/index.css`** (one big file, ~2500+ lines).

The project uses:
- **Bootstrap** for the Navbar structure and responsive grid
- **Custom CSS classes** for everything else — product cards, sliders, checkout, account
- **Swiper** library for the horizontal product sliders on the home page

### Important CSS Classes

| Class | Where Used | What It Does |
|-------|-----------|--------------|
| `.product-card` | All product grids | The white card with hover effects |
| `.product-img-wrapper` | Home slider cards | Container for image + overlay buttons |
| `.product-image-wrapper` | Sale/grid cards | Same but for grid layout |
| `.wishlist-btn` | Home cards | Heart button (top-right of image) |
| `.wishlist-circle-btn` | Sale/grid cards | Round heart button |
| `.add-cart-btn` | Home slider cards | "ADD" bag button |
| `.add-to-cart-btn` | Sale/grid cards | "ADD" bag button |
| `.wishlist-badge` | Navbar | Red circle count on heart/bag icon |
| `.card-size-selector` | On top of product card | Size picker overlay |
| `.bag-modal-overlay` | Full screen | Dark background behind modal |
| `.bag-modal` | Center of screen | "Added to bag" white modal |
| `.checkout-page` | Checkout | Full page layout |
| `.checkout-section` | Checkout | Each step (Email/Shipping/Payment) |
| `.checkout-section.locked` | Checkout | Greyed-out locked step |
| `.account-page-container` | My Account | Full account page |
| `.account-sidebar` | My Account | Left navigation panel |
| `.filter-bar-container` | Sale/grids | Filter + sort + grid toggle bar |

---

## 🔑 Key Things to Remember

1. **Adding to bag always requires size selection** — `ProductBagButton` enforces this
2. **Checkout is sequential** — you can't jump to Payment without completing Email and Shipping
3. **The app works without a server** — all auth, product data, and orders fall back to localStorage
4. **Hearts (wishlist) and bag counts** are shown in real-time in the navbar using Context
5. **Clicking a product card anywhere** navigates to `/product/:id` and passes the product data via `location.state`
6. **"Continue Shopping"** in the AddToBagModal just closes the popup — user stays on the same page
7. **Login persists across page refreshes** because the user object is saved in `localStorage`
