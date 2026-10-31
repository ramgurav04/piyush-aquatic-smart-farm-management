import React, { useState, useEffect } from 'react';
import type { CartItem, CustomerOrder, OrderStatus } from '@/domain/orders/order';
import { useAuth } from '@/hooks/useAuth';
import { cartService, orderService, fishService } from '@/services';
import { CommerceContext } from './CommerceContextValue';

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const customerId = user?.role === 'CUSTOMER' ? user.id : undefined;

  const [cart, setCart] = useState<CartItem[]>(() => cartService.getCart(customerId));
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Sync cart and orders when user/customerId changes
  useEffect(() => {
    let active = true;

    const syncCommerceData = async () => {
      const items = cartService.getCart(customerId);
      try {
        const fetched = customerId
          ? await orderService.getCustomerOrders(customerId)
          : await orderService.getOrders();
        if (active) {
          setCart(items);
          setOrders(fetched);
        }
      } catch (e) {
        if (active) {
          setCart(items);
        }
        console.warn('Failed to load orders:', e);
      }
    };

    void syncCommerceData();

    return () => {
      active = false;
    };
  }, [customerId]);

  const updateCartState = (next: CartItem[]) => {
    setCart(next);
    cartService.saveCart(next, customerId);
  };

  const addToCart = (fishId: string) => {
    const existing = cart.find((item) => item.fishId === fishId);
    if (existing) {
      updateCartState(
        cart.map((item) =>
          item.fishId === fishId ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item
        )
      );
    } else {
      updateCartState([...cart, { fishId, quantity: 1 }]);
    }
  };

  const setQuantity = (fishId: string, quantity: number) => {
    if (quantity < 1) {
      updateCartState(cart.filter((item) => item.fishId !== fishId));
    } else {
      updateCartState(
        cart.map((item) =>
          item.fishId === fishId ? { ...item, quantity: Math.min(quantity, 99) } : item
        )
      );
    }
  };

  const removeFromCart = (fishId: string) => {
    updateCartState(cart.filter((item) => item.fishId !== fishId));
  };

  const placeEnquiry = (enquiryCustomerId: string, note: string): CustomerOrder => {
    if (!cart.length) {
      throw new Error('Your enquiry list is empty.');
    }

    const orderId = `DEMO-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: orderId,
      customerId: enquiryCustomerId,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      items: cart.map((item) => ({
        fishId: item.fishId,
        fishName: item.fishId,
        quantity: item.quantity,
      })),
      note: note.trim() || undefined,
      totalEstimatedPrice: 'On Enquiry',
    };

    void (async () => {
      try {
        const catalog = await fishService.getCatalog();
        const fullItems = cart.map((item) => {
          const match = catalog.find((c) => c.id === item.fishId);
          return {
            fishId: item.fishId,
            fishName: match?.name || item.fishId,
            quantity: item.quantity,
          };
        });
        await orderService.createOrder({
          customerId: enquiryCustomerId,
          items: fullItems,
          note,
        });
        const all = enquiryCustomerId
          ? await orderService.getCustomerOrders(enquiryCustomerId)
          : await orderService.getOrders();
        setOrders(all);
      } catch (err) {
        console.warn('Error syncing order to service:', err);
      }
    })();

    updateCartState([]);
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
    void (async () => {
      try {
        await orderService.updateOrderStatus(orderId, nextStatus);
        const all = customerId ? await orderService.getCustomerOrders(customerId) : await orderService.getOrders();
        setOrders(all);
      } catch (err) {
        console.warn('Error updating order status in service:', err);
      }
    })();
  };

  const value = {
    cart,
    orders,
    addToCart,
    setQuantity,
    removeFromCart,
    placeEnquiry,
    updateOrderStatus,
  };

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
};
