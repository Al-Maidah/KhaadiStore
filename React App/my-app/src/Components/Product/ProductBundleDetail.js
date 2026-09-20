import React from "react";

function ProductBundleDetail({ bundleData, selectedSizes, onSizeSelect, quantities, onQuantityChange, bundleSectionRef }) {
  return (
    <div className="bundle-detail-container" ref={bundleSectionRef}>
      {bundleData.items.map((item, index) => (
        <div key={item.id || index} className="bundle-item-row" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "20px", marginBottom: "20px" }}>
          
          {/* Top section: Image, Title, SKU, Price */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "15px" }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: "80px", height: "110px", objectFit: "cover", border: "1px solid #ddd" }} 
            />
            <div>
              <h4 style={{ margin: "0 0 5px 0", fontSize: "14px", fontWeight: "600" }}>{item.title}</h4>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>SKU: {item.sku}</p>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>PKR {item.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Bottom section: Quantity and Size Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "15px" }}>
            
            {/* Quantity Selector */}
            <div>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Quantity</p>
              <div className="rtw-qty-container">
                <button 
                  type="button"
                  onClick={() => onQuantityChange(item.id, -1)}
                  className="rtw-qty-btn-minus"
                >
                  -
                </button>
                <span className="rtw-qty-value">
                  {quantities[item.id] || 1}
                </span>
                <button 
                  type="button"
                  onClick={() => onQuantityChange(item.id, 1)}
                  className="rtw-qty-btn-plus"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selector Buttons */}
            {item.sizes && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>Size</span>
                  <span style={{ fontSize: "12px", color: "#666", textDecoration: "underline", cursor: "pointer" }}>Size Guide</span>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {item.sizes.map((size) => {
                    const isSelected = selectedSizes[item.id] === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onSizeSelect(item.id, size)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          fontWeight: "500",
                          border: isSelected ? "1px solid #000" : "1px solid #ccc",
                          backgroundColor: isSelected ? "#000" : "#fff",
                          color: isSelected ? "#fff" : "#000",
                          cursor: "pointer",
                          borderRadius: "60px",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductBundleDetail;