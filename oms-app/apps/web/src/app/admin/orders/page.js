'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import StatusUpdateButton from '@/components/StatusUpdateButton';
import '@/styles/OrderTable.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      // order.order_id.includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
  
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = (data) => {
    const csvRows = [];
    csvRows.push(['Order ID', 'Customer', 'Order Date','Phone', 'Bottle Type', 'Quantity', 'Delivery Date', 'Status'].join(','));
    data.forEach((order) => {
      csvRows.push(
        [
          `"${order.order_id}"`,
          `"${order.customer_name}"`,
          `"${order.order_date}"`,
          `"${order.phone}"`,
          `"${order.bottle_type}"`,
          order.quantity,
          `"${formatDate(order.delivery_date)}"`,
          `"${order.status}"`
        ].join(',')
      );
    });
  

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'orders.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('http://localhost:4000/api/orders');
        const data = await res.json();
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
   
{
    header: 'Action',
    accessor: 'action',
    render: (row) => (
      <StatusUpdateButton
        order={row}
        onUpdate={(updatedOrder) => {
          setOrders(orders.map(o => o.order_id === updatedOrder.order_id ? updatedOrder : o));
        }}
      />
    ),
  },
  
];


  const handleStatusUpdate = (order) => {
    alert(`Update status for ${order.id}`);
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

      {/* <div className="flex flex-wrap gap-4 mb-6">

        <div className="flex-grow min-w-[200px]">
            <input
            type="text"
            placeholder="Search by Order ID or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>


        <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
        >
            <option value="All">All Status</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </select>

        <button
            onClick={() => exportToCSV(filteredOrders)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
            📥 Export to CSV
        </button>
        </div> */}

<div className="filters-container">
  <div className="relative search-container">
    <input
      type="text"
      placeholder="Search by Order ID or Customer"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input"
    />
    <span className="search-icon"><SearchIcon/></span>
  </div>

  <div className="filter-item">
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="All">All Status</option>
      <option value="Order Placed">Order Placed</option>
      <option value="Packing">Packing</option>
      <option value="Packed">Packed</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </div>

  <div className="flex gap-2">
    <button className="export-button" onClick={() => exportToCSV(filteredOrders)}>
      <FileDownloadIcon/> Export
    </button>

    {(searchQuery || filterStatus !== 'All') && (
      <button
        className="clear-filters-btn"
        onClick={() => {
          setSearchQuery('');
          setFilterStatus('All');
        }}
      >
        Clear Filters
      </button>
    )}
  </div>
</div>

      <Card title="All Orders">
        <DataTable columns={columns} data={filteredOrders} onStatusUpdate={handleStatusUpdate} />
      </Card>
    </>
  );
}