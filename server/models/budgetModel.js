
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    pond: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pond', 
        required: true 
    },
    categories: [{
        name: { 
            type: String, 
            required: true 
        },
        subcategories: [{
            name: { 
                type: String, 
                required: true 
            },
            amount: { 
                type: Number, 
                required: true 
            }
        }]
    }],
    }, { timestamps: true });


const Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;