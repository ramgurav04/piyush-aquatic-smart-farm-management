import type { CartItem } from '@/domain/orders/order';

export interface ICartService {
  getCart(customerId?: string): CartItem[];
  saveCart(items: CartItem[], customerId?: string): void;
  clearCart(customerId?: string): void;
}
