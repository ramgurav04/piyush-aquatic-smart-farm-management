import type { IOrderService, CreateOrderParams } from '../contracts/orderService';
import type { CustomerOrder, OrderStatus } from '@/domain/orders/order';
import { transitionOrder } from '@/domain/orders/rules';
import { seedOrders } from '@/data/seed/orders';
import { storage } from '../storage';
import { mockInventoryService } from './mockInventoryService';

const ORDERS_STORAGE_KEY = 'customer_orders';

export class MockOrderService implements IOrderService {
  private getOrdersList(): CustomerOrder[] {
    return storage.getItem<CustomerOrder[]>(ORDERS_STORAGE_KEY, seedOrders);
  }

  private saveOrdersList(orders: CustomerOrder[]): void {
    storage.setItem(ORDERS_STORAGE_KEY, orders);
  }

  public async getOrders(): Promise<CustomerOrder[]> {
    return this.getOrdersList();
  }

  public async getCustomerOrders(customerId: string): Promise<CustomerOrder[]> {
    return this.getOrdersList().filter((o) => o.customerId === customerId);
  }

  public async createOrder({ customerId, items, note }: CreateOrderParams): Promise<CustomerOrder> {
    if (!items || items.length === 0) {
      throw new Error('Cannot create an order with empty items.');
    }

    // Try reserving stock where supported
    for (const item of items) {
      await mockInventoryService.reserveStock(item.fishId, item.quantity);
    }

    const newOrder: CustomerOrder = {
      id: `DEMO-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      items,
      note: note || 'Demo customer enquiry',
      totalEstimatedPrice: 'On Enquiry',
    };

    const orders = this.getOrdersList();
    orders.unshift(newOrder);
    this.saveOrdersList(orders);

    return newOrder;
  }

  public async updateOrderStatus(orderId: string, nextStatus: OrderStatus): Promise<CustomerOrder> {
    const orders = this.getOrdersList();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) {
      throw new Error(`Order ${orderId} not found.`);
    }

    const currentOrder = orders[idx];
    const updatedOrder = transitionOrder(currentOrder, nextStatus);
    orders[idx] = updatedOrder;
    this.saveOrdersList(orders);

    return updatedOrder;
  }
}

export const mockOrderService = new MockOrderService();
