import Card from '@/components/Card';

export default function AdminDashboardPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Orders">
          <p className="text-3xl font-bold">245</p>
        </Card>

        <Card title="Pending Complaints">
          <p className="text-3xl font-bold text-yellow-600">12</p>
        </Card>

        <Card title="Revenue (Monthly)">
          <p className="text-3xl font-bold">$12,450</p>
        </Card>
      </div>

      <Card title="Recent Orders">
        <OrderTable />
      </Card>
    </>
  );
}

function OrderTable() {
  return (
    <table className="min-w-full table-auto mt-4">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="py-2 px-4">Order ID</th>
          <th className="py-2 px-4">Customer</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-2 px-4">#1001</td>
          <td className="py-2 px-4">John Doe</td>
          <td className="py-2 px-4 text-green-600">Delivered</td>
          <td className="py-2 px-4">Apr 1, 2025</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 px-4">#1002</td>
          <td className="py-2 px-4">Jane Smith</td>
          <td className="py-2 px-4 text-yellow-600">Processing</td>
          <td className="py-2 px-4">Apr 2, 2025</td>
        </tr>
      </tbody>
    </table>
  );
}