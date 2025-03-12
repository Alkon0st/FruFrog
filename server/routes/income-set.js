const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/user');

/* 
// IF we need an extension for user info????
const userSchema = new mongoose.Schema({
  // Existing user fields (username, email, password, etc.)
  
  // Income information
  income: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly', 'annually'],
      default: 'monthly'
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }
});
*/

// Validation middleware for income update
const validateIncomeUpdate = [
  body('amount')
    .isNumeric()
    .withMessage('Income amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Income amount must be a positive number'),
  body('currency')
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code (e.g., USD, EUR, GBP)')
    .isUppercase()
    .withMessage('Currency code must be uppercase'),
  body('frequency')
    .optional()
    .isIn(['weekly', 'biweekly', 'monthly', 'annually'])
    .withMessage('Frequency must be weekly, biweekly, monthly, or annually')
];

router.put('/set-income', authenticateUser, validateIncomeUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency, frequency } = req.body;
    
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.income = {
      amount: amount,
      currency: currency || user.income?.currency || 'USD',
      frequency: frequency || user.income?.frequency || 'monthly',
      lastUpdated: Date.now()
    };

    await user.save();

    res.status(200).json({
      message: 'Income updated successfully',
      income: user.income
    });
  } catch (error) {
    console.error('Income update error:', error);
    res.status(500).json({
      message: 'An error occurred while updating income',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/income', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).select('income');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      income: user.income || { 
        amount: 0, 
        currency: 'USD', 
        frequency: 'monthly',
        lastUpdated: null
      }
    });
  } catch (error) {
    console.error('Income retrieval error:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving income information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/calculate-monthly-budget', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).select('income');
    if (!user || !user.income) {
      return res.status(404).json({ message: 'Income information not found' });
    }

    let monthlyIncome = user.income.amount;
    switch (user.income.frequency) {
      case 'weekly':
        monthlyIncome = user.income.amount * 4; 
        break;
      case 'biweekly':
        monthlyIncome = user.income.amount * 2;
        break;
      case 'annually':
        monthlyIncome = user.income.amount / 12;
        break;
    }
    // ( FruFrog model example, NOT FINAL )
    const suggestedBudget = {
      necessities: monthlyIncome * 0.5, 
      wants: monthlyIncome * 0.3,       
      savings: monthlyIncome * 0.2      
    };

    res.status(200).json({
      monthlyIncome,
      currency: user.income.currency,
      suggestedBudget
    });
  } catch (error) {
    console.error('Budget calculation error:', error);
    res.status(500).json({
      message: 'An error occurred while calculating budget',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
module.exports = router;