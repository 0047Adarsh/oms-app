// // src/routes/userRoutes.js

// import express from 'express';
// import pool from '../db/connection.js';

// const router = express.Router();

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM public.customers ORDER BY created_at DESC');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('GET /api/customers failed:', err.message);
//     res.status(500).json({ error: 'Failed to fetch customers' });
//   }
// });

// // POST create new user
// router.post('/', async (req, res) => {
//   const { customer_name, phone, moq, buffer_days, bottle_volumes, password } = req.body;

//   if (!customer_name || !password) {
//     return res.status(400).json({ error: 'Customer name and password are required' });
//   }

//   try {
//     const result = await pool.query(
//       `INSERT INTO public.customers (
//         customer_name, phone, moq, buffer_days, bottle_volumes, password
//       ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
//       [customer_name, phone, moq || 10, buffer_days || 3, JSON.stringify(bottle_volumes), password]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('POST /api/users failed:', error.message);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// router.patch('/:id', async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   const keys = Object.keys(updates);
//   const values = Object.values(updates);
//   const setClause = keys.map((key, i) =>
//     `"${key}" = $${i + 1}`
//   ).join(', ');

//   try {
//     const result = await pool.query(
//       `UPDATE public.customers SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
//       [...values, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('PATCH /api/customers/:id failed:', error.message);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// export default router;

import express from 'express';
import supabase from '../db/supabaseClient.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET /api/customers failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// POST create new user
// router.post('/', async (req, res) => {
//   const { customer_name, phone, moq, buffer_days, bottle_volumes, password } = req.body;

//   if (!customer_name || !password) {
//     return res.status(400).json({ error: 'Customer name and password are required' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('customers')
//       .insert([
//         {
//           customer_name,
//           phone,
//           moq: moq || 10,
//           buffer_days: buffer_days || 3,
//           bottle_volumes: bottle_volumes ? JSON.stringify(bottle_volumes) : null,
//           password
//         }
//       ])
//       .select()
//       .single();

//     if (error) throw error;

//     res.status(201).json(data);
//   } catch (error) {
//     console.error('POST /api/customers failed:', error.message);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

router.post('/', async (req, res) => {
  const {
    customer_name,
    phone,
    moq,
    buffer_days,
    bottle_volumes,
    password
  } = req.body;

  if (!customer_name || !password) {
    return res.status(400).json({
      error: 'Customer name and password are required'
    });
  }

  try {
    // Safely parse bottle_volumes if it's a string
    let parsedBottleVolumes = bottle_volumes;

    if (typeof bottle_volumes === 'string') {
      try {
        parsedBottleVolumes = JSON.parse(bottle_volumes);
        if (!Array.isArray(parsedBottleVolumes)) {
          parsedBottleVolumes = [];
        }
      } catch (e) {
        parsedBottleVolumes = [];
      }
    }

    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          customer_name,
          phone,
          moq: moq || 10,
          buffer_days: buffer_days || 3,
          bottle_volumes: parsedBottleVolumes, // ✅ Always send as array
          password
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('POST /api/customers failed:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PATCH update user by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Remove fields that should not be updated manually
  const { created_at, updated_at, ...allowedUpdates } = updates;

  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...allowedUpdates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST106') {
        return res.status(404).json({ error: 'User not found' });
      }
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Failed to update user' });
    }

    res.json(data);
  } catch (err) {
    console.error('PATCH /api/customers/:id failed:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

export default router;