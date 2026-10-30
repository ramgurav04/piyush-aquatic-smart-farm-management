import React, { useState } from 'react';
import { Activity, Check, ClipboardList, Plus, Save } from 'lucide-react';
import { useCommerce } from '../hooks/useCommerce';
import { customerDemoAccounts } from '../mocks/demoAccounts';

type ModuleId = 'species' | 'tanks' | 'inventory' | 'customers' | 'orders' | 'staff' | 'reports' | 'tasks' | 'water' | 'feeding' | 'mortality';

interface ModuleConfig {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
  action?: string;
}

const modules: Record<ModuleId, ModuleConfig> = {
  species: { title: 'Species & breeding', description: 'Demo species register and breeding batch overview.', columns: ['Species', 'Category', 'Breeding batch', 'Status'], rows: [['Discus', 'Cichlid', 'Demo batch D-04', 'Monitoring'], ['Angelfish', 'Cichlid', 'Demo batch A-02', 'Active'], ['Guppy', 'Livebearer', 'Demo batch G-08', 'Active']], action: 'Add demo species' },
  tanks: { title: 'Tank management', description: 'Example tank assignments and water log status. No readings represent real farm conditions.', columns: ['Tank', 'Assignment', 'pH', 'Temperature', 'Status'], rows: [['T-012', 'Discus · demo batch', '6.8', '28°C', 'Demo record'], ['T-045', 'Ram Cichlid · demo pair', '7.0', '27°C', 'Check flagged'], ['T-081', 'Angelfish · demo batch', '6.9', '27°C', 'Demo record']], action: 'Add demo record' },
  inventory: { title: 'Inventory & stock movements', description: 'Illustrative supplies and movement log. Quantities are not live farm stock.', columns: ['Item', 'Type', 'Movement', 'Reference'], rows: [['Pellet feed · demo', 'Feed', 'Demo entry', 'MOV-001'], ['Water conditioner · demo', 'Treatment', 'Demo entry', 'MOV-002'], ['Filter sponge · demo', 'Equipment', 'Demo entry', 'MOV-003']], action: 'Record movement' },
  customers: { title: 'Customer management', description: 'Customer records from the demo account flow.', columns: ['Customer', 'Type', 'Contact', 'Account'], rows: [['Aarav Patil', 'Individual', 'individual@piyushaquatic.com', 'Demo'], ['Mumbai Marine Aquatics', 'Business', 'business@piyushaquatic.com', 'Demo']] },
  orders: { title: 'Customer enquiries', description: 'Enquiries are mock requests saved in the current browser only.', columns: ['Reference', 'Customer', 'Request', 'Status'], rows: [], action: 'Advance selected demo status' },
  staff: { title: 'Staff management', description: 'Internal access is separate from public customer registration.', columns: ['Team member', 'Role', 'Access', 'Status'], rows: [['Farm Supervisor', 'STAFF', 'Farm tasks & records', 'Demo account'], ['Ram Prakash Gurav', 'ADMIN', 'All management modules', 'Demo account']] },
  reports: { title: 'Reports & analytics', description: 'Sample indicators only; no live sales, stock, breeding, or water records are connected.', columns: ['Report', 'Period', 'Indicator', 'Data source'], rows: [['Enquiry activity', 'Demo month', 'Illustrative', 'Browser mock data'], ['Water record trends', 'Demo week', 'Illustrative', 'Browser mock data'], ['Inventory movement', 'Demo month', 'Illustrative', 'Browser mock data']] },
  tasks: { title: 'Assigned tasks', description: 'Mark a task complete to demonstrate the staff workflow.', columns: ['Task', 'Area', 'Due', 'Status'], rows: [['Review demo tank T-012 log', 'Water quality', 'Today', 'Open'], ['Record demo feeding round', 'Feeding', 'Today', 'Open'], ['Check demo equipment log', 'Inventory', 'Tomorrow', 'Open']], action: 'Mark task complete' },
  water: { title: 'Water quality records', description: 'Sample readings are illustrative only and must not be used as real farm conditions.', columns: ['Tank', 'pH', 'Dissolved oxygen', 'Temperature', 'Ammonia'], rows: [['T-012 · demo', '6.8', '7.1 mg/L', '28°C', '0.02 mg/L'], ['T-045 · demo', '7.0', '6.8 mg/L', '27°C', '0.03 mg/L']], action: 'Add demo reading' },
  feeding: { title: 'Feeding records', description: 'Add a local demo record to illustrate the workflow.', columns: ['Tank / batch', 'Feed type', 'Recorded', 'Note'], rows: [['T-012 · demo', 'Pellet · demo', 'Today · demo', 'Routine sample'], ['T-045 · demo', 'Live feed · demo', 'Yesterday · demo', 'Illustrative only']], action: 'Record feeding' },
  mortality: { title: 'Fish mortality records', description: 'Use only actual verified farm observations in a production system.', columns: ['Tank / batch', 'Species', 'Count', 'Recorded'], rows: [['T-012 · demo', 'Discus', '0 · sample', 'Today · demo'], ['T-045 · demo', 'Ram Cichlid', '1 · sample', 'Yesterday · demo']], action: 'Record observation' },
};

interface ManagementModuleProps {
  module: ModuleId;
}

export const ManagementModule: React.FC<ManagementModuleProps> = ({ module }) => {
  const config = modules[module];
  const { orders, updateOrderStatus } = useCommerce();
  const [rows, setRows] = useState(config.rows);
  const [completed, setCompleted] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const addRecord = () => {
    if (module === 'tasks') {
      const current = rows.find((row) => row[3] === 'Open' && !completed.includes(row[0]));
      if (current) setCompleted((done) => [...done, current[0]]);
      setMessage(current ? `Completed: ${current[0]}` : 'All sample tasks are complete.');
      return;
    }
    if (module === 'orders') {
      const current = orders.find((order) => order.status !== 'COMPLETED');
      if (!current) {
        setMessage('All demo enquiries are completed.');
        return;
      }
      updateOrderStatus(current.id, current.status === 'PENDING' ? 'CONFIRMED' : 'COMPLETED');
      setMessage(`Updated ${current.id} to ${current.status === 'PENDING' ? 'CONFIRMED' : 'COMPLETED'}.`);
      return;
    }
    const newRow = config.columns.map((_, index) => index === 0 ? `New ${module} demo entry` : 'Demo entry');
    setRows((current) => [...current, newRow]);
    setMessage('A local demo row was added. No data was sent to a server.');
  };
  return <div className="management-page"><div className="management-page-title"><div><span className="eyebrow">FARM MANAGEMENT · DEMO</span><h1>{config.title}</h1><p>{config.description}</p></div><span className="demo-pill"><Activity size={14} /> DEMO MODULE</span></div><section className="management-panel"><div className="management-panel-heading"><div><ClipboardList size={19} /><b>{config.title} records</b></div>{config.action && <button className="button button-outline small-button" onClick={addRecord}><Plus size={15} />{config.action}</button>}</div><div className="management-table-wrap"><table className="management-table"><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{module === 'orders' ? orders.map((order) => <tr key={order.id}><td className="table-code">{order.id}</td><td>{customerDemoAccounts.find((account) => account.user.id === order.customerId)?.user.name ?? 'Customer demo account'}</td><td>{order.items.map((item) => `${item.fishName} × ${item.quantity}`).join(', ')}</td><td><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></td></tr>) : rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{module === 'tasks' && index === 3 && completed.includes(row[0]) ? <span className="status-pill status-completed"><Check size={13} /> COMPLETED</span> : cell}</td>)}</tr>)}</tbody></table></div>{message && <p className="inline-feedback" role="status"><Save size={15} />{message}</p>}<p className="demo-note">All entries on this screen are mock data for frontend demonstration.</p></section></div>;
};
