'use client';

import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import '@/styles/OrderTable.css';

export default function AdminOrdersPage() {
  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Bottle Type', accessor: 'bottleType' },
    { header: 'Qty', accessor: 'quantity' },
    { header: 'Delivery Date', accessor: 'deliveryDate' },
    {
        header: 'Status',
        accessor: 'status',
        render: (row) => {
          const statusClass = row.status.toLowerCase().replace(/\s+/g, '-');
          return (
            <span className={`status-badge ${statusClass}`}>
              {row.status}
            </span>
          );
        },
      },
    ];

  const data = [
    {
      id: '#1001',
      orderDate: 'Apr 1, 2025',
      customerName: 'John Doe',
      phone: '+91 98765 12345',
      bottleType: '5L',
      quantity: 2,
      deliveryDate: 'Apr 5, 2025',
      status: 'Processing',
    },
    {
      id: '#1002',
      orderDate: 'Apr 2, 2025',
      customerName: 'Jane Smith',
      phone: '+91 98765 67890',
      bottleType: '1L',
      quantity: 5,
      deliveryDate: 'Apr 6, 2025',
      status: 'Delivered',
    },
  ];

  const handleStatusUpdate = (order) => {
    alert(`Update status for ${order.id}`);
    // TODO: Open modal or call API to update status
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <Card title="All Orders">
        <DataTable columns={columns} data={data} onStatusUpdate={handleStatusUpdate} />
      </Card>
    </>
  );
}