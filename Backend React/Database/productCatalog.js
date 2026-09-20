function pkr(n) {
  return `PKR ${Number(n).toLocaleString()}`;
}

function product(data) {
  const original = data.originalPrice || null;
  const priceNum = data.priceNum;
  const originalNum = data.originalNum || null;
  const discountPercent = originalNum
    ? Math.round(100 - (priceNum / originalNum) * 100)
    : data.discountPercent || null;

  return {
    id: data.id,
    category: data.category,
    title: data.title,
    subtitle: data.subtitle,
    price: pkr(priceNum),
    originalPrice: originalNum ? pkr(originalNum) : original,
    salePrice: originalNum ? pkr(priceNum) : undefined,
    oldPrice: originalNum ? pkr(originalNum) : undefined,
    discountPercent: discountPercent || undefined,
    discountTag: discountPercent ? `${discountPercent}% OFF` : undefined,
    discount: data.tag === 'New' ? 'New' : (discountPercent ? `${discountPercent}% OFF` : undefined),
    tag: data.tag,
    image: data.image,
    images: data.images || [data.image],
    collections: data.collections,
  };
}

const catalog = [
  product({
    id: 1, category: 'Embroidered | Lawn', title: 'Lawn Tailored 3-Piece', subtitle: 'Ready To Wear',
    priceNum: 12500, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6239dc00/images/hi-res/1-26-249-a-j2_multi_1.jpg?sw=800&sh=1200',
    images: [
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd529f8da/images/hi-res/1-26-249-a-j2_multi_2.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6239dc00/images/hi-res/1-26-249-a-j2_multi_1.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwc6d2988a/images/hi-res/1-26-249-a-j2_multi_4.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw68c5e81e/images/hi-res/1-26-249-a-j2_multi_7.jpg?sw=800&sh=1200',
    ],
  }),
  product({
    id: 2, category: 'Embroidered | Cambric', title: 'Tailored 2 Piece', subtitle: 'Ready To Wear',
    priceNum: 3250, originalNum: 6500, collections: ['home-top', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3484b1d4/images/hi-res/t-a11-26-215fd1_multi_1.jpg?sw=400&sh=600',
    images: [
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3484b1d4/images/hi-res/t-a11-26-215fd1_multi_1.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw047e745b/images/hi-res/t-a11-26-215fd1_multi_2.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2c81ffd7/images/hi-res/t-a11-26-215fd1_multi_3.jpg?sw=800&sh=1200',
      'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw038c9f21/images/hi-res/t-a11-26-215fd1_multi_5.jpg?sw=800&sh=1200',
    ],
  }),
  product({
    id: 3, category: 'Embroidered | Jacquard', title: 'Black Tailored 3-Piece', subtitle: 'Ready To Wear',
    priceNum: 6250, originalNum: 12500, collections: ['home-top', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2491a3f7/images/hi-res/1-26-322-a-b1_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 4, category: 'Embroidered | Messuri', title: 'Messuri Tailored 3-Piece', subtitle: 'Ready To Wear',
    priceNum: 7700, originalNum: 11000, collections: ['home-top', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwa90b2316/images/hi-res/8-26-301-a-d1_multi_2.jpg?sw=800&sh=1200',
  }),
  product({
    id: 5, category: 'Embroidered | Cotton Dobby', title: 'Cotton Dobby Kurta', subtitle: 'Ready To Wear',
    priceNum: 1650, originalNum: 5500, collections: ['home-top', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bd71ebc/images/hi-res/t-a11-26-112fe1_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 6, category: 'Printed | Lawn', title: 'Printed Lawn Suit', subtitle: 'Ready To Wear',
    priceNum: 4500, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwbba1c3bb/images/hi-res/5-26-201-e-d_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 7, category: 'Embroidered | Silk', title: 'Silk Embroidered Shirt', subtitle: 'Ready To Wear',
    priceNum: 8200, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw841246f9/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 8, category: 'Jacquard | Cotton', title: 'Jacquard Kurta Set', subtitle: 'Ready To Wear',
    priceNum: 5100, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw742443b5/images/hi-res/1-26-305-a-b2_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 9, category: 'Embroidered | Chiffon', title: 'Chiffon Dupatta Suit', subtitle: 'Ready To Wear',
    priceNum: 9500, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw82224b41/images/hi-res/1-26-305-a-j2_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 10, category: 'Basic | Cotton', title: 'Casual Solid Kurta', subtitle: 'Ready To Wear',
    priceNum: 2900, tag: 'New', collections: ['home-top', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0b29bd70/images/hi-res/5-26-201-f-a_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 101, category: 'Embroidered | Raw Silk', title: 'Black Co-ord Set', subtitle: 'Ready To Wear',
    priceNum: 12500, originalNum: 25000, collections: ['home-best', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd6fab7d3/images/hi-res/5-26-201-f-c_multi_7.jpg?sw=800&sh=1200',
  }),
  product({
    id: 102, category: 'Printed | Cambric', title: 'Short Floral Kurta', subtitle: 'Ready To Wear',
    priceNum: 3150, originalNum: 4500, collections: ['home-best', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf4b25f62/images/hi-res/1-26-315-a-b1_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 103, category: 'Printed | Cambric', title: 'Yellow Cambric Kurta', subtitle: 'Ready To Wear',
    priceNum: 3150, originalNum: 4500, collections: ['home-best', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2df44dbd/images/hi-res/1-26-315-c-b1_multi_3.jpg?sw=800&sh=1200',
  }),
  product({
    id: 104, category: 'Printed | Cambric', title: 'Printed Cambric Kurta', subtitle: 'Ready To Wear',
    priceNum: 2400, originalNum: 4000, collections: ['home-best', 'rtw', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdaecbc19/images/hi-res/1-26-313-a-a1_multi_1.jpg?sw=400&sh=600',
  }),
  product({
    id: 105, category: 'Printed | Raw Silk', title: 'Kurta', subtitle: 'Ready To Wear',
    priceNum: 3500, originalNum: 7000, collections: ['home-best', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw44945494/images/hi-res/5-26-201-e-b_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 106, category: 'Embroidered | Raw Silk', title: 'Black Co-ord Set', subtitle: 'Ready To Wear',
    priceNum: 7500, originalNum: 25000, collections: ['home-best', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw89b4d593/images/hi-res/25-09-11e7-09bby_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 107, category: 'Printed | Cambric', title: 'Short Floral Kurta', subtitle: 'Ready To Wear',
    priceNum: 1350, originalNum: 4500, collections: ['home-best', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdc694748/images/hi-res/1-26-319-b-a2_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 108, category: 'Printed | Cambric', title: 'Yellow Cambric Kurta', subtitle: 'Ready To Wear',
    priceNum: 2700, originalNum: 4500, collections: ['home-best', 'newin'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw309ebb82/images/hi-res/1-26-315-b-e1_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 109, category: 'Printed | Cambric', title: 'Printed Cambric Kurta', subtitle: 'Ready To Wear',
    priceNum: 2000, originalNum: 4000, collections: ['home-best', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwed51adb7/images/hi-res/25-09-11e7-09bbx_multi_1.jpg?sw=800&sh=1200',
  }),
  product({
    id: 110, category: 'Printed | Raw Silk', title: 'Kurta', subtitle: 'Ready To Wear',
    priceNum: 2100, originalNum: 7000, collections: ['home-best', 'rtw'],
    image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw68b035e6/images/hi-res/1-26-319-b-b1_multi_2.jpg?sw=800&sh=1200',
  }),
  product({ id: 201, category: 'Embroidered | Cotton Dobby', title: 'Cotton Dobby Kurta', subtitle: 'Sale', priceNum: 3000, originalNum: 6000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd9909f37/images/hi-res/t-a22-26-210fe2_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 202, category: 'Embroidered | Raw Silk', title: 'Short Black Kurta', subtitle: 'Sale', priceNum: 3500, originalNum: 7000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwcd0e615c/images/hi-res/t-a33-26-112ff1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 203, category: 'Embroidered | Arabic Lawn', title: 'Lawn Sleeveless Kurta', subtitle: 'Sale', priceNum: 2800, originalNum: 4000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw96957cb5/images/hi-res/1-26-106-a-c_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 204, category: 'Printed | Lawn', title: 'Floral Tailored 3-Piece', subtitle: 'Sale', priceNum: 7000, originalNum: 10000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdb22ff58/images/hi-res/t-a33-26-102ff_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 205, category: 'Embroidered | Cambric', title: 'Tailored 3-Piece Set', subtitle: 'Sale', priceNum: 6000, originalNum: 12000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwea10a196/images/hi-res/1-26-327-a-a1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 206, category: 'Embroidered | Textured Weave', title: 'Embroidered V-Neck Kurta', subtitle: 'Sale', priceNum: 3600, originalNum: 6000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6aa25d0b/images/hi-res/2-26-208-a-i1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 207, category: 'Embroidered | Raw Silk', title: 'Silk 2-Piece Tailored', subtitle: 'Sale', priceNum: 3000, originalNum: 10000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw355b79e5/images/hi-res/2-26-201-a-e_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 208, category: 'Embroidered | Cotton Dobby', title: 'Solid Stitched Kurta', subtitle: 'Sale', priceNum: 2500, originalNum: 5000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwee179446/images/hi-res/1-26-205-a-i1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 209, category: 'Printed | Lawn', title: 'Casual Printed Kurta', subtitle: 'Sale', priceNum: 1350, originalNum: 4500, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3cc83aa8/images/hi-res/25-09-10e4-10ta_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 210, category: 'Embroidered | Jacquard', title: 'Festive Jacquard Suite', subtitle: 'Sale', priceNum: 7000, originalNum: 14000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf8142c55/images/hi-res/t-a22-26-207ef2_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 211, category: 'Embroidered | Cambric', title: 'Classic Cambric Shirt', subtitle: 'Sale', priceNum: 3850, originalNum: 5500, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw89c4a939/images/hi-res/1-26-236-a-a1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 212, category: 'Embroidered | Arabic Lawn', title: 'Printed Summer Kurta', subtitle: 'Sale', priceNum: 2880, originalNum: 4800, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd1f2f6d7/images/hi-res/8-26-203-a-c1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 213, category: 'Printed | Lawn', title: 'Pastel Tailored 3-Piece', subtitle: 'Sale', priceNum: 4500, originalNum: 9000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw692a3a0d/images/hi-res/2-26-203-a-g1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 214, category: 'Embroidered | Raw Silk', title: 'Formal Silk Tunic', subtitle: 'Sale', priceNum: 3300, originalNum: 11000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwb3b6e546/images/hi-res/8-26-203-a-a1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 215, category: 'Embroidered | Cotton Dobby', title: 'Textured Dobby Shirt', subtitle: 'Sale', priceNum: 3250, originalNum: 6500, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwab86e137/images/hi-res/2-26-208-a-b1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 216, category: 'Embroidered | Chiffon', title: 'Chiffon Dupatta Suite', subtitle: 'Sale', priceNum: 3900, originalNum: 13000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw04e5b5a2/images/hi-res/8-26-210-a-b1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 217, category: 'Printed | Lawn', title: 'Daily Wear Lawn Kurta', subtitle: 'Sale', priceNum: 2280, originalNum: 3800, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdb335061/images/hi-res/2-26-208-a-g1_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 218, category: 'Embroidered | Cambric', title: 'Embroidered Kurta Set', subtitle: 'Sale', priceNum: 5600, originalNum: 8000, collections: ['sale'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwca2ad635/images/hi-res/1-26-131-a-h_multi_2.jpg?sw=400&sh=600' }),
  product({ id: 301, category: 'Unstitched | Lawn', title: 'Printed Lawn 3-Piece', subtitle: 'Fabrics', priceNum: 4500, tag: 'New', collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwbba1c3bb/images/hi-res/5-26-201-e-d_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 302, category: 'Unstitched | Cambric', title: 'Embroidered Cambric Suit', subtitle: 'Fabrics', priceNum: 6200, collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdaecbc19/images/hi-res/1-26-313-a-a1_multi_1.jpg?sw=400&sh=600' }),
  product({ id: 303, category: 'Unstitched | Cotton', title: 'Cotton Dobby Fabric', subtitle: 'Fabrics', priceNum: 3800, tag: 'New', collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bd71ebc/images/hi-res/t-a11-26-112fe1_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 304, category: 'Unstitched | Jacquard', title: 'Jacquard 3-Piece Fabric', subtitle: 'Fabrics', priceNum: 8900, collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw2491a3f7/images/hi-res/1-26-322-a-b1_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 305, category: 'Unstitched | Lawn', title: 'Floral Lawn Collection', subtitle: 'Fabrics', priceNum: 4100, tag: 'New', collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf4b25f62/images/hi-res/1-26-315-a-b1_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 306, category: 'Unstitched | Raw Silk', title: 'Raw Silk Unstitched', subtitle: 'Fabrics', priceNum: 11200, collections: ['fabrics'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd6fab7d3/images/hi-res/5-26-201-f-c_multi_7.jpg?sw=800&sh=1200' }),
  product({ id: 401, category: 'Fragrance | Eau de Parfum', title: 'Rose Oud', subtitle: 'Fragrances', priceNum: 4500, tag: 'New', collections: ['fragrances'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw841246f9/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 402, category: 'Fragrance | Eau de Toilette', title: 'Citrus Bloom', subtitle: 'Fragrances', priceNum: 3200, collections: ['fragrances'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw742443b5/images/hi-res/1-26-305-a-b2_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 403, category: 'Fragrance | Eau de Parfum', title: 'Amber Musk', subtitle: 'Fragrances', priceNum: 5100, tag: 'New', collections: ['fragrances'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0b29bd70/images/hi-res/5-26-201-f-a_multi_1.jpg?sw=800&sh=1200' }),
  product({ id: 404, category: 'Fragrance | Body Mist', title: 'Jasmine Veil', subtitle: 'Fragrances', priceNum: 1800, collections: ['fragrances'], image: 'https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw44945494/images/hi-res/5-26-201-e-b_multi_1.jpg?sw=800&sh=1200' }),
];

module.exports = catalog;
