const mongoose = require('mongoose');
///const uuidv1 = require('uuid/v1');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);