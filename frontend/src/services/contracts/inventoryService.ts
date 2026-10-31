import type { StockRecord } from '@/domain/inventory/stock-record';

export interface IInventoryService {
  getStockRecords(): Promise<StockRecord[]>;
  getStockForSpecies(speciesId: string): Promise<StockRecord[]>;
  updateStock(id: string, updates: Partial<StockRecord>): Promise<StockRecord>;
  reserveStock(speciesId: string, quantity: number): Promise<boolean>;
}
