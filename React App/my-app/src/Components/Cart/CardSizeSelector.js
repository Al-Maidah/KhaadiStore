import React from "react";
import { DEFAULT_SIZES } from "../../utils/productUtils";

export default function CardSizeSelector({ sizes = DEFAULT_SIZES, onSelect, onClose }) {
  return (
    <div
      className="card-size-selector"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="card-size-selector-inner">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className="card-size-btn"
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
