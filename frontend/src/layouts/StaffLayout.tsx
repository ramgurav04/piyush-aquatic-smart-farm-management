import React from 'react';
import { Boxes, ClipboardCheck, Droplets, Fish, LogOut, Waves } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const staffLinks = [
  { to: '/staff', label: 'My tasks', icon: ClipboardCheck, end: true },
  { to: '/staff/water', label: 'Water quality', icon: Droplets },
  { to: '/staff/feeding', label: 'Feeding records', icon: Fish },
  { to: '/staff/mortality', label: 'Mortality records', icon: Waves },
  { to: '/staff/inventory', label: 'Inventory update', icon: Boxes },
];

export const StaffLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/management/login', { replace: true }); };
  return <div className="management-shell">
    <aside className="management-sidebar"><Link to="/" className="management-brand"><span className="brand-mark"><Fish size={23} /></span><span>Piyush <b>Aquatic</b><small>Farm operations</small></span></Link><nav className="management-nav">{staffLinks.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'management-nav-link active' : 'management-nav-link'}><Icon size={18} />{label}</NavLink>)}</nav><div className="management-user"><span><b>{user?.name}</b><small>STAFF · Restricted access</small></span><button aria-label="Sign out" onClick={signOut}><LogOut size={17} /></button></div></aside>
    <div className="management-main"><header className="management-header"><div><span className="eyebrow">STAFF WORKSPACE</span><strong>Daily farm operations</strong></div><div className="management-header-actions"><span className="demo-pill">DEMO DATA</span><button className="management-mobile-logout" onClick={signOut}><LogOut size={16} /><span>Sign out</span></button></div></header><main className="management-content"><div className="demo-banner">Illustrative records only. No live farm data is connected.</div><Outlet /></main></div>
  </div>;
};
