import React from 'react';
import { Fish, LayoutDashboard, LogOut, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCommerce } from '../hooks/useCommerce';

export const CustomerLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { cart } = useCommerce();
  const navigate = useNavigate();
  const isBusiness = user?.accountType === 'BUSINESS';
  const signOut = () => {
    logout();
    navigate('/login', { replace: true });
  };
  const links = [
    { to: '/customer', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/catalog', label: 'Fish collection', icon: Fish },
    { to: '/customer/orders', label: 'My enquiries', icon: ShoppingBag },
    { to: '/customer/profile', label: 'My profile', icon: UserRound },
  ];
  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <Link to="/" className="brand portal-brand"><span className="brand-mark"><Fish size={23} /></span><span>Piyush <b>Aquatic</b><small>Customer portal</small></span></Link>
        <nav className="portal-nav">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'portal-nav-link active' : 'portal-nav-link'}><Icon size={18} />{label}</NavLink>)}</nav>
        <div className="portal-sidebar-bottom"><div className="account-summary"><span className="account-avatar">{user?.name.slice(0, 1).toUpperCase()}</span><div><b>{user?.name}</b><small>{isBusiness ? 'Business customer' : 'Individual customer'}</small></div></div><button className="portal-logout" onClick={signOut}><LogOut size={17} />Sign out</button></div>
      </aside>
      <div className="portal-main">
        <header className="portal-header"><div><span className="eyebrow">CUSTOMER PORTAL</span><strong>Welcome, {user?.name.split(' ')[0]}</strong></div><div className="portal-header-actions"><Link className="cart-link" to="/customer/cart"><ShoppingCart size={19} /><span>Enquiry list</span>{cart.length > 0 && <b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b>}</Link><button className="portal-mobile-logout" onClick={signOut}><LogOut size={16} /><span>Sign out</span></button></div></header>
        <main className="portal-content"><div className="demo-banner">Demo environment · Fish availability and orders are illustrative only.</div>{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};
