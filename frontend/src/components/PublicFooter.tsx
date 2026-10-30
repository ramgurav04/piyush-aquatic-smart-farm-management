import React from 'react';
import { Fish, MapPin, Phone } from 'lucide-react';

const currentYear = new Date().getFullYear();

export const PublicFooter: React.FC = () => (
  <footer className="public-footer" id="contact">
    <div className="footer-main">
      <div>
        <div className="footer-brand"><Fish size={23} /> Piyush Aquatic</div>
        <p>Ornamental fish, raised with care in Dabhil, Ratnagiri.</p>
        <span className="demo-note">Website content and availability shown here are for demonstration.</span>
      </div>
      <div>
        <h3>Get in touch</h3>
        <p><MapPin size={16} /> Dabhil, Taluka Khed, Ratnagiri, Maharashtra</p>
        <p><Phone size={16} /> Contact details available on enquiry</p>
      </div>
      <div>
        <h3>Explore</h3>
        <a href="/#collection">Fish collection</a>
        <a href="/#about">Our farm</a>
        <a href="/login">Customer login</a>
      </div>
    </div>
    <div className="footer-bottom">© {currentYear} Piyush Aquatic · Demo frontend, not connected to a live ordering system.</div>
  </footer>
);
