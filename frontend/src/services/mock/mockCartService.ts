import type { ICartService } from '../contracts/cartService';
import type { CartItem } from '@/domain/orders/order';
import { storage } from '../storage';

const CART_KEY_PREFIX = 'customer_cart_';

export class MockCartService implements ICartService {
  private getKey(customerId?: string): string {
    return `${CART_KEY_PREFIX}${customerId || 'guest'}`;
  }

  public getCart(customerId?: string): CartItem[] {
    return storage.getItem<CartItem[]>(this.getKey(customerId), []);
  }

  public saveCart(items: CartItem[], customerId?: string): void {
    storage.setItem(this.getKey(customerId), items);
  }

  public clearCart(customerId?: string): void {
    storage.removeItem(this.getKey(customerId));
  }
}

export const mockCartService = new MockCartService();
