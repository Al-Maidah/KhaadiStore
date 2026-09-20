
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import { AuthProvider } from "./Components/Common/AuthContext";
import { WishlistProvider } from "./Components/Common/WishlistContext";
import { CartProvider } from "./Components/Common/CartContext";
import CartDrawer from "./Components/Common/CartDrawer";

import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import Fabrics from "./Pages/Fabrics";
import Fragrances from "./Pages/Fragrances";
import NewIn from "./Pages/NewIn";
import NowHappening from "./Pages/NowHappening";
import ReadyToWear from "./Pages/ReadyToWear";
import ReadyToWearListing from "./Pages/ReadyToWearListing";
import Sale from "./Pages/Sale";
import Wishlist from "./Pages/Wishlist";
import MyAccountPage from './Pages/Account';
import Checkout from './Pages/Checkout';
import TrackOrder from './Pages/TrackOrder';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <NavigationBar />
        <CartDrawer /> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/product/:id" element={<ReadyToWear />} />
          <Route path="/readytowear" element={<ReadyToWearListing />} />
          <Route path="/fabrics" element={<Fabrics />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/newin" element={<NewIn />} />
          <Route path="/nowhappening" element={<NowHappening />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          {/* 2. Replace MyAccountPage with AccountWrapper here */}
          <Route path="/account" element={<MyAccountPage />} />
          
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/ReadyToWear" element={<ReadyToWearListing />} />
        </Routes>

        <Footer />
      </WishlistProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;