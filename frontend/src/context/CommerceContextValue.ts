import { createContext } from 'react';
import type { CartItem, CustomerOrder, OrderStatus } from '../types/order';

export interface CommerceContextType {
  cart: CartItem[];
  orders: CustomerOrder[];
  addToCart: (fishId: string) => void;
  setQuantity: (fishId: string, quantity: number) => void;
  removeFromCart: (fishId: string) => void;
  placeEnquiry: (customerId: string, note: string) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const CommerceContext = createContext<CommerceContextType | undefined>(undefined);
