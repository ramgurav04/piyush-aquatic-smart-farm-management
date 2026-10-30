export type FishCategory = 'Cichlid' | 'Livebearer' | 'Catfish' | 'Arowana';
export type DemoAvailability = 'Available for enquiry' | 'Limited demo availability' | 'Enquiry only';

export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: FishCategory;
  description: string;
  imageUrl: string;
  availability: DemoAvailability;
  demoPriceLabel: string;
  featured?: boolean;
}
