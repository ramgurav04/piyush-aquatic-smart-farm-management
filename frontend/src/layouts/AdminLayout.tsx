import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BarChart3, Boxes, Fish, Layers, LayoutDashboard, LogOut, ShoppingBag, UserCheck, Users } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/management/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Species & breeding', path: '/admin/species', icon: Fish },
    { label: 'Tank management', path: '/admin/tanks', icon: Layers },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Orders & enquiries', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Staff', path: '/admin/staff', icon: UserCheck },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div className="management-shell">
      {/* Sidebar */}
      <aside className="management-sidebar">
        <div>
          <div className="management-brand-wrap">
            <div className="brand-mark">PA</div>
            <div className="management-brand-name"><h1>Piyush Aquatic</h1><span>Farm management</span></div>
          </div>

          <nav className="management-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/admin' ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`management-nav-link${isActive ? ' active' : ''}`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="management-user">
          <span className="management-user-icon"><UserCheck size={18} /></span>
          <span className="management-user-details"><b>{user?.name}</b><small>ADMIN · Full access</small></span>
          <button aria-label="Sign out" onClick={handleLogout}><LogOut size={17} /></button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="management-main">
        {/* Top Header */}
        <header className="management-header">
          <div><span className="eyebrow">ADMINISTRATOR WORKSPACE</span><strong>Management operations</strong></div>
          <div className="management-header-actions"><span className="demo-pill">DEMO DATA</span><button className="management-mobile-logout" onClick={handleLogout}><LogOut size={16} /><span>Sign out</span></button></div>
        </header>

        {/* Page Content */}
        <main className="management-content"><div className="demo-banner">Illustrative records only. No live farm data is connected.</div><Outlet /></main>
      </div>
    </div>
  );
};