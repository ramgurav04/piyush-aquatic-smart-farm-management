export type FishCategory = 'Cichlid' | 'Livebearer' | 'Catfish' | 'Arowana';

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  category: FishCategory;
  tempRangeCelsius?: string;
  phRange?: string;
  careLevel?: 'Easy' | 'Moderate' | 'Advanced';
}
