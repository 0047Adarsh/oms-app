'use client';

import { useState } from 'react';
import '@/styles/AdminLayout.css';


export default function StatusUpdateButton({ order, onUpdate }) {
  const statusFlow = {
    'Order Placed': 'Packing',
    'Packing': 'Packed',
    'Packed': 'Shipped',
    'Shipped': 'Delivered',
    'Delivered': 'Delivered',
    'Cancelled': 'Cancelled'
  };

  const nextStatus = statusFlow[order.status];

  const [status, setStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    const newStatus = statusFlow[status];
    
    if (newStatus === status) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:4000/api/orders/${order.order_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update');

      const result = await res.json();

      setStatus(newStatus);
      onUpdate?.(result.order);
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const isTerminalStatus = ['Delivered', 'Cancelled'].includes(status);

  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      {/* <span className={`status-badge ${statusClass} inline-block mb-2`}>{status}</span> */}

      <button
        onClick={handleStatusUpdate}
        disabled={isTerminalStatus}
        className={`btn-sm ${isTerminalStatus ? 'btn-disabled' : 'btn-primary'}`}
      >
        {isUpdating ? 'Updating...' : isTerminalStatus ? 'Final Status' : 'Update'}
      </button>
    </div>
  );
}