import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "apex_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [items]);

  const addItem = useCallback((category, service, price) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.category === category && i.service === service);
      if (existing) {
        return prev.map((i) =>
          i.category === category && i.service === service
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { category, service, price, quantity: 1, notes: "" }];
    });
  }, []);

  const removeItem = useCallback((category, service) => {
    setItems((prev) => prev.filter((i) => !(i.category === category && i.service === service)));
  }, []);

  const updateQuantity = useCallback((category, service, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.category === category && i.service === service
          ? { ...i, quantity: Math.max(1, quantity) }
          : i
      )
    );
  }, []);

  const updateNotes = useCallback((category, service, notes) => {
    setItems((prev) =>
      prev.map((i) => (i.category === category && i.service === service ? { ...i, notes } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, updateNotes, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
