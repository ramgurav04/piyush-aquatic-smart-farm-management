import React from 'react';
import { ArrowRight, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManagementLoginPicker: React.FC = () => (
  <main className="auth-page">
    <section className="auth-card">
      <Link className="auth-brand" to="/"><span className="brand-mark">PA</span><span>Piyush <b>Aquatic</b></span></Link>
      <span className="eyebrow">RESTRICTED FARM ACCESS</span>
      <h1>Farm team sign in</h1>
      <p className="auth-subtitle">Choose your assigned internal workspace. These options are separate from customer accounts.</p>
      <div className="management-login-options">
        <Link className="management-login-option" to="/management/admin/login">
          <span className="management-login-icon admin"><ShieldCheck size={21} /></span>
          <span><b>Administrator</b><small>Farm configuration and management</small></span>
          <ArrowRight size={17} />
        </Link>
        <Link className="management-login-option" to="/management/staff/login">
          <span className="management-login-icon staff"><UserRound size={21} /></span>
          <span><b>Farm staff</b><small>Assigned tasks and daily records</small></span>
          <ArrowRight size={17} />
        </Link>
      </div>
      <p className="auth-disclaimer">Internal demo portal. Role access is enforced by this frontend only; production access must be verified by the backend.</p>
    </section>
  </main>
);
