import React, { useState } from 'react';
import { Eye, EyeOff, Fish, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { useAuth } from '../hooks/useAuth';
import type { CustomerAccountType } from '../types/user';

export const Signup: React.FC = () => {
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedType = searchParams.get('type');
  const initialAccountType: CustomerAccountType = requestedType === 'BUSINESS' ? 'BUSINESS' : 'INDIVIDUAL';
  const [accountType, setAccountType] = useState<CustomerAccountType>(initialAccountType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Use a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    if (accountType === 'BUSINESS' && !businessName.trim()) {
      setError('Enter your business name to continue.');
      return;
    }
    setIsSubmitting(true);
    try {
      await registerCustomer({
        name, email, phone, password, accountType,
        ...(accountType === 'BUSINESS' ? { businessName, businessDetails } : {}),
      });
      navigate('/customer', { replace: true });
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : 'Unable to create your account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <PublicNavbar />
      <main className="auth-page signup-page">
        <section className="auth-card">
          <Link className="auth-brand" to="/"><span className="brand-mark"><Fish size={23} /></span><span>Piyush <b>Aquatic</b></span></Link>
          <span className="eyebrow">CUSTOMER REGISTRATION</span>
          <h1>Create your account</h1>
          <p className="auth-subtitle">Public registration is for individual and business customers only.</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <fieldset className="account-select">
              <legend className="field-label">Choose an account type</legend>
              <label className={accountType === 'INDIVIDUAL' ? 'account-option selected' : 'account-option'}><input type="radio" name="accountType" value="INDIVIDUAL" checked={accountType === 'INDIVIDUAL'} onChange={() => setAccountType('INDIVIDUAL')} /><span><b>Individual customer</b><small>For a home aquarium or hobby</small></span></label>
              <label className={accountType === 'BUSINESS' ? 'account-option selected' : 'account-option'}><input type="radio" name="accountType" value="BUSINESS" checked={accountType === 'BUSINESS'} onChange={() => setAccountType('BUSINESS')} /><span><b>Business customer</b><small>For shops and wholesale enquiries</small></span></label>
            </fieldset>
            <label className="field-label">Full name
              <span className="input-wrap"><UserRound size={17} /><input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></span>
            </label>
            <div className="form-row">
              <label className="field-label">Email address<span className="input-wrap"><Mail size={17} /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></span></label>
              <label className="field-label">Phone number<span className="input-wrap"><Phone size={17} /><input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91" /></span></label>
            </div>
            {accountType === 'BUSINESS' && <><label className="field-label">Business name<span className="input-wrap"><input required value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Your shop or business" /></span></label><label className="field-label">Business details <span className="optional">(optional)</span><textarea rows={3} value={businessDetails} onChange={(event) => setBusinessDetails(event.target.value)} placeholder="Tell us what you are looking to source" /></label></>}
            <div className="form-row">
              <label className="field-label">Password<span className="input-wrap"><LockKeyhole size={17} /><input required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
              <label className="field-label">Confirm password<span className="input-wrap"><input required type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat password" /></span></label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="button button-primary auth-submit" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Create customer account'}</button>
          </form>
          <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
          <p className="auth-disclaimer">Demo registration only. The password is stored as a browser-side digest for this mockup. Use a backend with secure password handling and authorization for production.</p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};
