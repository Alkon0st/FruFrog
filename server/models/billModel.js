const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    pond: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pond', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    paidBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],  // Array of User references
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;