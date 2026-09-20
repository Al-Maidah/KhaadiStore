import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../Components/Common/WishlistContext';
import ProductBagButton from '../Components/Cart/ProductBagButton';
import FilterBar from '../Components/Sales/FilterBar';
import { api } from '../api/client';
import { parsePrice } from '../utils/productUtils';

export default function NewIn() {
  const [columns, setColumns] = useState(4);
  const [sortBy, setSortBy] = useState('recommended');
  const [newInProducts, setNewInProducts] = useState([]);
  const { wishlist, toggleWishlist, toastMessage } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "New Arrivals | Latest Collection";
    api.getProducts("newin").then(setNewInProducts).catch(() => setNewInProducts([]));
  }, []);

  const sorted = useMemo(() => {
    let items = [...newInProducts];
    switch (sortBy) {
      case 'low-high': items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
      case 'high-low': items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
      case 'newest': items.sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return items;
  }, [newInProducts, sortBy]);

  return (
    <div className="sale-page">
      <div className="sale-page-container">
        <nav className="breadcrumb-container" aria-label="Breadcrumb">
          <a href="/" className="breadcrumb-link">Home</a>
          <svg className="breadcrumb-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span className="breadcrumb-current">New In</span>
        </nav>

        <div className="full-width-banner" style={{ background: '#f5f0eb', textAlign: 'center', padding: '60px 20px' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 300, letterSpacing: '6px', textTransform: 'uppercase', margin: 0, color: '#222' }}>New Arrivals</h1>
          <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '12px', letterSpacing: '1px' }}>Explore the latest additions to our collection</p>
        </div>
      </div>

      <FilterBar
        itemCount={sorted.length}
        onViewChange={(cols) => setColumns(cols)}
        onSortChange={(val) => setSortBy(val)}
      />

      <div className="discount-grid-wrapper">
        {toastMessage && (
          <div className="wishlist-toast">
            <span>{toastMessage}</span>
            <a href="/wishlist" className="toast-view-link">View</a>
          </div>
        )}

        <div className="discount-grid-container" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {sorted.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="product-card cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" />

                  <span className="new-arrival-tag">NEW</span>

                  <button
                    className={`wishlist-circle-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                    aria-label="Add to Wishlist"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#222' : 'none'} stroke="#222" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <ProductBagButton product={product} />
                </div>

                <div className="product-details">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price-wrapper">
                    <span className="sale-price">{product.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
