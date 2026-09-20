// import React from "react";
// import Navbar from "react-bootstrap/Navbar";
// import { Container, Nav } from "react-bootstrap";
// import { NavLink, Link } from "react-router-dom";
// import { useWishlist } from "./WishlistContext";
// import { useCart } from "./CartContext";

// export const SearchIcon = ({ size = 22, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="11" cy="11" r="7" />
//     <line x1="21" y1="21" x2="16" y2="16" />
//   </svg>
// );

// export const HeartIcon = ({ size = 22, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// export const UserIcon = ({ size = 22, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="12" cy="7" r="3" />
//     <path d="M6 18c0-2.5 2.5-3.5 6-3.5s6 1 6 3.5" />
//   </svg>
// );

// export const ShoppingBagIcon = ({ size = 22, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M5 9h14l1 10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L5 9z" />
//     <path d="M9 9a3 3 0 0 1 6 0" />
//   </svg>
// );

// function NavigationBar() {
//   const { wishlist } = useWishlist();
// const { cartCount, toggleCartDrawer } = useCart();
//   return (
//     <header className="site-header">
//       <div className="announcement-bar">
//         <p className="announcement-text">
//           Explore what's new this season with our latest styles{" "}
//           <Link to="/newin" className="announcement-link">
//             right here.
//           </Link>
//         </p>
//         <Link to="/track-order" className="track-link">
//           TRACK
//         </Link>
//       </div>

//       <Navbar expand="lg" className="navbar-icons">
//         <Container>
//           <Nav.Link as={Link} to="/" className="nav-logo">
//             <img
//               src="https://pk.khaadi.com/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwb33579b0/images/logo/logo.svg"
//               alt="Logo"
//               className="logo"
//             />
//           </Nav.Link>

//           <Navbar.Toggle aria-controls="basic-navbar-nav" />

//           <Navbar.Collapse id="navbar-links">
//             <Nav className="nav-menu">
//               <Nav.Link as={NavLink} to="/sale" className="sale-red">
//                 Sale
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/newin" className="nav-link-custom">
//                 New In
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/readytowear" className="nav-link-custom">
//                 Ready To Wear
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/fabrics" className="nav-link-custom">
//                 Fabrics
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/fragrances" className="nav-link-custom">
//                 Fragrances
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="/nowhappening" className="nav-link-custom">
//                 Now Happening
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>

//           <div className="navbar-icon-group">
//             <button className="navbar-icon-btn" aria-label="Search">
//               <SearchIcon size={22} className="navbar-svg" />
//             </button>
            
//             <Link to="/wishlist" className="navbar-icon-btn nav-wishlist-icon-wrapper" aria-label="Wishlist">
//               <HeartIcon size={22} className="navbar-svg" />
//               {wishlist.length > 0 && (
//                 <span className="wishlist-badge">{wishlist.length}</span>
//               )}
//             </Link>

//             <button className="navbar-icon-btn" aria-label="Account">
//               <UserIcon size={22} className="navbar-svg" />
//             </button>

// <div 
//           className="navbar-icon-btn nav-cart-icon-wrapper" 
//           aria-label="Cart" 
//           onClick={toggleCartDrawer}
//           style={{ position: 'relative', cursor: 'pointer' }}
//         >
//           <ShoppingBagIcon size={22} className="navbar-svg" />
//           {cartCount > 0 && (
//             <span className="wishlist-badge">{cartCount}</span>
//           )}
//             </div>
//           </div>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default NavigationBar;
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import AuthModal from './AuthModal';

export const SearchIcon = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16" y2="16" />
  </svg>
);

export const HeartIcon = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const UserIcon = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="7" r="3" />
    <path d="M6 18c0-2.5 2.5-3.5 6-3.5s6 1 6 3.5" />
  </svg>
);

export const ShoppingBagIcon = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 9h14l1 10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L5 9z" />
    <path d="M9 9a3 3 0 0 1 6 0" />
  </svg>
);

function NavigationBar() {
  const { wishlist } = useWishlist();
  const { cartCount, toggleCartDrawer } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <p className="announcement-text">
          Explore what's new this season with our latest styles{" "}
          <Link to="/newin" className="announcement-link">
            right here.
          </Link>
        </p>
        <Link to="/track-order" className="track-link">
          TRACK
        </Link>
      </div>

      <Navbar expand="lg" className="navbar-icons">
        <Container>
          <Nav.Link as={Link} to="/" className="nav-logo">
            <img
              src="https://pk.khaadi.com/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwb33579b0/images/logo/logo.svg"
              alt="Logo"
              className="logo"
            />
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="navbar-links">
            <Nav className="nav-menu">
              <Nav.Link as={NavLink} to="/sale" className="sale-red">
                Sale
              </Nav.Link>
              <Nav.Link as={NavLink} to="/newin" className="nav-link-custom">
                New In
              </Nav.Link>
              <Nav.Link as={NavLink} to="/readytowear" className="nav-link-custom">
                Ready To Wear
              </Nav.Link>
              <Nav.Link as={NavLink} to="/fabrics" className="nav-link-custom">
                Fabrics
              </Nav.Link>
              <Nav.Link as={NavLink} to="/fragrances" className="nav-link-custom">
                Fragrances
              </Nav.Link>
              <Nav.Link as={NavLink} to="/nowhappening" className="nav-link-custom">
                Now Happening
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="navbar-icon-group">
            <button className="navbar-icon-btn" aria-label="Search">
              <SearchIcon size={22} className="navbar-svg" />
            </button>
            
            <Link to="/wishlist" className="navbar-icon-btn nav-wishlist-icon-wrapper" aria-label="Wishlist">
              <HeartIcon size={22} className="navbar-svg" />
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </Link>

            <button 
              className="navbar-icon-btn" 
              aria-label="Account"
              onClick={() => {
                if (user) navigate('/account');
                else setIsAuthModalOpen(true);
              }}
            >
              <UserIcon size={22} className="navbar-svg" />
            </button>

            <div 
              className="navbar-icon-btn nav-cart-icon-wrapper" 
              aria-label="Cart" 
              onClick={toggleCartDrawer}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <ShoppingBagIcon size={22} className="navbar-svg" />
              {cartCount > 0 && (
                <span className="wishlist-badge">{cartCount}</span>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}

export default NavigationBar;