// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../Components/Common/CartContext";
// import EditCartModal from "../Components/Common/EditCartModal"; // <--- Import modal
// import { Trash2, Plus, Minus } from "lucide-react";

// export default function CartPage() {
//   const { cart, removeFromCart, addToCart } = useCart();
//   const navigate = useNavigate();
  
//   const [editingItem, setEditingItem] = useState(null); // <--- State for active edited item

//   const handleQuantityChange = (item, delta) => {
//     if (delta > 0) {
//       addToCart({ ...item, qty: 1 });
//     }
//   };

//   const priceInclTax = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const salesTax = priceInclTax > 0 ? Math.round(priceInclTax * 0.15) : 0;
//   const serviceCharges = priceInclTax > 0 ? 1 : 0;
//   const total = priceInclTax + salesTax + serviceCharges;

//   return (
//     <div className="cart-page-container" style={{ padding: "40px 8%", maxWidth: "1400px", margin: "0 auto" }}>
//       <h1 style={{ fontSize: "24px", fontWeight: "500", marginBottom: "30px" }}>
//         YOUR BAG ({cart.reduce((sum, item) => sum + item.qty, 0)})
//       </h1>

//       {cart.length === 0 ? (
//         <p style={{ fontSize: "16px", color: "#666" }}>Your shopping bag is empty.</p>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
          
//           <div className="cart-items-section">
//             {cart.map((item, index) => (
//               <div 
//                 key={index} 
//                 style={{ display: "flex", gap: "20px", paddingBottom: "30px", borderBottom: "1px solid #eaeaea", alignItems: "center" }}
//               >
//                 <img src={item.image} alt={item.title} style={{ width: "120px", height: "160px", objectFit: "cover", background: "#f9f9f9" }} />
                
//                 <div style={{ flexGrow: 1 }}>
//                   <h3 style={{ fontSize: "16px", fontWeight: "400", margin: "0 0 6px 0" }}>{item.title}</h3>
//                   <p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px 0" }}>PKR {item.price.toLocaleString()}</p>
                  
//                   <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
//                     Size: <strong style={{ color: "#000" }}>{item.size || "M"}</strong>
//                   </div>
                  
//                   <div style={{ fontSize: "13px", color: "#2e7d32", marginBottom: "12px" }}>In Stock</div>

//                   <div style={{ display: "flex", gap: "15px", fontSize: "13px", color: "#333" }}>
//                     {/* Trigger edit modal */}
//                     <span 
//                       style={{ cursor: "pointer", textDecoration: "underline" }}
//                       onClick={() => setEditingItem(item)}
//                     >
//                       Edit
//                     </span>
//                     <span style={{ cursor: "pointer", textDecoration: "underline" }}>Move To Wishlist</span>
//                   </div>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
//                   <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", background: "#fff" }}>
//                     <button style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer" }}>
//                       <Minus size={14} />
//                     </button>
//                     <span style={{ padding: "0 6px", fontSize: "14px", fontWeight: "500" }}>{item.qty}</span>
//                     <button style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer" }} onClick={() => handleQuantityChange(item, 1)}>
//                       <Plus size={14} />
//                     </button>
//                   </div>

//                   <button onClick={() => removeFromCart(item.id, item.size)} style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}>
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Summary column */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <div style={{ background: "#f8f8f8", padding: "20px", borderRadius: "8px" }}>
//               <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px 0" }}>REDEEM YOUR PROMO CODE</h4>
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <input type="text" placeholder="Enter Code" style={{ flexGrow: 1, padding: "10px 14px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px", background: "#fff" }} />
//                 <button style={{ background: "#222", color: "#fff", border: "none", padding: "10px 20px", fontWeight: "600", fontSize: "12px", borderRadius: "4px", cursor: "pointer" }}>APPLY</button>
//               </div>
//             </div>

//             <div style={{ background: "#f8f8f8", padding: "20px", borderRadius: "8px" }}>
//               <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 15px 0" }}>ORDER SUMMARY</h4>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "12px" }}>
//                 <span>Price incl. tax</span><span>PKR {priceInclTax.toLocaleString()}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "12px" }}>
//                 <span>Sales Tax</span><span>PKR {salesTax.toLocaleString()}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "15px" }}>
//                 <span>FBR service charges</span><span>PKR {serviceCharges}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600", paddingTop: "15px", borderTop: "1px solid #ddd" }}>
//                 <span>Total</span><span>PKR {total.toLocaleString()}</span>
//               </div>
//             </div>

//             <button onClick={() => navigate("/checkout")} style={{ width: "100%", background: "#222", color: "#fff", border: "none", padding: "16px", fontWeight: "600", fontSize: "13px", borderRadius: "30px", cursor: "pointer" }}>
//               PROCEED TO CHECKOUT
//             </button>
//           </div>

//         </div>
//       )}

//       {/* Render Edit Modal when an item is selected */}
//       <EditCartModal item={editingItem} onClose={() => setEditingItem(null)} />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Common/CartContext";
import EditCartModal from "../Components/Common/EditCartModal";
import MoveToWishlistModal from "../Components/Common/MoveToWishlistModal";
import { Trash2, Plus, Minus } from "lucide-react";
import { parsePrice } from "../utils/productUtils";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const navigate = useNavigate();
  
  const [editingItem, setEditingItem] = useState(null);
  const [wishlistModalItem, setWishlistModalItem] = useState(null);

  const handleQuantityChange = (item, delta) => {
    const nextQty = (item.qty || 1) + delta;
    if (nextQty < 1) {
      removeFromCart(item.id, item.size);
      return;
    }
    updateCartItem(item, item.size, nextQty);
  };

  const priceInclTax = cart.reduce(
    (sum, item) => sum + parsePrice(item.price || item.salePrice) * item.qty,
    0
  );
  const salesTax = priceInclTax > 0 ? Math.round(priceInclTax * 0.15) : 0;
  const serviceCharges = priceInclTax > 0 ? 1 : 0;
  const total = priceInclTax + salesTax + serviceCharges;

  useEffect(() => {
    document.title = "Your Cart | Shopping Bag";
  }, []);

  return (
    <div className="cart-page-container" style={{ padding: "40px 8%", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "500", marginBottom: "30px" }}>
        YOUR BAG ({cart.reduce((sum, item) => sum + item.qty, 0)})
      </h1>

      {cart.length === 0 ? (
        <p style={{ fontSize: "16px", color: "#666" }}>Your shopping bag is empty.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
          
          <div className="cart-items-section">
            {cart.map((item, index) => (
              <div 
                key={index} 
                style={{ display: "flex", gap: "20px", paddingBottom: "30px", borderBottom: "1px solid #eaeaea", alignItems: "center" }}
              >
                <img src={item.image} alt={item.title} style={{ width: "120px", height: "160px", objectFit: "cover", background: "#f9f9f9" }} />
                
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "400", margin: "0 0 6px 0" }}>{item.title}</h3>
                  <p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px 0" }}>
                    {typeof item.price === "number" ? `PKR ${item.price.toLocaleString()}` : (item.price || item.salePrice)}
                  </p>
                  
                  <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
                    Size: <strong style={{ color: "#000" }}>{item.size || "M"}</strong>
                  </div>
                  
                  <div style={{ fontSize: "13px", color: "#2e7d32", marginBottom: "12px" }}>In Stock</div>

                  <div style={{ display: "flex", gap: "15px", fontSize: "13px", color: "#333" }}>
                    <span 
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </span>
                    {/* Trigger Move to Wishlist confirmation modal */}
                    <span 
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setWishlistModalItem(item)}
                    >
                      Move To Wishlist
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", background: "#fff" }}>
                    <button style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer" }} onClick={() => handleQuantityChange(item, -1)}>
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: "0 6px", fontSize: "14px", fontWeight: "500" }}>{item.qty}</span>
                    <button style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer" }} onClick={() => handleQuantityChange(item, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item.id, item.size)} style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#f8f8f8", padding: "20px", borderRadius: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px 0" }}>REDEEM YOUR PROMO CODE</h4>
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="text" placeholder="Enter Code" style={{ flexGrow: 1, padding: "10px 14px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px", background: "#fff" }} />
                <button style={{ background: "#222", color: "#fff", border: "none", padding: "10px 20px", fontWeight: "600", fontSize: "12px", borderRadius: "4px", cursor: "pointer" }}>APPLY</button>
              </div>
            </div>

            <div style={{ background: "#f8f8f8", padding: "20px", borderRadius: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 15px 0" }}>ORDER SUMMARY</h4>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "12px" }}>
                <span>Price incl. tax</span><span>PKR {priceInclTax.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "12px" }}>
                <span>Sales Tax</span><span>PKR {salesTax.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "15px" }}>
                <span>FBR service charges</span><span>PKR {serviceCharges}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600", paddingTop: "15px", borderTop: "1px solid #ddd" }}>
                <span>Total</span><span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => navigate("/checkout")} style={{ width: "100%", background: "#222", color: "#fff", border: "none", padding: "16px", fontWeight: "600", fontSize: "13px", borderRadius: "30px", cursor: "pointer" }}>
              PROCEED TO CHECKOUT
            </button>
          </div>

        </div>
      )}

      {/* Render Modals */}
      <EditCartModal item={editingItem} onClose={() => setEditingItem(null)} />
      <MoveToWishlistModal item={wishlistModalItem} onClose={() => setWishlistModalItem(null)} />
    </div>
  );
}