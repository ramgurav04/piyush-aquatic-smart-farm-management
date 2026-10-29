import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/user';
import { ShieldCheck, User, Store } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    loginAs(role);
    if (role === 'ADMIN' || role === 'STAFF') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Piyush Aquatic System</h1>
          <p className="text-sm text-slate-500">Simulate role-based login to test system permissions</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleRoleSelect('ADMIN')}
            className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50/50 transition-all text-left group"
          >
            <div className="p-3 bg-cyan-100 text-cyan-700 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <ShieldCheck size={22} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-slate-800">Login as Administrator</h3>
              <p className="text-xs text-slate-500">Full access to 200 tanks, breeding logs, & settings</p>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect('STAFF')}
            className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group"
          >
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <User size={22} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-slate-800">Login as Farm Staff</h3>
              <p className="text-xs text-slate-500">Water parameters logging & daily feeding tasks</p>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect('CUSTOMER')}
            className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
          >
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Store size={22} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-slate-800">Login as B2B Wholesale Buyer</h3>
              <p className="text-xs text-slate-500">Browse species catalog, check MOQs, & order</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};