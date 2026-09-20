import React from 'react';

export default function SaleBanner({ onCategorySelect, activeBannerDiscount }) {
  const categories = [
    { id: 1, label: 'Just In: 50%', val: '50', img: 'https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dw297c7d42/images/Featured/0.0-0.0-0.0-0.0-0.0-0.01-5-26-Featured-Categories2.png' },
    { id: 2, label: 'Flat 30%', val: '30', img: 'https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dwc9dbe4d5/images/megamenu/0.00f5.png' },
    { id: 3, label: 'Flat 40%', val: '40', img: 'https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dwbaf2af9f/images/megamenu/0.00-fs4.png' },
    { id: 4, label: 'Flat 50%', val: '50', img: 'https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dw4adba02c/images/megamenu/0.00f8.png' },
    { id: 5, label: 'Flat 70%', val: '70', img: 'https://pk.khaadi.com/on/demandware.static/-/Sites-storefront-catalog-pak/default/dw6efde14f/images/megamenu/0.00f3.png' },
  ];

  const isActive = (cat) => {
    if (!activeBannerDiscount) return false;
    return cat.val === activeBannerDiscount;
  };

  return (
    <div className="sale-page-container">
      <nav className="breadcrumb-container" aria-label="Breadcrumb">
        <a href="/" className="breadcrumb-link">Home</a>
        <svg 
          className="breadcrumb-arrow" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span className="breadcrumb-current">Sale</span>
      </nav>

      <div className="full-width-banner">
        <img 
          src="https://pk.khaadi.com/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw2b39118a/images/plpbanners/0.0-0.0-0.0-0.0-JULYSALEPLP-Desktop-1390x380.jpg" 
          alt="Sale Banner" 
        />
      </div>

      <div className="padded-section">
        <div className="category-circles-container">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`circle-item ${isActive(cat) ? 'active' : ''}`}
              onClick={() => onCategorySelect && onCategorySelect(cat.label)}
            >
              <div className="image-wrapper">
                <img src={cat.img} alt={cat.label} />
              </div>
              <span className="category-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
