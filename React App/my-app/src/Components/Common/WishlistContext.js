import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { api } from "../../api/client";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, setUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const skipSync = useRef(false);

  useEffect(() => {
    if (user?.wishlist) {
      skipSync.current = true;
      setWishlist(user.wishlist);
    } else if (!user) {
      skipSync.current = true;
      setWishlist([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || skipSync.current) {
      skipSync.current = false;
      return;
    }
    api.saveWishlist(user.id, wishlist)
      .then((updated) => setUser({ ...user, wishlist: updated.wishlist }))
      .catch(() => {});
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.some((item) => item.id === product.id);
      if (isExist) {
        return prev.filter((item) => item.id !== product.id);
      }
      setToastMessage("Item has been added to your wishlist!");
      setTimeout(() => setToastMessage(null), 3000);
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, toastMessage, setToastMessage }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
