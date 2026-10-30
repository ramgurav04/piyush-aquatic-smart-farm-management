export interface StockRecord {
  id: string;
  speciesId: string;
  tankId: string;
  onHand: number;
  reserved: number;
  unsellable: number;
  condition: 'Excellent' | 'Good' | 'Quarantine' | 'Observation';
  lastUpdated: string;
}
