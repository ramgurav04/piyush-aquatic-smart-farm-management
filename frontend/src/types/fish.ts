export * from '@/domain/fish/species';
export * from '@/domain/catalog/product-listing';

export type DemoAvailability = 'Available for enquiry' | 'Limited demo availability' | 'Enquiry only';

export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: import('@/domain/fish/species').FishCategory;
  description: string;
  imageUrl: string;
  availability: DemoAvailability;
  demoPriceLabel: string;
  featured?: boolean;
}
