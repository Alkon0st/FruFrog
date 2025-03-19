const mongoose = require('mongoose');

const PondSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],  // Array of User references
    budget: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Budget' 
    },  // Reference to Budget model
    billList: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bill' 
    }],  // Array of Bill references
    code: { 
        type: String, 
        unique: true, 
        required: true 
    },
    codeExpiration: { 
        type: Date 
    },
}, { timestamps: true });

const Pond = mongoose.model('Pond', PondSchema);
module.exports = Pond;