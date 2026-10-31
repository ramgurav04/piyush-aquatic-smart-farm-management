export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

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
  totalEstimatedPrice?: string;
}

export interface CartItem {
  fishId: string;
  quantity: number;
}
