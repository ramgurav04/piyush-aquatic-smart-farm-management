import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Fish, ArrowLeft } from 'lucide-react'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (role: 'admin' | 'staff' | 'customer') => {
    login(role)
    navigate(role === 'customer' ? '/' : '/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-5 w-full max-w-md border border-slate-200">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-600 to-blue-700 text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
            <Fish className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Piyush Aquatic Portal</h2>
          <p className="text-xs text-slate-500">Select a demonstration role to access the portal</p>
        </div>

        <div className="space-y-3 pt-2">
          <button 
            onClick={() => handleLogin('admin')} 
            className="w-full flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition font-medium text-sm group"
          >
            <span>Login as Administrator</span>
            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded font-mono group-hover:bg-cyan-600 transition">/admin</span>
          </button>
          <button 
            onClick={() => handleLogin('staff')} 
            className="w-full flex items-center justify-between p-3.5 bg-blue-700 text-white rounded-xl hover:bg-blue-600 transition font-medium text-sm group"
          >
            <span>Login as Facility Staff</span>
            <span className="text-xs bg-blue-800 px-2 py-0.5 rounded font-mono group-hover:bg-blue-900 transition">/admin</span>
          </button>
          <button 
            onClick={() => handleLogin('customer')} 
            className="w-full flex items-center justify-between p-3.5 bg-cyan-700 text-white rounded-xl hover:bg-cyan-600 transition font-medium text-sm group"
          >
            <span>Login as Verified Retailer / Customer</span>
            <span className="text-xs bg-cyan-800 px-2 py-0.5 rounded font-mono group-hover:bg-cyan-900 transition">/ (Wholesale)</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-700 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Wholesale Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
