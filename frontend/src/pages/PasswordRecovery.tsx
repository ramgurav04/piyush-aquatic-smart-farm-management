import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';

export const PasswordRecovery: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  return <div className="site-shell"><PublicNavbar /><main className="auth-page"><section className="auth-card"><span className="eyebrow">ACCOUNT SUPPORT</span><h1>Password recovery</h1><p className="auth-subtitle">Password recovery is a placeholder in this frontend demo. No email will be sent.</p>{submitted && <p className="form-success" role="status">Password recovery is not available in the demo.</p>}<button className="button button-primary auth-submit" onClick={() => setSubmitted(true)}>Request recovery link</button><p className="auth-switch"><Link to="/login">Back to customer login</Link></p></section></main><PublicFooter /></div>;
};
