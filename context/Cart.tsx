"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type CartItem = {
  id: number;
  websiteName: string;
  url: string;
  da: number;
  price: number;
  tat: string;
  categories: { name: string };
  qty: number;
  documentUrl: string;
};

type CartCtx = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (site: any) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  updateDocUrl: (id: number, url: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (site: any) => {
    setCart(prev =>
      prev.some(c => c.id === site.id)
        ? prev
        : [...prev, { ...site, qty: 1, documentUrl: "" }]
    );
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(c => c.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCart(prev =>
      prev.map(c =>
        c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c
      )
    );

  const updateDocUrl = (id: number, url: string) =>
    setCart(prev =>
      prev.map(c =>
        c.id === id ? { ...c, documentUrl: url } : c
      )
    );

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQty,
        updateDocUrl,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};