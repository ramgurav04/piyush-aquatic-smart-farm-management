import React from 'react';
import { AlertCircle, ArrowRight, Fish, Layers, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const demoStats = [
  { label: 'Species in demo catalog', value: '6', detail: 'Illustrative entries', icon: Fish, tone: 'cyan' },
  { label: 'Sample tank records', value: '3', detail: 'Not live farm data', icon: Layers, tone: 'purple' },
  { label: 'Demo enquiries', value: '2', detail: 'Example order records', icon: ShoppingBag, tone: 'green' },
  { label: 'Demo customer profiles', value: '2', detail: 'Sample accounts', icon: Users, tone: 'amber' },
];

export const Dashboard: React.FC = () => (
  <div className="management-page">
    <div className="management-page-title"><div><span className="eyebrow">OVERVIEW · SAMPLE DATA</span><h1>Farm operations</h1><p>A frontend demonstration of the management workspace. Values shown are not live farm records.</p></div><span className="demo-pill"><AlertCircle size={14} /> MOCK DATA</span></div>
    <div className="management-stat-grid">{demoStats.map(({ label, value, detail, icon: Icon, tone }) => <article className="management-stat" key={label}><span className={`stat-icon ${tone}`}><Icon /></span><div><small>{label}</small><b>{value}</b><span>{detail}</span></div></article>)}</div>
    <section className="management-panel"><div className="management-panel-heading"><div><Fish size={19} /><b>Example farm records</b></div><Link to="/admin/species">Manage species <ArrowRight size={15} /></Link></div><div className="management-table-wrap"><table className="management-table"><thead><tr><th>Reference</th><th>Species / batch</th><th>Activity</th><th>Record status</th></tr></thead><tbody><tr><td className="table-code">T-012 · DEMO</td><td>Discus · sample batch</td><td>Breeding log example</td><td><span className="status-pill status-confirmed">Demo record</span></td></tr><tr><td className="table-code">T-045 · DEMO</td><td>Ram Cichlid · sample pair</td><td>Water log example</td><td><span className="status-pill status-pending">Review sample</span></td></tr><tr><td className="table-code">ORD-001 · DEMO</td><td>Customer enquiry example</td><td>Retail enquiry</td><td><span className="status-pill status-pending">Pending</span></td></tr></tbody></table></div><p className="demo-note">The dashboard does not report real stock, sales, water quality, tank activity, or customer orders.</p></section>
  </div>
);
