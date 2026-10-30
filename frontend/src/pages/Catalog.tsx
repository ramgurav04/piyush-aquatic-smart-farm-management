import React, { useMemo, useState } from 'react';
import { ArrowDownUp, Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FishCard } from '../components/FishCard';
import { useCommerce } from '../hooks/useCommerce';
import { useAuth } from '../hooks/useAuth';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { fishSpecies } from '../mocks/fish';

export const Catalog: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const { addToCart } = useCommerce();
  const { user } = useAuth();
  const isCustomer = user?.role === 'CUSTOMER';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All species');
  const [availability, setAvailability] = useState('All availability');
  const [sort, setSort] = useState('Featured');
  const notice = params.get('added');
  const filteredFish = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = fishSpecies.filter((fish) =>
      (!query || `${fish.name} ${fish.scientificName} ${fish.category}`.toLowerCase().includes(query)) &&
      (category === 'All species' || fish.category === category) &&
      (availability === 'All availability' || fish.availability === availability),
    );
    if (sort === 'Name A–Z') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Name Z–A') filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'Featured') filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return filtered;
  }, [availability, category, search, sort]);
  React.useEffect(() => {
    const addId = params.get('add');
    if (isCustomer && addId && fishSpecies.some((fish) => fish.id === addId)) {
      addToCart(addId);
      setParams((current) => { current.delete('add'); current.set('added', '1'); return current; }, { replace: true });
    }
  }, [addToCart, isCustomer, params, setParams]);
  const catalogPage = <div className={isCustomer ? 'portal-page' : 'public-catalog-page'}>
    <section className="portal-welcome catalog-welcome"><div><span className="eyebrow">THE FISH COLLECTION</span><h1>Find your next favourite.</h1><p>Explore the demo collection and add fish to an enquiry. Availability and prices must be confirmed directly.</p></div><span className="catalog-count">{fishSpecies.length} species</span></section>
      {notice && <div className="form-success" role="status">Added to your enquiry list.</div>}
      <section className="catalog-controls"><label className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search fish, species, category…" /></label><label className="filter-field"><SlidersHorizontal size={17} /><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All species</option>{Array.from(new Set(fishSpecies.map((fish) => fish.category))).map((option) => <option key={option}>{option}</option>)}</select></label><label className="filter-field"><select value={availability} onChange={(event) => setAvailability(event.target.value)}><option>All availability</option>{Array.from(new Set(fishSpecies.map((fish) => fish.availability))).map((option) => <option key={option}>{option}</option>)}</select></label><label className="filter-field"><ArrowDownUp size={17} /><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Name A–Z</option><option>Name Z–A</option></select></label></section>
      <div className="catalog-results"><span>{filteredFish.length} result{filteredFish.length === 1 ? '' : 's'}</span><span>Demo data · confirm details with the farm</span></div>
      {filteredFish.length ? <div className="fish-grid catalog-grid">{filteredFish.map((fish) => <FishCard key={fish.id} fish={fish} {...(isCustomer ? { onEnquire: (selected: typeof fish) => addToCart(selected.id) } : {})} />)}</div> : <div className="empty-panel"><Search size={25} /><b>No fish match those filters</b><span>Try another search or clear a filter.</span></div>}
    </div>;
  return isCustomer ? <CustomerLayout>{catalogPage}</CustomerLayout> : <div className="site-shell"><PublicNavbar /><main className="public-catalog-container">{catalogPage}</main><PublicFooter /></div>;
};
