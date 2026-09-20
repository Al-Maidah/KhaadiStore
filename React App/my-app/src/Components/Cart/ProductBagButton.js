import React, { useState } from "react";
import CardSizeSelector from "./CardSizeSelector";
import { useCart } from "../Common/CartContext";
import { DEFAULT_SIZES } from "../../utils/productUtils";

export default function ProductBagButton({
  product,
  className = "add-to-cart-btn",
  sizes = DEFAULT_SIZES,
  showLabel = true,
}) {
  const { addToCart } = useCart();
  const [showSizes, setShowSizes] = useState(false);

  const handleBagClick = (e) => {
    e.stopPropagation();
    setShowSizes(true);
  };

  const handleSizeSelect = (size) => {
    addToCart({ ...product, size });
    setShowSizes(false);
  };

  return (
    <>
      {showSizes && (
        <CardSizeSelector
          sizes={sizes}
          onSelect={handleSizeSelect}
          onClose={() => setShowSizes(false)}
        />
      )}

      <button
        type="button"
        className={className}
        aria-label="Add to Bag"
        onClick={handleBagClick}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {showLabel && <span>ADD</span>}
      </button>
    </>
  );
}
