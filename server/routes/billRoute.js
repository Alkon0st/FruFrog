const express = require('express');
const Bill = require('../models/billModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bills' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, date, category, amount, tax, splitTax, members, paid, percentPaid, total } = req.body;

    const bill = new Bill({
      title,
      date,
      category,
      amount,
      tax,
      splitTax,
      members,
      paid,
      percentPaid,
      total,
    });

    await bill.save();
    res.status(201).json({ message: 'Bill created', bill });
  } catch (err) {
    console.error('Error saving bill:', err);
    res.status(500).json({ message: 'Failed to save bill' });
  }
});

module.exports = router;