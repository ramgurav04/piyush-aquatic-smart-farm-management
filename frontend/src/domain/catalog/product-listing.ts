import type { Species } from '../fish/species';
import type { StockRecord } from '../inventory/stock-record';
import { totalSellableForSpecies } from '../inventory/rules';

export interface ProductListing {
  id: string;
  speciesId: string;
  description: string;
  imageUrl: string;
  priceLabel: string;
  featured?: boolean;
}

export interface CatalogProduct {
  id: string;
  speciesId: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  imageUrl: string;
  priceLabel: string;
  demoPriceLabel: string;
  featured?: boolean;
  sellableQuantity: number;
  availability: string;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Enquiry Only';
  careLevel?: string;
  tempRangeCelsius?: string;
  phRange?: string;
}

export const composeCatalogProduct = (
  listing: ProductListing,
  species: Species,
  stockRecords: StockRecord[]
): CatalogProduct => {
  const sellable = totalSellableForSpecies(species.id, stockRecords);
  let availabilityStatus: CatalogProduct['availabilityStatus'] = 'In Stock';
  let availabilityText = `${sellable} available for enquiry`;

  if (sellable === 0) {
    availabilityStatus = 'Out of Stock';
    availabilityText = 'Currently unavailable';
  } else if (sellable < 15) {
    availabilityStatus = 'Low Stock';
    availabilityText = 'Limited demo availability';
  }

  return {
    id: listing.id,
    speciesId: species.id,
    name: species.name,
    scientificName: species.scientificName,
    category: species.category,
    description: listing.description,
    imageUrl: listing.imageUrl,
    priceLabel: listing.priceLabel,
    demoPriceLabel: listing.priceLabel,
    featured: listing.featured,
    sellableQuantity: sellable,
    availability: availabilityText,
    availabilityStatus,
    careLevel: species.careLevel,
    tempRangeCelsius: species.tempRangeCelsius,
    phRange: species.phRange,
  };
};
