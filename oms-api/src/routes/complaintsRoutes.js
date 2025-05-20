import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM complaints ORDER BY complaint_date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// router.patch('/:id/status', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const resolution_notes = "Something";

//   if (!status) {
//     return res.status(400).json({ error: 'Status is required' });
//   }

//   try {
//     const result = await pool.query(
//       `UPDATE complaints
//        SET status = $1, resolution_notes = $2, resolution_date = CASE WHEN $1 = 'Resolved' THEN NOW() ELSE resolution_date END, updated_at = NOW()
//        WHERE complain_id = $3 RETURNING *`,
//       [status, resolution_notes,id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }

//     res.json({ message: 'Status updated', complaint: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update complaint status' });
//   }
// });

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params; // ✅ This is a string now
  const { status } = req.body;
  const resolution_notes = "Nothing";

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const result = await pool.query(
      `UPDATE public.complaints
       SET status = $1::VARCHAR, 
           resolution_notes = $2,
           resolution_date = CASE WHEN $1 = 'Resolved' THEN NOW() ELSE resolution_date END,
           updated_at = NOW()
       WHERE complain_id = $3
       RETURNING *`,
      [status, resolution_notes || '', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Status updated', complaint: result.rows[0] });
  } catch (err) {
    console.error('Status update failed:', err.message);
    res.status(500).json({ error: 'Failed to update complaint status' });
  }
});

export default router;