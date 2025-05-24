// import express from 'express';
// import pool from '../db/connection.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM complaints ORDER BY complaint_date DESC');
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch complaints' });
//   }
// });

// // router.patch('/:id/status', async (req, res) => {
// //   const { id } = req.params;
// //   const { status } = req.body;
// //   const resolution_notes = "Something";

// //   if (!status) {
// //     return res.status(400).json({ error: 'Status is required' });
// //   }

// //   try {
// //     const result = await pool.query(
// //       `UPDATE complaints
// //        SET status = $1, resolution_notes = $2, resolution_date = CASE WHEN $1 = 'Resolved' THEN NOW() ELSE resolution_date END, updated_at = NOW()
// //        WHERE complain_id = $3 RETURNING *`,
// //       [status, resolution_notes,id]
// //     );

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: 'Complaint not found' });
// //     }

// //     res.json({ message: 'Status updated', complaint: result.rows[0] });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Failed to update complaint status' });
// //   }
// // });

// router.patch('/:id/status', async (req, res) => {
//   const { id } = req.params; // ✅ This is a string now
//   const { status } = req.body;
//   const resolution_notes = "Nothing";

//   if (!status) {
//     return res.status(400).json({ error: 'Status is required' });
//   }

//   try {
//     const result = await pool.query(
//       `UPDATE public.complaints
//        SET status = $1::VARCHAR, 
//            resolution_notes = $2,
//            resolution_date = CASE WHEN $1 = 'Resolved' THEN NOW() ELSE resolution_date END,
//            updated_at = NOW()
//        WHERE complain_id = $3
//        RETURNING *`,
//       [status, resolution_notes || '', id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Complaint not found' });
//     }

//     res.json({ message: 'Status updated', complaint: result.rows[0] });
//   } catch (err) {
//     console.error('Status update failed:', err.message);
//     res.status(500).json({ error: 'Failed to update complaint status' });
//   }
// });

// export default router;

import express from 'express';
import supabase from '../db/supabaseClient.js';

const router = express.Router();

// GET all complaints
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('complaint_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching complaints:', error.message);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// PATCH update complaint status
// router.patch('/:id/status', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const resolution_notes = "Nothing";

//   if (!status) {
//     return res.status(400).json({ error: 'Status is required' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('complaints')
//       .update({
//         status,
//         resolution_notes,
//         resolution_date: status === 'Resolved' ? new Date().toISOString() : undefined,
//         updated_at: new Date().toISOString()
//       })
//       .eq('complain_id', id)
//       .select()
//       .single();

//     if (error) {
//       if (error.code === 'PGRST106') {
//         // No rows found
//         return res.status(404).json({ error: 'Complaint not found' });
//       }
//       console.error('Supabase error:', error);
//       return res.status(500).json({ error: 'Failed to update complaint status' });
//     }

//     res.json({ message: 'Status updated', complaint: data });
//   } catch (err) {
//     console.error('Unexpected error:', err.message);
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// });

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, resolution_notes } = req.body;

  try {
    const updateData = {};

    if (status !== undefined && status !== null) {
      updateData.status = status;
      updateData.updated_at = new Date().toISOString();
    }

    // Only update resolution_notes if provided
    if (resolution_notes !== undefined && resolution_notes !== null) {
      updateData.resolution_notes = resolution_notes.trim() || '';
    }

    // Set resolution_date only if status is "Resolved"
    if (updateData.status === 'Resolved') {
      updateData.resolution_date = new Date().toISOString();
    }

    // If no data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    // Perform the update
    const { data, error } = await supabase
      .from('complaints')
      .update(updateData)
      .eq('complain_id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST106') {
        return res.status(404).json({ error: 'Complaint not found' });
      }
      throw error;
    }

    res.json({ message: 'Complaint updated successfully', complaint: data });
  } catch (err) {
    console.error('Error updating complaint:', err.message);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});


export default router;