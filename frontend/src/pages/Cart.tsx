import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCommerce } from '../hooks/useCommerce';
import { fishSpecies } from '../mocks/fish';

export const Cart: React.FC = () => {
  const { cart, setQuantity, removeFromCart, placeEnquiry } = useCommerce();
  const { user } = useAuth();
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const items = cart.map((item) => ({ ...item, fish: fishSpecies.find((fish) => fish.id === item.fishId) })).filter((item) => item.fish);
  const submitEnquiry = (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || items.length === 0) return;
    try {
      placeEnquiry(user.id, note);
      setSubmitted(true);
      setError('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save the demo enquiry.');
    }
  };
  if (submitted) return <div className="portal-page"><section className="confirmation-card"><span className="confirmation-mark"><ShoppingCart size={27} /></span><span className="eyebrow">DEMO ENQUIRY CREATED</span><h1>Thanks for your enquiry.</h1><p>This request is stored only in this browser demo. It has not been sent to the farm and is not a confirmed order.</p><div className="confirmation-actions"><Link className="button button-primary" to="/customer/orders">View enquiry history</Link><Link className="button button-outline" to="/catalog">Back to collection</Link></div></section></div>;
  return <div className="portal-page">
    <div className="portal-page-title"><Link className="back-link" to="/catalog"><ArrowLeft size={16} /> Collection</Link><h1>Your enquiry list</h1><p>Review your selections and send a local demo request.</p></div>
    {items.length ? <div className="cart-layout"><section className="cart-items">{items.map(({ fishId, quantity, fish }) => fish && <article className="cart-item" key={fishId}><img src={fish.imageUrl} alt="" /><div className="cart-item-info"><h3>{fish.name}</h3><span>{fish.availability}</span><small>{fish.demoPriceLabel}</small></div><div className="quantity-control"><button aria-label={`Decrease ${fish.name} quantity`} onClick={() => setQuantity(fishId, quantity - 1)}><Minus size={14} /></button><span>{quantity}</span><button aria-label={`Increase ${fish.name} quantity`} onClick={() => setQuantity(fishId, quantity + 1)}><Plus size={14} /></button></div><button className="remove-button" aria-label={`Remove ${fish.name}`} onClick={() => removeFromCart(fishId)}><Trash2 size={17} /></button></article>)}</section><form className="checkout-card" onSubmit={submitEnquiry}><span className="eyebrow">{user?.accountType === 'BUSINESS' ? 'WHOLESALE ENQUIRY' : 'RETAIL ENQUIRY'}</span><h2>Request details</h2><p>We will use this demo request to show the enquiry workflow. No real order is submitted.</p><label className="field-label">Notes for the farm <span className="optional">(optional)</span><textarea rows={4} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Questions, preferred size, or other details" /></label><div className="checkout-summary"><span>Fish types</span><b>{items.length}</b><span>Quantity requested</span><b>{items.reduce((sum, item) => sum + item.quantity, 0)}</b><span>Price</span><b>To be confirmed</b></div>{error && <p className="form-error">{error}</p>}<button type="submit" className="button button-primary auth-submit">Create demo enquiry</button><small>Demo only · no payment or live order placement</small></form></div> : <div className="empty-panel cart-empty"><ShoppingCart size={27} /><b>Your enquiry list is empty</b><span>Add fish from the collection to request more information.</span><Link className="button button-primary" to="/catalog">Browse fish</Link></div>}
  </div>;
};
