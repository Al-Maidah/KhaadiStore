import React, { useState, useRef, useEffect } from 'react';


export default function FilterBar({ itemCount = 1120, onViewChange, onFilterChange, onSortChange }) {
  const [activeColumns, setActiveColumns] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(true);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedSort, setSelectedSort] = useState('recommended');

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGridChange = (cols) => {
    setActiveColumns(cols);
    if (onViewChange) onViewChange(cols);
  };

  // Single-checkbox selection logic
  const toggleDiscount = (val) => {
    const updated = selectedDiscounts.includes(val) ? [] : [val];
    setSelectedDiscounts(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSelectedSort(val);
    if (onSortChange) onSortChange(val);
  };

  return (
    <div className="filter-bar-container">
      {/* Left side: Controls */}
      <div className="dropdown-group">
        {/* Custom Filter Popover */}
        <div className="custom-filter-wrapper" ref={filterRef}>
          <button
            className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`}
            onClick={() => setIsFilterOpen((prev) => !prev)}
            type="button"
          >
            <span>Filter by</span>
            <svg
              className={`dropdown-arrow-icon ${isFilterOpen ? 'rotate' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Filter Popover Content */}
          {isFilterOpen && (
            <div className="filter-popover">
              <div className="filter-accordion">
                <button
                  className="accordion-header"
                  onClick={() => setDiscountOpen(!discountOpen)}
                  type="button"
                >
                  <span className="accordion-title">Discount</span>
                  <svg
                    className={`accordion-chevron ${discountOpen ? 'expanded' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>

                {discountOpen && (
                  <div className="accordion-content">
                    {[
                      { label: '50% Off', count: 738, val: '50' },
                      { label: '70% Off', count: 203, val: '70' },
                      { label: '30% Off', count: 113, val: '30' },
                      { label: '40% Off', count: 29, val: '40' },
                    ].map((item) => (
                      <label key={item.val} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedDiscounts.includes(item.val)}
                          onChange={() => toggleDiscount(item.val)}
                        />
                        <span className="custom-checkbox"></span>
                        <span className="checkbox-label">
                          {item.label} <span className="item-qty">({item.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sort Select */}
        <div className="select-wrapper">
          <select
            value={selectedSort}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Arrivals</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <span className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* Item Counter */}
        <div className="item-counter">
          <span>{itemCount.toLocaleString()}</span> items
        </div>
      </div>

      {/* Right side: Grid Controls */}
      <div className="grid-view-toggles">
        <button
          className={`grid-btn ${activeColumns === 1 ? 'active' : ''}`}
          onClick={() => handleGridChange(1)}
          aria-label="1 column view"
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="16" height="20" rx="2" />
          </svg>
        </button>

        <button
          className={`grid-btn ${activeColumns === 2 ? 'active' : ''}`}
          onClick={() => handleGridChange(2)}
          aria-label="2 column view"
        >
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="7" height="20" rx="2" />
            <rect x="12" y="1" width="7" height="20" rx="2" />
          </svg>
        </button>

        <button
          className={`grid-btn ${activeColumns === 3 ? 'active' : ''}`}
          onClick={() => handleGridChange(3)}
          aria-label="3 column view"
        >
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="5" height="20" rx="1.5" />
            <rect x="9.5" y="1" width="5" height="20" rx="1.5" />
            <rect x="18" y="1" width="5" height="20" rx="1.5" />
          </svg>
        </button>

        <button
          className={`grid-btn ${activeColumns === 4 ? 'active' : ''}`}
          onClick={() => handleGridChange(4)}
          aria-label="4 column grid view"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="8" height="8" rx="2" />
            <rect x="13" y="1" width="8" height="8" rx="2" />
            <rect x="1" y="13" width="8" height="8" rx="2" />
            <rect x="13" y="13" width="8" height="8" rx="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}