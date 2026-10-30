import React from 'react';
import { ArrowRight, Fish, ShoppingBag, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCommerce } from '../hooks/useCommerce';
import { fishSpecies } from '../mocks/fish';
import { FishCard } from '../components/FishCard';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, cart, addToCart } = useCommerce();
  const customerOrders = orders.filter((order) => order.customerId === user?.id);
  const isBusiness = user?.accountType === 'BUSINESS';
  return (
    <div className="portal-page">
      <section className="portal-welcome"><div><span className="eyebrow">YOUR AQUATIC JOURNEY</span><h1>Good to see you, {user?.name.split(' ')[0]}.</h1><p>{isBusiness ? 'Your business wholesale enquiry workspace is ready.' : 'Find a fish that feels right for your aquarium.'}</p></div><span className="account-type-badge">{isBusiness ? 'Business customer' : 'Individual customer'}</span></section>
      <div className="portal-stat-grid"><div className="portal-stat"><span className="stat-icon cyan"><Fish /></span><div><small>Collection</small><b>{fishSpecies.length} species</b><span>Browse demo catalog</span></div></div><div className="portal-stat"><span className="stat-icon purple"><ShoppingBag /></span><div><small>Your enquiries</small><b>{customerOrders.length}</b><span>Demo enquiries only</span></div></div><div className="portal-stat"><span className="stat-icon amber"><UserRound /></span><div><small>Account</small><b>{isBusiness ? 'Business' : 'Individual'}</b><span>{user?.businessName ?? user?.email}</span></div></div></div>
      <section className="portal-section"><div className="portal-section-heading"><div><h2>Recent enquiries</h2><p>Order requests created in this demo.</p></div><Link to="/customer/orders">View history <ArrowRight size={16} /></Link></div>{customerOrders.length ? <div className="orders-mini-list">{customerOrders.slice(0, 3).map((order) => <Link className="order-mini" to="/customer/orders" key={order.id}><div><b>{order.id}</b><span>{order.items.length} fish types · {new Date(order.createdAt).toLocaleDateString()}</span></div><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></Link>)}</div> : <div className="empty-panel"><ShoppingBag size={24} /><b>No enquiries yet</b><span>Add fish from the collection to start a demo enquiry.</span><Link className="button button-outline" to="/catalog">Browse fish</Link></div>}</section>
      <section className="portal-section"><div className="portal-section-heading"><div><h2>Explore the collection</h2><p>Selected ornamental freshwater fish.</p></div><Link to="/catalog">See all <ArrowRight size={16} /></Link></div><div className="fish-grid portal-fish-grid">{fishSpecies.slice(0, 3).map((fish) => <FishCard key={fish.id} fish={fish} compact onEnquire={(selected) => addToCart(selected.id)} />)}</div></section>
      {cart.length > 0 && <div className="portal-inline-link"><Link to="/customer/cart">You have {cart.reduce((sum, item) => sum + item.quantity, 0)} fish in your enquiry list <ArrowRight size={16} /></Link></div>}
    </div>
  );
};
