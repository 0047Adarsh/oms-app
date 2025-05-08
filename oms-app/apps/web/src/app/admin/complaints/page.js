'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import ComplaintStatusUpdateButton from '@/components/StatusUpdateButton';
import '@/styles/OrderTable.css';

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Status flow for complaints
  const statusFlow = {
    Open: 'Processing',
    Processing: 'Under Review',
    'Under Review': 'Resolved',
    Resolved: 'Resolved',
    Closed: 'Closed'
  };

  // Fetch complaints
  useEffect(() => {
    async function fetchComplaints() {
      try {
        const res = await fetch('http://localhost:4000/api/complaints');
        const data = await res.json();
    
        setComplaints(data);
      } catch (err) {
        alert('Failed to load complaints');
        console.error('Load complaints failed:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.complain_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Export to CSV
  const exportToCSV = (data) => {
    const csvRows = [];
    csvRows.push([
      'Complaint ID',
      'Customer',
      'Phone',
      'Type',
      'Description',
      'Status',
      'Resolution Notes',
      'Date',
      'Resolution Date'
    ].join(','));

    data.forEach(c => {
      csvRows.push([
        `"${c.complain_id}"`,
        `"${c.customer_name}"`,
        `"${c.phone_number}"`,
        `"${c.complaint_type}"`,
        `"${c.description.replace(/"/g, '""')}"`,
        `"${c.status}"`,
        `"${(c.resolution_notes || '').replace(/"/g, '""')}"`,
        `"${formatDate(c.complaint_date)}"`,
        `"${c.resolution_date ? formatDate(c.resolution_date) : ''}"`
      ].join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'complaints.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleStatusUpdate = (updatedComplaint) => {
    setComplaints(complaints.map(c => c.complain_id === updatedComplaint.complain_id ? updatedComplaint : c));
  };

  const columns = [
    { header: 'Complaint ID', accessor: 'complain_id' },
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Phone', accessor: 'phone_number' },
    { header: 'Type', accessor: 'complaint_type' },
    { header: 'Description', accessor: 'description' },
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
    },
    { header: 'Complaint Date', render: (row) => formatDate(row.complaint_date) },
    { header: 'Resolution Date', render: (row) => row.resolution_date ? formatDate(row.resolution_date) : '-' },
    {
      header: 'Action',
      render: (row) => (
        <ComplaintStatusUpdateButton
          order={row}
          onUpdate={handleStatusUpdate}
        />
      )
    } 
    // {
    //   header: 'Action',
    //   render: (row) => (
    //     <cComplaintStatusUpdateButton
    //       complaint={row}
    //       onUpdate={(updatedComplaint) => {
    //         setComplaints((prev) =>
    //           prev.map(c => c.complain_id === updatedComplaint.complain_id ? updatedComplaint : c)
    //         );
    //       }}
    //     />
    //   ),
    // }
  ];

  const statusOptions = ['All', ...new Set(complaints.map(c => c.status))];

  if (loading) return <p>Loading complaints...</p>;
  if (!complaints.length) return <p>No complaints found.</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Manage Complaints</h2>

      <div className="filters-container">
        <div className="filter-item">
          <input
            type="text"
            placeholder="Search by Complaint ID or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => exportToCSV(filteredComplaints)}
            className="export-button"
          >
            📥 Export to CSV
          </button>

          {(searchQuery || filterStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('All');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Showing <strong>{filteredComplaints.length}</strong> of{' '}
        <strong>{complaints.length}</strong> complaints
      </p>

      <Card title="All Complaints">
        <DataTable columns={columns} data={filteredComplaints} />
      </Card>
    </>
  );
}