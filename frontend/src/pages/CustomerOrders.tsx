import React from 'react';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCommerce } from '../hooks/useCommerce';

export const CustomerOrders: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useCommerce();
  const myOrders = orders.filter((order) => order.customerId === user?.id);
  return <div className="portal-page"><div className="portal-page-title"><span className="eyebrow">CUSTOMER ACTIVITY</span><h1>My enquiries</h1><p>Demo requests created from your fish collection.</p></div>{myOrders.length ? <section className="order-list">{myOrders.map((order) => <article className="order-card" key={order.id}><div className="order-card-header"><div><span className="eyebrow">{new Date(order.createdAt).toLocaleDateString()}</span><h2>{order.id}</h2></div><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></div><div className="order-lines">{order.items.map((item) => <div key={item.fishId}><span>{item.fishName}</span><b>× {item.quantity}</b></div>)}</div>{order.note && <p className="order-note"><b>Note:</b> {order.note}</p>}<p className="demo-note">Demo request only · Not sent to the farm</p></article>)}</section> : <div className="empty-panel"><ClipboardList size={26} /><b>No enquiry history yet</b><span>Your demo enquiries will appear here after you submit one.</span><Link className="button button-outline" to="/catalog">Explore fish <ArrowRight size={16} /></Link></div>}</div>;
};
