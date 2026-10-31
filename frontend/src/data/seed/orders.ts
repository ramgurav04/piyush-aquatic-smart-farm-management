import type { CustomerOrder } from '@/domain/orders/order';

export const seedOrders: CustomerOrder[] = [
  {
    id: 'DEMO-ORD-1042',
    customerId: 'demo-individual',
    createdAt: '2026-10-28T10:15:00.000Z',
    status: 'COMPLETED',
    items: [{ fishId: 'angelfish', fishName: 'Angelfish', quantity: 2 }],
    note: 'Individual retail enquiry for 50-gallon planted tank.',
    totalEstimatedPrice: 'On Enquiry',
  },
  {
    id: 'DEMO-ORD-1086',
    customerId: 'demo-business',
    createdAt: '2026-10-29T08:30:00.000Z',
    status: 'CONFIRMED',
    items: [
      { fishId: 'discus', fishName: 'Discus', quantity: 10 },
      { fishId: 'guppy', fishName: 'Guppy', quantity: 20 },
    ],
    note: 'Wholesale batch order for retail storefront aquarium restock.',
    totalEstimatedPrice: 'On Enquiry',
  },
];
