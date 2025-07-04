const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /bookings
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bookings ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /bookings
router.post('/', async (req, res) => {
  const { name, phone, date, time_slot, notes } = req.body;
  try {
    await db.query(
      `INSERT INTO bookings (name, phone, date, time_slot, notes)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, phone, date, time_slot, notes]
    );
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
