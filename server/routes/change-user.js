const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const validateUsernameUpdate = 
[
  body('newUsername')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .escape()
    .custom(async (value, { req }) => {
      // Check if new username is already taken by another user
      const existingUser = await User.findOne({
        username: value,
        _id: { $ne: req.userData.userId } // Exclude current user
      });
      
      if (existingUser) {
        throw new Error('Username is already taken');
      }
      
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required to verify changes')
];

router.put('/update-username', authenticateUser, validateUsernameUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newUsername, password } = req.body;
    
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const oldUsername = user.username;
    
    user.username = newUsername; // Updating the new username
    await user.save();

    console.log(`Username changed from ${oldUsername} to ${newUsername} for user ID: ${user._id}`);

    res.status(200).json({
      message: 'Username updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Username update error:', error);
    res.status(500).json({
      message: 'An error occurred while updating username',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/check-username/:username', async (req, res) => {
  try {
    const username = req.params.username;
    
    const existingUser = await User.findOne({ username });
    const isAvailable = !existingUser;
    
    res.status(200).json({
      username,
      isAvailable
    });
  } catch (error) {
    console.error('Username check error:', error);
    res.status(500).json({ message: 'An error occurred while checking username availability' });
  }
});
module.exports = router;