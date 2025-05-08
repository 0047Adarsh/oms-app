'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import '@/styles/Dashboard.css';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [ordersRes, complaintsRes] = await Promise.all([
          fetch('http://localhost:4000/api/orders'),
          fetch('http://localhost:4000/api/complaints')
        ]);

        const ordersData = await ordersRes.json();
        const complaintsData = await complaintsRes.json();

        setOrders(ordersData);
        setComplaints(complaintsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    }

    loadData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Count statuses
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const pendingOrders = orders.filter(o => ['Order Placed', 'Packing', 'Packed', 'Shipped'].includes(o.status)).length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').status;

  const openComplaints = complaints.filter(c => c.status === 'Open').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
  const inProgressComplaints = complaints.filter(c => ['Processing', 'Under Review'].includes(c.status)).length;
  const closedComplaints = complaints.filter(c => c.status === 'Closed').length;

  // Recent Orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
    .slice(0, 5);

  // Recent Complaints
  const recentComplaints = [...complaints]
    .filter(c => c.status !== 'Closed')
    .sort((a, b) => new Date(b.complaint_date) - new Date(a.complaint_date))
    .slice(0, 5);

  // Stats cards
  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: '📦',
      trend: '+12% from last week',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: '🕒',
      trend: `${pendingOrders} active`,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'Delivered Orders',
      value: deliveredOrders,
      icon: '✅',
      trend: `${Math.round((deliveredOrders / totalOrders) * 100 || 0)}% of total`,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Open Complaints',
      value: openComplaints,
      icon: '⚠️',
      trend: `${inProgressComplaints} under review`,
      color: 'from-red-500 to-rose-600'
    }
  ];

  // Columns for tables
  const orderColumns = [
    { header: 'Order ID', accessor: 'order_id' },
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Bottle Type', accessor: 'bottle_type' },
    { header: 'Qty', accessor: 'quantity' },
    { header: 'Delivery Date', render: row => formatDate(row.delivery_date) },
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
      }
    }
  ];

  const complaintColumns = [
    { header: 'Complaint ID', accessor: 'complain_id' },
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Type', accessor: 'complaint_type' },
    { header: 'Description', accessor: 'description' },
    { header: 'Date', render: row => formatDate(row.complaint_date) },
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
      }
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-card-content ${stat.color}`}>
              <div className="stat-header">
                <p className="stat-title">{stat.title}</p>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-trend">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Orders" className="bg-white shadow-md">
          <DataTable columns={orderColumns} data={recentOrders} />
        </Card>

        <Card title="Recent Complaints" className="bg-white shadow-md">
          <DataTable columns={complaintColumns} data={recentComplaints} />
        </Card>
      </div>
    </div>
  );
}