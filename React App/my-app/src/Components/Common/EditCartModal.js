import React, { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "./CartContext";

export default function EditCartModal({ item, onClose }) {
  const { updateCartItem } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(item?.size || "M");
  const [quantity, setQuantity] = useState(item?.qty || 1);

  if (!item) return null;

  const handleUpdate = () => {
    updateCartItem(item, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="bag-modal-overlay" onClick={onClose}>
      <div className="bag-modal" onClick={(e) => e.stopPropagation()} style={{ width: "500px", maxWidth: "90%", background: "#fff", padding: "30px", borderRadius: "8px", position: "relative" }}>
        
        <button type="button" className="bag-modal-close" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer" }}>
          <X size={20} />
        </button>

        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{item.category || "Embroidered | Viscose Crepe"}</div>
        <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 10px 0" }}>{item.title}</h2>
        <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>PKR {item.price.toLocaleString()}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Size</span>
          <span style={{ fontSize: "13px", color: "#2e7d32" }}>In Stock</span>
        </div>

        {/* Size Selection Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          {["S", "M", "L"].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              style={{
                width: "45px",
                height: "45px",
                border: selectedSize === sz ? "2px solid #000" : "1px solid #ddd",
                background: selectedSize === sz ? "#000" : "#fff",
                color: selectedSize === sz ? "#fff" : "#000",
                fontWeight: "500",
                cursor: "pointer",
                borderRadius: "4px"
              }}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Quantity Controls */}
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", width: "fit-content", marginBottom: "25px", background: "#f9f9f9" }}>
          <button 
            type="button" 
            style={{ background: "none", border: "none", padding: "10px 14px", cursor: "pointer" }}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus size={14} />
          </button>
          <span style={{ padding: "0 10px", fontSize: "14px", fontWeight: "500" }}>{quantity}</span>
          <button 
            type="button" 
            style={{ background: "none", border: "none", padding: "10px 14px", cursor: "pointer" }}
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus size={14} />
          </button>
        </div>

        <button 
          type="button" 
          onClick={handleUpdate}
          style={{ width: "100%", background: "#222", color: "#fff", border: "none", padding: "15px", fontWeight: "600", fontSize: "14px", borderRadius: "30px", cursor: "pointer" }}
        >
          UPDATE
        </button>

      </div>
    </div>
  );
}