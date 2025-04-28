const express = require('express');
const db = require('../firebase');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('bills').orderBy('createdAt', 'desc').get();
    const bills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bills' });
  }
});

router.post('/', async (req, res) => {
  try {
    const bill = req.body;
    const ref = await db.collection('bills').add({ ...bill, createdAt: Date.now() });
    res.status(201).json({ id: ref.id, ...bill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save bill' });
  }
});

module.exports = router;