'use client';

import { useState, useEffect } from 'react';


export default function ComplaintStatusUpdateButton({ complaint, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(complaint);
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    if (complaint) {
      setCurrentComplaint(complaint);
      setResolutionNotes(complaint.resolution_notes || '');
    }
  }, [complaint]);

  if (!currentComplaint) return null;

  const statusFlow = {
    'Open': 'Processing',
    'Processing': 'Under Review',
    'Under Review': 'Resolved',
    'Resolved': 'Resolved',
    'Closed': 'Closed'
  };

  const nextStatus = statusFlow[currentComplaint.status];

  const isTerminal = ['Resolved', 'Closed'].includes(currentComplaint.status);

  const handleStatusUpdate = async () => {
    if (isTerminal || !nextStatus) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:4000/api/complaints/${currentComplaint.complain_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus
        })
      });

      if (!res.ok) throw new Error('Failed to update');

      const result = await res.json();
      const updatedComplaint = result.complaint;

      setCurrentComplaint(updatedComplaint);
      onUpdate?.(updatedComplaint);
    } catch (err) {
      alert('Failed to update status. Check console for details.');
      console.error('Status update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusClass = currentComplaint.status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col items-start">
      {/* <span className={`status-badge ${statusClass}`}>
        {currentComplaint.status}
      </span> */}

<textarea
        value={resolutionNotes}
        onChange={(e) => setResolutionNotes(e.target.value)}
        placeholder="Enter resolution notes..."
        className="w-full p-2 border border-gray-300 rounded mt-2 text-sm"
        disabled={isTerminal}
      />

      {!isTerminal && (
        <button
          onClick={handleStatusUpdate}
          disabled={isTerminal}
          className={`btn-sm mt-2 ${isTerminal ? 'btn-disabled' : 'btn-primary'}`}
        >
          {isUpdating
            ? 'Updating...'
            : isTerminal
            ? 'No Action'
            : nextStatus
            ? `${nextStatus}`
            : 'No Next Status'}
        </button>
      )}
    </div>
  );
}