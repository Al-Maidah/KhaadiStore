// import React from "react";
// import { useCart } from "./CartContext";
// import { X, Trash2 } from "lucide-react";

// export default function CartDrawer() {
//   const { cart, isCartOpen, closeCartDrawer, removeFromCart } = useCart();

//   if (!isCartOpen) return null;

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="cart-drawer-overlay" onClick={closeCartDrawer}>
//       <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
//         <div className="cart-drawer-header">
//           <h2>YOUR BAG ({cart.reduce((sum, item) => sum + item.qty, 0)})</h2>
//           <button onClick={closeCartDrawer} className="close-drawer-btn"><X size={20} /></button>
//         </div>

//         <div className="cart-drawer-body">
//           {cart.length === 0 ? (
//             <p className="empty-bag-text">Your shopping bag is empty.</p>
//           ) : (
//             cart.map((item, index) => (
//               <div key={index} className="cart-drawer-item">
//                 <img src={item.image} alt={item.title} className="cart-item-thumb" />
//                 <div className="cart-item-info">
//                   <h4>{item.title}</h4>
//                   <p className="cart-item-price">PKR {item.price.toLocaleString()}</p>
//                   <p className="cart-item-size">Size: <strong>{item.size || "M"}</strong></p>
//                   <p className="cart-item-stock">In Stock</p>
//                   <div className="cart-item-qty-row">
//                     <span>Qty: {item.qty}</span>
//                   </div>
//                 </div>
//                 <button 
//                   className="cart-item-delete" 
//                   onClick={() => removeFromCart(item.id, item.size)}
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cart-drawer-footer">
//           <div className="order-summary-box">
//             <h4>ORDER SUMMARY</h4>
//             <div className="summary-line">
//               <span>Price Incl. Tax</span>
//               <span>PKR {subtotal.toLocaleString()}</span>
//             </div>
//             <div className="summary-line total-line">
//               <span>Total</span>
//               <span>PKR {subtotal.toLocaleString()}</span>
//             </div>
//           </div>
//           <button className="drawer-btn view-bag-action" onClick={closeCartDrawer}>VIEW BAG</button>
//           <button className="drawer-btn checkout-action" onClick={closeCartDrawer}>PROCEED TO CHECKOUT</button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom"; // <--- Import useNavigate
import { useCart } from "./CartContext";
import { X, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCartDrawer, removeFromCart } = useCart();
  const navigate = useNavigate(); // <--- Initialize hook

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleViewBag = () => {
    closeCartDrawer();
    navigate("/cart"); // <--- Routes to the full cart page
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCartDrawer}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>YOUR BAG ({cart.reduce((sum, item) => sum + item.qty, 0)})</h2>
          <button onClick={closeCartDrawer} className="close-drawer-btn"><X size={20} /></button>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <p className="empty-bag-text">Your shopping bag is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-drawer-item">
                <img src={item.image} alt={item.title} className="cart-item-thumb" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">PKR {item.price.toLocaleString()}</p>
                  <p className="cart-item-size">Size: <strong>{item.size || "M"}</strong></p>
                  <p className="cart-item-stock">In Stock</p>
                  <div className="cart-item-qty-row">
                    <span>Qty: {item.qty}</span>
                  </div>
                </div>
                <button 
                  className="cart-item-delete" 
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="order-summary-box">
            <h4>ORDER SUMMARY</h4>
            <div className="summary-line">
              <span>Price Incl. Tax</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Attached handleViewBag to route to full cart page */}
          <button className="drawer-btn view-bag-action" onClick={handleViewBag}>VIEW BAG</button>
          
          <button className="drawer-btn checkout-action" onClick={() => { closeCartDrawer(); navigate("/checkout"); }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}