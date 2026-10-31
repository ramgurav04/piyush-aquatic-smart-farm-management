import type { StockRecord } from './stock-record';

export const sellableQuantity = (stock: StockRecord): number => {
  return Math.max(0, stock.onHand - stock.reserved - stock.unsellable);
};

export const totalSellableForSpecies = (speciesId: string, records: StockRecord[]): number => {
  return records
    .filter((r) => r.speciesId === speciesId)
    .reduce((total, record) => total + sellableQuantity(record), 0);
};
