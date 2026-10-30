import React, { useState } from 'react';
import type { CartItem, CustomerOrder, OrderStatus } from '../types/order';
import { fishSpecies } from '../mocks/fish';
import { demoOrders } from '../mocks/orders';
import { useAuth } from '../hooks/useAuth';
import { CommerceContext } from './CommerceContextValue';

const CART_KEY = 'piyush_demo_cart';
const ORDERS_KEY = 'piyush_demo_orders';

const readArray = <T,>(key: string): T[] => {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    localStorage.removeItem(key);
    return [];
  }
};

const readCarts = (): Record<string, CartItem[]> => {
  const carts: Record<string, CartItem[]> = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(`${CART_KEY}:`)) carts[key.slice(CART_KEY.length + 1)] = readArray<CartItem>(key);
  }
  return carts;
};

const readOrders = (): CustomerOrder[] => {
  const saved = readArray<CustomerOrder>(ORDERS_KEY);
  return saved.length ? saved : demoOrders;
};

const EMPTY_CART: CartItem[] = [];

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const customerId = user?.role === 'CUSTOMER' ? user.id : null;
  const [carts, setCarts] = useState<Record<string, CartItem[]>>(readCarts);
  const [orders, setOrders] = useState<CustomerOrder[]>(readOrders);

  const activeCart = customerId ? carts[customerId] ?? EMPTY_CART : EMPTY_CART;
  const updateCart = (next: CartItem[]) => {
    if (customerId) {
      setCarts((current) => ({ ...current, [customerId]: next }));
      localStorage.setItem(`${CART_KEY}:${customerId}`, JSON.stringify(next));
    }
  };
  const addToCart = (fishId: string) => {
    if (!customerId) return;
    const current = activeCart.find((item) => item.fishId === fishId);
    updateCart(
      current
        ? activeCart.map((item) => item.fishId === fishId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...activeCart, { fishId, quantity: 1 }],
    );
  };
  const setQuantity = (fishId: string, quantity: number) => {
    updateCart(quantity < 1 ? activeCart.filter((item) => item.fishId !== fishId) : activeCart.map((item) =>
      item.fishId === fishId ? { ...item, quantity: Math.min(quantity, 99) } : item,
    ));
  };
  const removeFromCart = (fishId: string) => updateCart(activeCart.filter((item) => item.fishId !== fishId));
  const placeEnquiry = (customerId: string, note: string) => {
    if (customerId !== user?.id || !activeCart.length) throw new Error('Your enquiry list is empty or the active account changed.');
    const order: CustomerOrder = {
      id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      customerId,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      items: activeCart.map(({ fishId, quantity }) => ({
        fishId,
        fishName: fishSpecies.find((fish) => fish.id === fishId)?.name ?? fishId,
        quantity,
      })),
      ...(note.trim() ? { note: note.trim() } : {}),
    };
    const nextOrders = [order, ...orders];
    setOrders(nextOrders);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
    updateCart([]);
    return order;
  };
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const nextOrders = orders.map((order) => order.id === orderId ? { ...order, status } : order);
    setOrders(nextOrders);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
  };

  const value = { cart: activeCart, orders, addToCart, setQuantity, removeFromCart, placeEnquiry, updateOrderStatus };
  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
};
