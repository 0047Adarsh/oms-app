// components/OrderStatusUpdateButton.js

'use client';

import { useState } from 'react';

export default function OrderStatusUpdateButton({ order, onUpdate }) {
  const statusFlow = {
    'Order Placed': 'Packing',
    'Packing': 'Packed',
    'Packed': 'Shipped',
    'Shipped': 'Delivered',
    'Delivered': 'Delivered',
    'Cancelled': 'Cancelled'
  };

  const nextStatus = statusFlow[order.status];
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);

  const isTerminal = ['Delivered', 'Cancelled'].includes(currentOrder.status);

  const handleStatusUpdate = async () => {
    if (isTerminal || nextStatus === currentOrder.status) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:4000/api/orders/${currentOrder.order_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus, phone:currentOrder.phone })
      });

      if (!res.ok) throw new Error('Update failed');

      const result = await res.json();

      setCurrentOrder(result.order);
      onUpdate?.(result.order);
    } catch (err) {
      alert('Failed to update status. Check console for details.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusClass = currentOrder.status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col items-start">
      {/* <span className={`status-badge ${statusClass}`}>
        {currentOrder.status}
      </span> */}

      {!isTerminal && (
        <button
          onClick={handleStatusUpdate}
          disabled={isTerminal}
          className={`btn-sm mt-2 ${isTerminal ? 'btn-disabled' : 'btn-primary'}`}
        >
          {isUpdating ? 'Updating...' : `${nextStatus}`}
        </button>
      )}
    </div>
  );
}