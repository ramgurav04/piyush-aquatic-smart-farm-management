export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow border">Total Fish: 1,200</div>
        <div className="bg-white p-4 rounded shadow border">Active Tanks: 12</div>
        <div className="bg-white p-4 rounded shadow border">Pending Orders: 5</div>
      </div>
    </div>
  )
}
