import type { CustomerOrder, OrderItem, OrderStatus } from '@/domain/orders/order';

export interface CreateOrderParams {
  customerId: string;
  items: OrderItem[];
  note?: string;
}

export interface IOrderService {
  getOrders(): Promise<CustomerOrder[]>;
  getCustomerOrders(customerId: string): Promise<CustomerOrder[]>;
  createOrder(params: CreateOrderParams): Promise<CustomerOrder>;
  updateOrderStatus(orderId: string, nextStatus: OrderStatus): Promise<CustomerOrder>;
}
