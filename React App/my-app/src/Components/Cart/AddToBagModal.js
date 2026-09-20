import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function AddToBagModal({ product, onClose }) {
  const navigate = useNavigate();

  if (!product) return null;

  const handleContinue = () => {
    onClose();
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="bag-modal-overlay" onClick={onClose}>
      <div className="bag-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="bag-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="bag-modal-body">
          <div className="bag-modal-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="bag-modal-content">
            <h2 className="bag-modal-title">{product.title.toUpperCase()}</h2>
            <p className="bag-modal-message">successfully added to your shopping bag!</p>

            <button type="button" className="bag-modal-btn bag-modal-btn-outline" onClick={handleContinue}>
              CONTINUE SHOPPING
            </button>
            <button type="button" className="bag-modal-btn bag-modal-btn-primary" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
