import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2, Eye, EyeOff, Fish, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import type { CustomerAccountType, UserRole } from '../types/user';

interface LoginProps {
  managementRole?: Extract<UserRole, 'ADMIN' | 'STAFF'>;
  customerType?: CustomerAccountType;
}

const routeForRole = (role: string) => role === 'ADMIN' ? '/admin' : role === 'STAFF' ? '/staff' : '/customer';

export const Login: React.FC<LoginProps> = ({ managementRole, customerType }) => {
  const management = Boolean(managementRole);
  const chooseCustomerType = !management && !customerType;
  const { authenticate, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate(routeForRole(user.role), { replace: true });
  }, [navigate, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const signedInUser = await authenticate(email, password, {
        management,
        ...(managementRole ? { requiredRole: managementRole } : {}),
        ...(customerType ? { requiredAccountType: customerType } : {}),
      });
      navigate(routeForRole(signedInUser.role), { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (chooseCustomerType) {
    return (
      <div className="site-shell">
        <PublicNavbar />
        <main className="auth-page">
          <section className="auth-card">
            <Link className="auth-brand" to="/"><span className="brand-mark"><Fish size={23} /></span><span>Piyush <b>Aquatic</b></span></Link>
            <span className="eyebrow">CUSTOMER PORTAL</span>
            <h1>Welcome to Piyush Aquatic</h1>
            <p className="auth-subtitle">Choose the type of customer account you want to sign in to.</p>
            <div className="management-login-options">
              <Link className="management-login-option" to="/login/individual">
                <span className="management-login-icon admin"><UserRound size={21} /></span>
                <span><b>Individual customer</b><small>For your home aquarium and personal enquiries</small></span>
                <ArrowRight size={17} />
              </Link>
              <Link className="management-login-option" to="/login/business">
                <span className="management-login-icon staff"><Building2 size={21} /></span>
                <span><b>Business customer</b><small>For aquarium shops and wholesale enquiries</small></span>
                <ArrowRight size={17} />
              </Link>
            </div>
            <p className="auth-switch">New to Piyush Aquatic? <Link to="/signup">Create a customer account</Link></p>
          </section>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="site-shell">
      {!management && <PublicNavbar />}
      <main className="auth-page">
        <section className="auth-card">
          <Link className="auth-brand" to="/"><span className="brand-mark"><Fish size={23} /></span><span>Piyush <b>Aquatic</b></span></Link>
          <span className="eyebrow">{management ? 'RESTRICTED FARM ACCESS' : 'CUSTOMER PORTAL'}</span>
          <h1>{managementRole ? `${managementRole === 'ADMIN' ? 'Administrator' : 'Staff'} sign in` : `${customerType === 'BUSINESS' ? 'Business' : 'Individual'} customer sign in`}</h1>
          <p className="auth-subtitle">{management ? `Sign in to the ${managementRole === 'ADMIN' ? 'administrator' : 'staff'} workspace with your authorized farm account.` : 'Sign in with the email address and password for your customer account.'}</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <label className="field-label">Email address
              <span className="input-wrap"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></span>
            </label>
            <label className="field-label">Password
              <span className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span>
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="forgot-row"><span>Use your registered email and password.</span><Link to="/password-recovery">Forgot password?</Link></div>
            <button type="submit" className="button button-primary auth-submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
          </form>
          {!management && <p className="auth-switch">Wrong account type? <Link to="/login">Choose Individual or Business</Link></p>}
          {managementRole && <p className="demo-credentials"><b>{managementRole === 'ADMIN' ? 'Administrator' : 'Staff'} development demo</b><br />{managementRole === 'ADMIN' ? 'admin@piyushaquatic.com / AdminDemo123!' : 'staff@piyushaquatic.com / StaffDemo123!'}</p>}
          {!management && <p className="demo-credentials"><b>{customerType === 'BUSINESS' ? 'Business' : 'Individual'} customer demo</b><br />{customerType === 'BUSINESS' ? 'business@piyushaquatic.com' : 'individual@piyushaquatic.com'} / CustomerDemo123!</p>}
          {management && <p className="auth-switch"><Link to="/management/login">Choose another farm sign-in</Link></p>}
          <p className="auth-disclaimer">Demo frontend only. Credentials and browser storage are not secure authentication; production access must be enforced by the Spring Boot backend.</p>
        </section>
      </main>
      {!management && <PublicFooter />}
    </div>
  );
};
