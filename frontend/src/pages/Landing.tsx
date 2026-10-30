import React from 'react';
import { ArrowDown, ArrowRight, BadgeCheck, Droplets, Leaf, MapPin, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { FishCard } from '../components/FishCard';
import { fishSpecies } from '../mocks/fish';

export const Landing: React.FC = () => (
  <div className="site-shell">
    <PublicNavbar />
    <main>
      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span /> ORNAMENTAL FISH FARM · DABHIL, MAHARASHTRA</div>
          <h1>Bring the beauty<br />of the <em>aquatic world</em><br />closer to home.</h1>
          <p>Discover thoughtfully raised ornamental fish from our farm in Ratnagiri. Browse our collection and get in touch for individual or wholesale enquiries.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/catalog">Explore fish collection <ArrowRight size={17} /></Link><a className="button button-glass" href="#about">Discover our farm <ArrowDown size={16} /></a></div>
          <div className="hero-caption"><MapPin size={15} /> Dabhil, Taluka Khed, Ratnagiri</div>
        </div>
        <div className="hero-stamp"><Waves size={21} /><span>Ornamental fish<br /><small>Western Maharashtra</small></span></div>
      </section>

      <section className="intro-strip">
        <span>For the curious aquarist</span><i /><span>For aquarium businesses</span><i /><span>For fish lovers everywhere</span>
      </section>

      <section className="section collection-section" id="collection">
        <div className="section-heading">
          <div><span className="eyebrow">OUR COLLECTION</span><h2>Life, in every colour.</h2><p>Explore a sample of species associated with our farm. Availability changes; please enquire for current details.</p></div>
          <Link className="arrow-link" to="/catalog">View the collection <ArrowRight size={17} /></Link>
        </div>
        <div className="fish-grid landing-fish-grid">{fishSpecies.filter((fish) => fish.featured).map((fish) => <FishCard key={fish.id} fish={fish} compact />)}</div>
      </section>

      <section className="customer-types">
        <div className="customer-copy"><span className="eyebrow">HOW CAN WE HELP?</span><h2>A good fit for every aquarium.</h2><p>Whether you are choosing your first fish or sourcing for a business, our team can help you make an informed enquiry.</p></div>
        <article className="customer-type-card individual"><div className="type-number">01</div><h3>For individuals</h3><p>Explore our ornamental fish collection and send a retail enquiry. Get guidance on the species that suits your aquarium.</p><Link to="/catalog">Browse for your aquarium <ArrowRight size={16} /></Link></article>
        <article className="customer-type-card business"><div className="type-number">02</div><h3>For businesses</h3><p>Running an aquarium shop or sourcing in bulk? Create a business account to send a wholesale enquiry.</p><Link to="/signup">Create a business account <ArrowRight size={16} /></Link></article>
      </section>

      <section className="farm-section" id="about">
        <div className="farm-photo" role="img" aria-label="Aquatic plants and freshwater aquarium" />
        <div className="farm-content">
          <span className="eyebrow">ROOTED IN RATNAGIRI</span><h2>A little closer to nature.</h2>
          <p>Piyush Aquatic is an ornamental fish farm based in Dabhil, Maharashtra. This demo storefront introduces freshwater species and provides a place to begin customer enquiries.</p>
          <p>Our management system is a work in progress. The fish availability and account information shown here are demonstration content, not live farm records.</p>
          <p>The farm workspace also demonstrates species, breeding-batch, and care-record workflows using mock entries only.</p>
          <div className="farm-values"><div><Droplets /><span>Freshwater species</span></div><div><Leaf /><span>Fish-keeping information</span></div><div><BadgeCheck /><span>Enquiry-led catalog</span></div></div>
          <Link className="button button-dark" to="/signup">Get started <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="benefits section">
        <div className="benefit-item"><span className="benefit-icon"><Waves /></span><div><h3>Freshwater collection</h3><p>A catalog featuring popular ornamental freshwater species.</p></div></div>
        <div className="benefit-item"><span className="benefit-icon"><Droplets /></span><div><h3>Enquiry-led availability</h3><p>Ask us for current availability before planning your aquarium.</p></div></div>
        <div className="benefit-item"><span className="benefit-icon"><Leaf /></span><div><h3>Support for fish keepers</h3><p>We welcome questions from new hobbyists and businesses alike.</p></div></div>
      </section>

      <section className="contact-banner"><div><span className="eyebrow">LET'S TALK FISH</span><h2>Have a question about our collection?</h2><p>Send an enquiry to start a conversation with Piyush Aquatic.</p></div><Link to="/catalog" className="button button-primary">Send an enquiry <ArrowRight size={17} /></Link></section>
    </main>
    <PublicFooter />
  </div>
);
