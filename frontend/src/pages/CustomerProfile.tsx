import React, { useState } from 'react';
import { Save, UserRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const CustomerProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [businessName, setBusinessName] = useState(user?.businessName ?? '');
  const [businessDetails, setBusinessDetails] = useState(user?.businessDetails ?? '');
  const [saved, setSaved] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ name: name.trim(), phone: phone.trim(), ...(user?.accountType === 'BUSINESS' ? { businessName: businessName.trim(), businessDetails: businessDetails.trim() } : {}) });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };
  return <div className="portal-page"><div className="portal-page-title"><span className="eyebrow">YOUR ACCOUNT</span><h1>Profile settings</h1><p>Update your customer contact details.</p></div><form className="profile-card form-stack" onSubmit={handleSubmit}><div className="profile-heading"><span className="profile-avatar"><UserRound /></span><div><h2>{user?.accountType === 'BUSINESS' ? 'Business customer' : 'Individual customer'}</h2><p>{user?.email}</p></div></div><label className="field-label">Full name<input required value={name} onChange={(event) => setName(event.target.value)} /></label><label className="field-label">Email address<input disabled value={user?.email ?? ''} /></label><label className="field-label">Phone number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>{user?.accountType === 'BUSINESS' && <><label className="field-label">Business name<input required value={businessName} onChange={(event) => setBusinessName(event.target.value)} /></label><label className="field-label">Business details<textarea rows={3} value={businessDetails} onChange={(event) => setBusinessDetails(event.target.value)} /></label></>}<button className="button button-primary profile-save" type="submit"><Save size={16} />{saved ? 'Changes saved' : 'Save changes'}</button><p className="demo-note">Profile information is saved in this browser demo only.</p></form></div>;
};
