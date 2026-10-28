import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Globe, LayoutDashboard, Fish, Layers, LogOut } from 'lucide-react'

export function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight">Piyush Aquatic</div>
          <span className="text-[10px] bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded font-mono">ADMIN</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 text-sm font-medium">
          <Link to="/admin" className="flex items-center gap-2.5 p-2.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition">
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/species" className="flex items-center gap-2.5 p-2.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition">
            <Fish className="w-4 h-4 text-cyan-400" />
            <span>Species</span>
          </Link>
          <Link to="/admin/tanks" className="flex items-center gap-2.5 p-2.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Tanks</span>
          </Link>
          
          <div className="pt-4 border-t border-slate-800 mt-4">
            <Link to="/" className="flex items-center gap-2.5 p-2.5 hover:bg-slate-800 rounded-lg text-cyan-300 hover:text-cyan-200 transition">
              <Globe className="w-4 h-4" />
              <span>Public Landing Page</span>
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg text-xs font-semibold transition">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white p-4 shadow-sm border-b border-slate-200 flex justify-between items-center">
          <div className="font-semibold text-sm text-slate-700">Piyush Aquatic Operations Management</div>
          <Link to="/" className="text-xs font-semibold text-cyan-700 hover:underline flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </Link>
        </header>
        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
