// src/routes/userRoutes.js

import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/users failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST create new user
router.post('/', async (req, res) => {
  const { customer_name, phone, moq, buffer_days, bottle_volumes, password } = req.body;

  if (!customer_name || !password) {
    return res.status(400).json({ error: 'Customer name and password are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO public.users (
        customer_name, phone, moq, buffer_days, bottle_volumes, password
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customer_name, phone, moq || 10, buffer_days || 3, JSON.stringify(bottle_volumes), password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST /api/users failed:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PATCH update user
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const keys = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = keys.map((key, i) =>
    `"${key}" = $${i + 1}`
  ).join(', ');

  try {
    const result = await pool.query(
      `UPDATE public.users SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('PATCH /api/users/:id failed:', error.message);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export default router;