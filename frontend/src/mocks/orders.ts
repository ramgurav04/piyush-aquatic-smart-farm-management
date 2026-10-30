import type { CustomerOrder } from '../types/order';

export const demoOrders: CustomerOrder[] = [
  {
    id: 'DEMO-ORD-1042',
    customerId: 'demo-individual',
    createdAt: '2026-10-28T10:15:00.000Z',
    status: 'COMPLETED',
    items: [{ fishId: 'angelfish', fishName: 'Angelfish', quantity: 2 }],
    note: 'Example retail enquiry — demo only.',
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
    note: 'Example wholesale enquiry — demo only.',
  },
];
