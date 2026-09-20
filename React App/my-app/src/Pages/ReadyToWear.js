import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductBundleDetail from "../Components/Product/ProductBundleDetail";
import { Heart, ChevronUp, ChevronDown } from "lucide-react";
import { useWishlist } from "../Components/Common/WishlistContext";
import { useCart } from "../Components/Common/CartContext";
import { api } from "../api/client";
import { parsePrice } from "../utils/productUtils";

const customGalleries = {
    "1": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd529f8da/images/hi-res/1-26-249-a-j2_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6239dc00/images/hi-res/1-26-249-a-j2_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwc6d2988a/images/hi-res/1-26-249-a-j2_multi_4.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw68c5e81e/images/hi-res/1-26-249-a-j2_multi_7.jpg?sw=800&amp;sh=1200"
    ],
    "2": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3484b1d4/images/hi-res/t-a11-26-215fd1_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw047e745b/images/hi-res/t-a11-26-215fd1_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2c81ffd7/images/hi-res/t-a11-26-215fd1_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw038c9f21/images/hi-res/t-a11-26-215fd1_multi_5.jpg?sw=800&amp;sh=1200"
    ],
    "3": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2491a3f7/images/hi-res/1-26-322-a-b1_multi_1.jpg?sw=800&sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwed262b83/images/hi-res/1-26-322-b-b1_multi_1.jpg?sw=800&sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw279f34c9/images/hi-res/1-26-322-a-b1_multi_4.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw279f34c9/images/hi-res/1-26-322-a-b1_multi_4.jpg?sw=800&amp;sh=1200"
    ],
    "4": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwa90b2316/images/hi-res/8-26-301-a-d1_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dweb97f6de/images/hi-res/8-26-301-a-d1_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwc7cb2b24/images/hi-res/8-26-301-a-d1_multi_4.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw46a6092d/images/hi-res/8-26-301-a-d1_multi_6.jpg?sw=800&amp;sh=1200"
    ],
    "5": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bd71ebc/images/hi-res/t-a11-26-112fe1_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw74848f55/images/hi-res/t-a11-26-112fe1_multi_6.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwebb032df/images/hi-res/t-a11-26-112fe1_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwa41a08d4/images/hi-res/t-a11-26-112fe1_multi_7.jpg?sw=800&amp;sh=1200"
    ],
    "6": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwbba1c3bb/images/hi-res/5-26-201-e-d_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2642e4e7/images/hi-res/5-26-201-e-d_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw12141abd/images/hi-res/5-26-201-e-d_multi_6.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4044c560/images/hi-res/5-26-201-e-d_multi_4.jpg?sw=800&amp;sh=1200"
    ],
    "7": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw841246f9/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf2e6cdf4/images/hi-res/5-26-201-f-h_multi_7.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0bb50d97/images/hi-res/5-26-201-f-h_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw9b21e294/images/hi-res/5-26-201-f-h_multi_5.jpg?sw=800&amp;sh=1200"
    ],
    "8": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2bc7286f/images/hi-res/1-26-305-a-b2_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw742443b5/images/hi-res/1-26-305-a-b2_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw429a9fba/images/hi-res/1-26-305-a-b2_multi_5.jpg?sw=800&amp;sh=1200", 
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw290ab36d/images/hi-res/1-26-305-a-b2_multi_7.jpg?sw=800&amp;sh=1200"
    ],
    "9": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3f8101e4/images/hi-res/1-26-305-a-j2_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7746d3c0/images/hi-res/1-26-305-a-j2_multi_7.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2bc7286f/images/hi-res/1-26-305-a-b2_multi_2.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw34829d79/images/hi-res/1-26-305-a-j2_multi_4.jpg?sw=800&amp;sh=1200"
    ],
    "10": [
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw935cc863/images/hi-res/5-26-201-f-a_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0b29bd70/images/hi-res/5-26-201-f-a_multi_1.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw935cc863/images/hi-res/5-26-201-f-a_multi_3.jpg?sw=800&amp;sh=1200",
      "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw95cfdd9c/images/hi-res/5-26-201-f-a_multi_10.jpg?sw=800&amp;sh=1200"
    ]
};

function ReadyToWear() {
  const { id } = useParams();
  const location = useLocation();
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const clickedProduct = location.state?.product || fetchedProduct;
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!location.state?.product && id) {
      api.getProduct(id).then(setFetchedProduct).catch(() => setFetchedProduct(null));
    }
  }, [id, location.state?.product]);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });
  const [sizeError, setSizeError] = useState("");

  const bundleSectionRef = useRef(null);
  
  const defaultImage = clickedProduct 
    ? clickedProduct.image 
    : "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdaecbc19/images/hi-res/1-26-313-a-a1_multi_1.jpg?sw=400&sh=600";

  const galleryImages = useMemo(() => {
    if (clickedProduct?.images?.length) return clickedProduct.images;
    return customGalleries[id] || [
      defaultImage,
      defaultImage,
      defaultImage,
      defaultImage
    ];
  }, [id, defaultImage, clickedProduct]);

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [galleryImages]);

  const currentBundle = {
    id: id || "1",
    title: clickedProduct ? clickedProduct.title : "Cotton Longline Kurta",
    subtitle: clickedProduct ? clickedProduct.subtitle : "Ready To Wear",
    price: clickedProduct ? clickedProduct.price : "PKR 3,250",
    image: selectedImage,
    items: [
      { 
        id: 1, 
        title: clickedProduct ? clickedProduct.title : "Cotton Longline Kurta", 
        sku: `8-26-${id || "301"}-A-D1`,
        price: clickedProduct ? parsePrice(clickedProduct.price) : 3250, 
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: galleryImages[0] 
      },
      { 
        id: 2, 
        title: "Matching Cambric Pants", 
        sku: `1-26-${id || "313"}-B-A1`, 
        price: 4000, 
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: galleryImages[1] 
      },
      { 
        id: 3, 
        title: "Coordinated Dupatta", 
        sku: `1-26-${id || "313"}-C-A1`, 
        price: 3500, 
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: galleryImages[2] 
      }
    ]
  };

  const currentBundleTitle = currentBundle?.title;

useEffect(() => {
  if (currentBundleTitle) {
    document.title = `${currentBundleTitle} | Ready To Wear`;
  }
}, [currentBundleTitle]);

  const handleSizeSelect = (itemId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
    setSizeError(""); 
  };

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      const updated = current + delta;
      return { ...prev, [itemId]: updated > 0 ? updated : 1 };
    });
  };

  const handleAddToCart = () => {
    const selectedItemsList = currentBundle.items.filter(item => selectedSizes[item.id]);

    if (selectedItemsList.length === 0) {
      setSizeError("Please select a size for at least one item to add to bag.");
      if (bundleSectionRef.current) {
        bundleSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setSizeError("");

    selectedItemsList.forEach((item) => {
      const qty = quantities[item.id] || 1;
      const size = selectedSizes[item.id];

      for (let i = 0; i < qty; i++) {
        addToCart({
          id: `${id}-${item.id}`,
          title: item.title,
          subtitle: currentBundle.subtitle,
          price: item.price,
          sku: item.sku,
          image: item.image,
          size: size,
        });
      }
    });

  };

  return (
    <div className="rtw-container">
      <nav className="rtw-breadcrumb">
        <span>Home</span> / <span>Collection</span> / <span className="current">{currentBundle.title}</span>
      </nav>

      <div className="rtw-grid">
        <div className="rtw-gallery-section">
          <div className="rtw-thumbnails">
            <button className="rtw-scroll-btn"><ChevronUp size={18} /></button>
            <div className="rtw-thumb-list">
              {galleryImages.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`thumb-${index}`} 
                  className={`rtw-thumb ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <button className="rtw-scroll-btn" style={{ borderRadius: "50px" }}><ChevronDown size={18} /></button>
          </div>

          <div className="rtw-main-image-box">
            <img src={currentBundle.image} alt={currentBundle.title} className="rtw-main-img" />
            <button
              className="rtw-heart-btn"
              onClick={() => toggleWishlist({
                id: Number(id),
                title: currentBundle.title,
                subtitle: currentBundle.subtitle,
                price: currentBundle.price,
                image: galleryImages[0]
              })}
            >
              <Heart
                size={20}
                fill={wishlist.some((w) => w.id === Number(id)) ? "#e53e3e" : "none"}
                stroke={wishlist.some((w) => w.id === Number(id)) ? "#e53e3e" : "currentColor"}
              />
            </button>
          </div>
        </div>

        <div className="rtw-sidebar">
          <div className="rtw-product-header">
            <p className="rtw-subtitle">{currentBundle.subtitle}</p>
            <h1 className="rtw-title">{currentBundle.title}</h1>
            <p className="rtw-price">{currentBundle.price}</p>
            <p className="rtw-sku">SKU: 1-26-{id || "313"}-A-A1</p>
          </div>

          <button 
            className="rtw-add-bag-btn" 
            style={{ borderRadius: "50px" }}
            onClick={handleAddToCart}
          >
            Add to Bag
          </button>

          {sizeError && (
            <p className="rtw-size-error" style={{ color: "#e53e3e", fontSize: "14px", fontWeight: "600", marginTop: "10px" }}>
              {sizeError}
            </p>
          )}

          <div className="rtw-bundle-box" style={{ marginTop: "15px" }}>
            <ProductBundleDetail 
              bundleData={currentBundle} 
              selectedSizes={selectedSizes}
              onSizeSelect={handleSizeSelect}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
              bundleSectionRef={bundleSectionRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadyToWear;
