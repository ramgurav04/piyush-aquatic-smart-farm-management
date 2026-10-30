import React, { useState } from 'react';
import { Fish, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="public-nav">
      <Link to="/" className="brand" aria-label="Piyush Aquatic home">
        <span className="brand-mark"><Fish size={23} /></span>
        <span>Piyush <b>Aquatic</b><small>Dabhil · Ratnagiri</small></span>
      </Link>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={menuOpen ? 'public-links open' : 'public-links'}>
        <a href="/#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/#collection" onClick={() => setMenuOpen(false)}>Fish Collection</a>
        <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/signup" className="nav-cta" onClick={() => setMenuOpen(false)}>Create account</Link>
      </nav>
    </header>
  );
};
