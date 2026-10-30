import type { IInventoryService } from '../contracts/inventoryService';
import type { StockRecord } from '@/domain/inventory/stock-record';
import { seedStock } from '@/data/seed/stock';
import { storage } from '../storage';

const STOCK_STORAGE_KEY = 'stock_records';

export class MockInventoryService implements IInventoryService {
  private getRecords(): StockRecord[] {
    return storage.getItem<StockRecord[]>(STOCK_STORAGE_KEY, seedStock);
  }

  private saveRecords(records: StockRecord[]): void {
    storage.setItem(STOCK_STORAGE_KEY, records);
  }

  public async getStockRecords(): Promise<StockRecord[]> {
    return this.getRecords();
  }

  public async getStockForSpecies(speciesId: string): Promise<StockRecord[]> {
    return this.getRecords().filter((r) => r.speciesId === speciesId);
  }

  public async updateStock(id: string, updates: Partial<StockRecord>): Promise<StockRecord> {
    const records = this.getRecords();
    const idx = records.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Stock record ${id} not found.`);

    records[idx] = {
      ...records[idx],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    this.saveRecords(records);
    return records[idx];
  }

  public async reserveStock(speciesId: string, quantity: number): Promise<boolean> {
    const records = this.getRecords();
    const speciesRecords = records.filter((r) => r.speciesId === speciesId);
    let remainingToReserve = quantity;

    for (const record of speciesRecords) {
      const available = record.onHand - record.reserved - record.unsellable;
      if (available <= 0) continue;

      const toReserve = Math.min(available, remainingToReserve);
      record.reserved += toReserve;
      remainingToReserve -= toReserve;

      if (remainingToReserve <= 0) break;
    }

    if (remainingToReserve > 0) {
      // Not enough stock to reserve fully
      return false;
    }

    this.saveRecords(records);
    return true;
  }
}

export const mockInventoryService = new MockInventoryService();
