const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    weeklyMenu: [{
        day: { 
            type: String, 
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true 
        },
        breakfast: [{
            type: String,
            required: true
        }],
        lunch: [{
            type: String,
            required: true
        }],
        dinner: [{
            type: String,
            required: true
        }]
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('meal', mealSchema);
