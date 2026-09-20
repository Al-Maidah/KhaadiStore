// import React from "react";
// import { X } from "lucide-react";
// import { useCart } from "./CartContext";
// import { useWishlist } from "./WishlistContext";

// export default function MoveToWishlistModal({ item, onClose }) {
//   const { removeFromCart } = useCart();
//   const { addToWishlist } = useWishlist(); // Assumes you have addToWishlist in your wishlist context

//   if (!item) return null;

//   const handleConfirmYes = () => {
//     // Add to wishlist and remove from cart
//     if (addToWishlist) {
//       addToWishlist(item);
//     }
//     removeFromCart(item.id, item.size);
//     onClose();
//   };

//   return (
//     <div className="bag-modal-overlay" onClick={onClose}>
//       <div 
//         className="bag-modal" 
//         onClick={(e) => e.stopPropagation()} 
//         style={{ 
//           width: "480px", 
//           maxWidth: "90%", 
//           background: "#fff", 
//           padding: "40px 30px", 
//           borderRadius: "16px", 
//           position: "relative",
//           textAlign: "center" 
//         }}
//       >
//         <button 
//           type="button" 
//           onClick={onClose} 
//           style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer" }}
//         >
//           <X size={20} />
//         </button>

//         <p style={{ fontSize: "16px", fontWeight: "500", color: "#111", marginBottom: "30px", lineHeight: "1.5" }}>
//           Are you sure you would like to remove this item from the shopping bag?
//         </p>

//         <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
//           <button 
//             type="button" 
//             onClick={handleConfirmYes}
//             style={{ 
//               flex: 1, 
//               background: "#fff", 
//               color: "#000", 
//               border: "1px solid #111", 
//               padding: "14px", 
//               fontWeight: "600", 
//               fontSize: "14px", 
//               borderRadius: "30px", 
//               cursor: "pointer" 
//             }}
//           >
//             YES
//           </button>
          
//           <button 
//             type="button" 
//             onClick={onClose}
//             style={{ 
//               flex: 1, 
//               background: "#222", 
//               color: "#fff", 
//               border: "none", 
//               padding: "14px", 
//               fontWeight: "600", 
//               fontSize: "14px", 
//               borderRadius: "30px", 
//               cursor: "pointer" 
//             }}
//           >
//             NO
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
import React from "react";
import { X } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function MoveToWishlistModal({ item, onClose }) {
  const { removeFromCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();

  if (!item) return null;

  const handleConfirmYes = () => {
    // Check if the item is already in the wishlist; if not, toggle/add it
    const isAlreadyInWishlist = wishlist.some((wItem) => wItem.id === item.id);
    if (!isAlreadyInWishlist) {
      toggleWishlist(item);
    }
    
    // Remove item from the cart bag
    removeFromCart(item.id, item.size);
    onClose();
  };

  return (
    <div className="bag-modal-overlay" onClick={onClose}>
      <div 
        className="bag-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          width: "480px", 
          maxWidth: "90%", 
          background: "#fff", 
          padding: "40px 30px", 
          borderRadius: "16px", 
          position: "relative",
          textAlign: "center" 
        }}
      >
        <button 
          type="button" 
          onClick={onClose} 
          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer" }}
        >
          <X size={20} />
        </button>

        <p style={{ fontSize: "16px", fontWeight: "500", color: "#111", marginBottom: "30px", lineHeight: "1.5" }}>
          Are you sure you would like to remove this item from the shopping bag?
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button 
            type="button" 
            onClick={handleConfirmYes}
            style={{ 
              flex: 1, 
              background: "#fff", 
              color: "#000", 
              border: "1px solid #111", 
              padding: "14px", 
              fontWeight: "600", 
              fontSize: "14px", 
              borderRadius: "30px", 
              cursor: "pointer" 
            }}
          >
            YES
          </button>
          
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              flex: 1, 
              background: "#222", 
              color: "#fff", 
              border: "none", 
              padding: "14px", 
              fontWeight: "600", 
              fontSize: "14px", 
              borderRadius: "30px", 
              cursor: "pointer" 
            }}
          >
            NO
          </button>
        </div>

      </div>
    </div>
  );
}