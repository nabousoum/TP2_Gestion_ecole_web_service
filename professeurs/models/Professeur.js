const mongoose = require('mongoose');

const ProfSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Prof', ProfSchema);
