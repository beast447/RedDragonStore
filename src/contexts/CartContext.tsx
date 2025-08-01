import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string; // unique identifier
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }): React.ReactElement {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  // Load cart from Firestore when the user logs in
  useEffect(() => {
    if (!user) {
      // If logged out, simply clear the cart for now
      setItems([]);
      return;
    }

    (async () => {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        const snap = await getDoc(cartRef);
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.items)) {
            setItems(data.items as CartItem[]);
          }
        }
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    })();
  }, [user]);

  // Persist cart to Firestore whenever it changes for a logged-in user
  useEffect(() => {
    if (!user) return;
    const cartRef = doc(db, 'carts', user.uid);
    setDoc(cartRef, { items }, { merge: true }).catch((err) => {
      console.error('Failed to save cart', err);
    });
  }, [items, user]);

  const value: CartContextValue = { items, addItem, removeItem, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
} 