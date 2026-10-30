import React, { useState } from 'react';
import { ArrowUpRight, Check, ImageOff } from 'lucide-react';
import type { FishSpecies } from '../types/fish';
import { Link } from 'react-router-dom';

interface FishCardProps {
  fish: FishSpecies;
  onEnquire?: (fish: FishSpecies) => void;
  compact?: boolean;
}

export const FishCard: React.FC<FishCardProps> = ({ fish, onEnquire, compact = false }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [added, setAdded] = useState(false);
  const enquire = () => {
    onEnquire?.(fish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return (
    <article className={`fish-card${compact ? ' compact' : ''}`}>
      <div className="fish-image">
        {!imageFailed ? (
          <img src={fish.imageUrl} alt={fish.name} loading="lazy" onError={() => setImageFailed(true)} />
        ) : <div className="image-fallback"><ImageOff size={25} /><span>Image unavailable</span></div>}
        <span className="fish-category">{fish.category}</span>
      </div>
      <div className="fish-card-body">
        <div className="fish-card-title"><div><h3>{fish.name}</h3><span>{fish.scientificName}</span></div><ArrowUpRight size={18} /></div>
        {!compact && <p>{fish.description}</p>}
        <div className="fish-availability"><span className="availability-dot" />{fish.availability}</div>
        <div className="fish-card-bottom">
          <span>{fish.demoPriceLabel}</span>
          {onEnquire ? (
            <button type="button" className="text-button" onClick={enquire}>{added ? <><Check size={15} /> Added</> : 'Add enquiry'}</button>
          ) : <Link to="/login" className="text-button">Enquire</Link>}
        </div>
      </div>
    </article>
  );
};
