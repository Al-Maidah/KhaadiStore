import React from "react";
import { X } from "lucide-react";

function SizeGuide({ isOpen, onClose, productName }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "600px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        position: "relative"
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          <X size={20} color="#000" />
        </button>

        {/* Title & Subtitle */}
        <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", fontWeight: "700", letterSpacing: "1px" }}>SIZE GUIDE</h3>
        <p style={{ margin: "0 0 20px 0", fontSize: "14px", fontWeight: "600", color: "#333" }}>
          {productName ? productName.toUpperCase() : "KURTA"}
        </p>

        {/* Size Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "#222", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #444" }}>SIZE</th>
              <th style={{ padding: "10px", border: "1px solid #444" }}>LENGTH</th>
              <th style={{ padding: "10px", border: "1px solid #444" }}>SHOULDER</th>
              <th style={{ padding: "10px", border: "1px solid #444" }}>CHEST</th>
              <th style={{ padding: "10px", border: "1px solid #444" }}>SLEEVE LENGTH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>8 / XS</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>44</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>13.5</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>18</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>21</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>10 / S</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>46</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>14</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>19</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>22</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>12 / M</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>46</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>14.5</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>20</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>22</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>14 / L</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>46</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>15</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>22</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>23</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>16 / XL</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>46</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>16</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>24</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SizeGuide;