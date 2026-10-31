import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import type { OrderStatus } from '@/domain/orders/order';

export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
  byCustomer: (customerId: string) => ['orders', 'customer', customerId] as const,
};

export const useCustomerOrders = (customerId?: string) => {
  return useQuery({
    queryKey: customerId ? ORDER_QUERY_KEYS.byCustomer(customerId) : ['orders', 'none'],
    queryFn: async () => {
      if (!customerId) return [];
      return orderService.getCustomerOrders(customerId);
    },
    enabled: Boolean(customerId),
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.all,
    queryFn: async () => orderService.getOrders(),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, nextStatus }: { orderId: string; nextStatus: OrderStatus }) => {
      return orderService.updateOrderStatus(orderId, nextStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Parameters<typeof orderService.createOrder>[0]) => {
      return orderService.createOrder(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
    },
  });
};
