import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../Common/WishlistContext';
import ProductBagButton from '../Cart/ProductBagButton';
import { api } from '../../api/client';
import { parsePrice } from '../../utils/productUtils';

export default function DiscountGrid({ columns = 4, filterDiscount = [], sortBy = 'recommended', bannerDiscount = null, onCountChange }) {
  const { wishlist, toggleWishlist, toastMessage } = useWishlist();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    api.getProducts("sale").then(setProductsData).catch(() => setProductsData([]));
  }, []);

  const filteredAndSorted = useMemo(() => {
    let items = [...productsData];

    const activeFilter = bannerDiscount || (filterDiscount.length === 1 ? filterDiscount[0] : null);
    if (activeFilter) {
      items = items.filter((p) => p.discountPercent === Number(activeFilter));
    }

    switch (sortBy) {
      case 'low-high':
        items.sort((a, b) => parsePrice(a.salePrice || a.price) - parsePrice(b.salePrice || b.price));
        break;
      case 'high-low':
        items.sort((a, b) => parsePrice(b.salePrice || b.price) - parsePrice(a.salePrice || a.price));
        break;
      case 'newest':
        items.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return items;
  }, [productsData, filterDiscount, sortBy, bannerDiscount]);

  useEffect(() => {
    if (onCountChange) onCountChange(filteredAndSorted.length);
  }, [filteredAndSorted.length, onCountChange]);

  return (
    <div className="discount-grid-wrapper">
      {toastMessage && (
        <div className="wishlist-toast">
          <span>{toastMessage}</span>
          <a href="/wishlist" className="toast-view-link">View</a>
        </div>
      )}

      <div
        className="discount-grid-container"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {filteredAndSorted.map((product) => {
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
                  <span className="original-price">{product.originalPrice}</span>
                  <span className="sale-price">{product.salePrice || product.price}</span>
                </div>

                <div className="discount-pill-badge">
                  {product.discountTag}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
