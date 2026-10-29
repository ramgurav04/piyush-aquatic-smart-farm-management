import React from 'react';
import { Fish, Layers, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const kpiData = [
    { label: 'Total Fish Stock', value: '24,850 pcs', change: '+12% this month', icon: Fish, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Active Tanks', value: '186 / 200', change: '14 Quarantine/Empty', icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Pending B2B Orders', value: '18 Orders', change: '₹2,45,000 value', icon: ShoppingCart, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Water Quality Alerts', value: '2 Tanks', change: 'Requires pH adjustment', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Farm Overview Dashboard</h1>
        <p className="text-sm text-slate-500">Real-time status across Dabhil breeding facility.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
                <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900">{kpi.value}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" /> {kpi.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tank Quick Status Summary */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Top Priority Breeding Pairs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3">Tank ID</th>
                <th className="p-3">Species Pair</th>
                <th className="p-3">Spawning Stage</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-mono font-bold text-cyan-700">T-012</td>
                <td className="p-3">Discus (Blue Turquoise x Red Cover)</td>
                <td className="p-3">Eggs Hatching (Day 3)</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold">Optimal</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-cyan-700">T-045</td>
                <td className="p-3">German Ram Cichlid Pair #02</td>
                <td className="p-3">Free-Swimming Fry</td>
                <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">Check pH</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};