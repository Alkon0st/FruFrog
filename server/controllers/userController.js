const User = require ('../models/userModel');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

// Sign up a new user
exports.signup = async (req, res) => {
    try {
        const {username, email, password} = req.body; 
        // console.log("Signup function hit");
        console.log("Request body:", req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: `Email already exists`});

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({message: `User created successfully`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Log in an existing user
exports.login = async (req, res) => {
    try{
        const {identifier, password} = req.body;

        // Find the user
        const user = await User.findOne({$or: [{username: identifier}, {email: identifier}]});
        if (!user) return res.status(400).json({message: `User not found`});

        // Check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({message: `Invalid password`});

        // Generate JWT
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
            });

            res.json({ token, user: { username: user.username, email: user.email } });
    } catch (err) {
        console.error('Error during login:', err); 
        res.status(500).json({ message: "Server error" });
    }
};

