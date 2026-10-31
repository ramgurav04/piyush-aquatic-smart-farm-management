import type { OrderStatus } from './order';

const ALLOWED_ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const canTransitionOrder = (from: OrderStatus, to: OrderStatus): boolean => {
  return ALLOWED_ORDER_TRANSITIONS[from].includes(to);
};

export const transitionOrder = <T extends { status: OrderStatus }>(order: T, nextStatus: OrderStatus): T => {
  if (!canTransitionOrder(order.status, nextStatus)) {
    throw new Error(`Invalid status transition from ${order.status} to ${nextStatus}.`);
  }
  return {
    ...order,
    status: nextStatus,
  };
};
