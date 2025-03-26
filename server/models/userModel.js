let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }, 
    ponds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pond' 
    }],  // Array of Pond references
    profile_picture: { 
        type: String 
    },  // URL or file path
    name: { 
        type: String
    },
    bio: {
        type: String 
    }
}, { timestamps: true });  // Adds createdAt and updatedAt timestamps

// this is the model for the user
const User = mongoose.model('User', UserSchema);
module.exports = User;
