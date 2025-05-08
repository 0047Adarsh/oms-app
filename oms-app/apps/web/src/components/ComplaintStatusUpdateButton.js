// components/ComplaintStatusUpdateButton.js

'use client';

import { useState, useEffect } from 'react';

export default function ComplaintStatusUpdateButton({ complaint, onUpdate }) {
  // State
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(complaint);

  // Only update local state when prop changes
  useEffect(() => {
    if (complaint) {
      setCurrentComplaint(complaint);
    }
  }, [complaint]);

  // If no valid complaint yet, don’t render anything
  if (!currentComplaint) return null;

  // Status flow logic
  const statusFlow = {
    Open: 'Processing',
    Processing: 'Under Review',
    'Under Review': 'Resolved',
    Resolved: 'Resolved',
    Closed: 'Closed'
  };

  const nextStatus = statusFlow[currentComplaint.status];

  const isTerminal = ['Resolved', 'Closed'].includes(currentComplaint.status);

  // Handle Update
  const handleStatusUpdate = async () => {
    if (isTerminal || !nextStatus) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:4000/api/complaints/${currentComplaint.complain_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          resolution_notes: nextStatus === 'Resolved' ? 'Automatically resolved' : ''
        })
      });

      if (!res.ok) throw new Error('Failed to update');

      const result = await res.json();
      const updatedComplaint = result.complaint;

      setCurrentComplaint(updatedComplaint);
      onUpdate?.(updatedComplaint);
    } catch (err) {
      alert('Failed to update complaint status');
      console.error('Status update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusClass = currentComplaint.status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col items-start">
      <span className={`status-badge ${statusClass}`}>
        {currentComplaint.status}
      </span>

      {!isTerminal && (
        <button
          onClick={handleStatusUpdate}
          disabled={isTerminal}
          className={`btn-sm mt-2 ${isTerminal ? 'btn-disabled' : 'btn-primary'}`}
        >
          {isUpdating ? 'Updating...' : `Set to "${nextStatus}"`}
        </button>
      )}
    </div>
  );
}