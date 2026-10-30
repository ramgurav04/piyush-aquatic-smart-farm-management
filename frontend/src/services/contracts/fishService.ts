import type { Species } from '@/domain/fish/species';
import type { CatalogProduct } from '@/domain/catalog/product-listing';

export interface IFishService {
  getCatalog(): Promise<CatalogProduct[]>;
  getProductById(id: string): Promise<CatalogProduct | null>;
  getAllSpecies(): Promise<Species[]>;
}
