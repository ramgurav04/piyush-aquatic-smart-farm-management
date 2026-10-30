import { mockAuthService } from './mock/mockAuthService';
import { mockFishService } from './mock/mockFishService';
import { mockInventoryService } from './mock/mockInventoryService';
import { mockOrderService } from './mock/mockOrderService';
import { mockCartService } from './mock/mockCartService';

// Single source of truth selecting Mock vs future HTTP/API implementations
export const authService = mockAuthService;
export const fishService = mockFishService;
export const inventoryService = mockInventoryService;
export const orderService = mockOrderService;
export const cartService = mockCartService;

export * from './storage';
export * from './apiConfig';
