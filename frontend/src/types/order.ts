export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED';

export interface OrderItem {
  fishId: string;
  fishName: string;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  customerId: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  note?: string;
}

export interface CartItem {
  fishId: string;
  quantity: number;
}
