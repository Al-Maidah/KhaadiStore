import React, { useState, useEffect } from 'react';
import SaleBanner from '../Components/Sales/SaleBanner';
import FilterBar from '../Components/Sales/FilterBar';
import DiscountGrid from '../Components/Sales/DiscountGrid';

export default function Sale() {
  const [columns, setColumns] = useState(4);
  const [filterDiscount, setFilterDiscount] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [bannerDiscount, setBannerDiscount] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
  document.title = "Sale | Special Offers";
}, []);

  const handleBannerSelect = (label) => {
    const map = {
      'Just In: 50%': '50',
      'Flat 30%': '30',
      'Flat 40%': '40',
      'Flat 50%': '50',
      'Flat 70%': '70',
    };
    const val = map[label] || null;
    setBannerDiscount((prev) => (prev === val ? null : val));
    setFilterDiscount([]);
  };

  const handleFilterChange = (discounts) => {
    setFilterDiscount(discounts);
    setBannerDiscount(null);
  };

  return (
    <div className="sale-page">
      <SaleBanner onCategorySelect={handleBannerSelect} activeBannerDiscount={bannerDiscount} />
      <FilterBar 
        itemCount={itemCount} 
        onViewChange={(newCols) => setColumns(newCols)}
        onFilterChange={handleFilterChange}
        onSortChange={(val) => setSortBy(val)}
      />
      <DiscountGrid
        columns={columns}
        filterDiscount={filterDiscount}
        sortBy={sortBy}
        bannerDiscount={bannerDiscount}
        onCountChange={setItemCount}
      />
    </div>
  );
}
