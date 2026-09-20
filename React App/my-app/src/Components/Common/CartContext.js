import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import AddToBagModal from "../Cart/AddToBagModal";
import { useAuth } from "./AuthContext";
import { api } from "../../api/client";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, setUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [addedProductModal, setAddedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const skipSync = useRef(false);

  useEffect(() => {
    if (user?.cart) {
      skipSync.current = true;
      setCart(user.cart);
    } else if (!user) {
      skipSync.current = true;
      setCart([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || skipSync.current) {
      skipSync.current = false;
      return;
    }
    api.saveCart(user.id, cart)
      .then((updated) => setUser({ ...user, cart: updated.cart }))
      .catch(() => {});
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const cartKey = `${product.id}-${product.size || "default"}`;
      const existing = prev.find(
        (item) => `${item.id}-${item.size || "default"}` === cartKey
      );

      if (existing) {
        return prev.map((item) =>
          `${item.id}-${item.size || "default"}` === cartKey
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setAddedProductModal(product);
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && (item.size || "default") === (size || "default"))
      )
    );
  };

  const updateCartItem = (oldItem, newSize, newQty) => {
    setCart((prev) => {
      const filtered = prev.filter(
        (item) => !(item.id === oldItem.id && (item.size || "default") === (oldItem.size || "default"))
      );

      const cartKey = `${oldItem.id}-${newSize || "default"}`;
      const existing = filtered.find(
        (item) => `${item.id}-${item.size || "default"}` === cartKey
      );

      if (existing) {
        return filtered.map((item) =>
          `${item.id}-${item.size || "default"}` === cartKey
            ? { ...item, qty: newQty }
            : item
        );
      }

      return [...filtered, { ...oldItem, size: newSize, qty: newQty }];
    });
  };

  const clearCart = () => setCart([]);

  const closeAddedModal = () => setAddedProductModal(null);
  const toggleCartDrawer = () => setIsCartOpen((prev) => !prev);
  const closeCartDrawer = () => setIsCartOpen(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        cartCount,
        closeAddedModal,
        isCartOpen,
        toggleCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
      <AddToBagModal product={addedProductModal} onClose={closeAddedModal} />
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
