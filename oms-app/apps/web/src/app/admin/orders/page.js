'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import '@/styles/OrderTable.css';

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('http://localhost:4000/api/orders');
        const data = await res.json();
        alert(data);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        alert('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const columns = [
    { header: 'Order ID', accessor: 'order_id' },
    { header: 'Order Date', accessor: 'order_date', render: (row)=> formatDate(row.order_date) },
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Bottle Type', accessor: 'bottle_type' },
    { header: 'Qty', accessor: 'quantity' },
    { header: 'Delivery Date', accessor: 'delivery_date', render: (row)=> formatDate(row.delivery_date) },
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


  const handleStatusUpdate = (order) => {
    alert(`Update status for ${order.id}`);
    // TODO: Open modal or call API to update status
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!orders.length && !loading) {
    return <p className="text-gray-500">No orders found.</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <Card title="All Orders">
        <DataTable columns={columns} data={orders} onStatusUpdate={handleStatusUpdate} />
      </Card>
    </>
  );
}