import React, { useEffect, useState } from 'react';
import Hero from "../Components/Home/HeroSlider";
import ProductSlider from "../Components/Home/ProductSlider";
import TopPicksBanner from "../Components/Home/TopPicksBanner";
import BestsellersSection from "../Components/Home/BestsellersSection";
import { api } from "../api/client";

export default function Home() {
  const [topPicksProducts, setTopPicksProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);

  useEffect(() => {
    document.title = "Khaadi PK Online | Women Clothing | New Arrivals Every Week";
    api.getProducts("home-top").then(setTopPicksProducts).catch(() => setTopPicksProducts([]));
    api.getProducts("home-best").then(setBestsellerProducts).catch(() => setBestsellerProducts([]));
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <TopPicksBanner />
      <ProductSlider products={topPicksProducts} />
      <BestsellersSection />
      <ProductSlider products={bestsellerProducts} />
    </div>
  );
}
