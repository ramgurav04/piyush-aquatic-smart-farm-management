import type { IFishService } from '../contracts/fishService';
import type { Species } from '@/domain/fish/species';
import type { CatalogProduct } from '@/domain/catalog/product-listing';
import { composeCatalogProduct } from '@/domain/catalog/product-listing';
import { seedSpecies, seedListings } from '@/data/seed/fish';
import { mockInventoryService } from './mockInventoryService';

export class MockFishService implements IFishService {
  public async getAllSpecies(): Promise<Species[]> {
    return seedSpecies;
  }

  public async getCatalog(): Promise<CatalogProduct[]> {
    const stock = await mockInventoryService.getStockRecords();
    return seedListings.map((listing) => {
      const species = seedSpecies.find((s) => s.id === listing.speciesId) || {
        id: listing.speciesId,
        name: listing.id,
        scientificName: '',
        category: 'Cichlid',
      };
      return composeCatalogProduct(listing, species, stock);
    });
  }

  public async getProductById(id: string): Promise<CatalogProduct | null> {
    const catalog = await this.getCatalog();
    return catalog.find((item) => item.id === id || item.speciesId === id) || null;
  }
}

export const mockFishService = new MockFishService();
