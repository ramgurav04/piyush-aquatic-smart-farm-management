export interface BreedingBatch {
  id: string;
  speciesId: string;
  tankId: string;
  startDate: string;
  fryCount: number;
  status: 'Egg' | 'Fry' | 'Juvenile' | 'Graded';
  notes?: string;
}
