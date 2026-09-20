import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Common/WishlistContext";
import ProductBagButton from "../Cart/ProductBagButton";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductSlider({ products = [] }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="product-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={5}
        spaceBetween={15}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 5 }
        }}
        className="product-swiper"
      >
        {products.map((item) => {
          const isWishlisted = wishlist.some((w) => w.id === item.id);

          return (
            <SwiperSlide key={item.id}>
              <div 
                className="product-card cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
              >
                <div className="product-img-wrapper">
                  <img src={item.image} alt={item.title} className="product-img" />
                  
                  {item.discount && (
                    <span className={`product-tag ${item.discount === 'New' ? 'tag-new' : 'tag-sale'}`}>
                      {item.discount}
                    </span>
                  )}

                  <button 
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    aria-label="Wishlist"
                  >
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill={isWishlisted ? "#222" : "none"} 
                      stroke="#222" 
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <ProductBagButton
                    product={item}
                    className="add-cart-btn"
                  />
                </div>

                <div className="product-info">
                  <p className="product-subtitle">{item.subtitle}</p>
                  <h3 className="product-title">{item.title}</h3>
                  <div className="product-price-row">
                    {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                    <span className="current-price">{item.price}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
