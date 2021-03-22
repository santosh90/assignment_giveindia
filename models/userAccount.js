const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userAccountSchema = new mongoose.Schema(
    {
        account_number: {
            type: String,
            trim: true,
            unique: true
        },
        user_id: {
            type: ObjectId,
            ref:"User",
            trim: true
        },
        account_type: {
            type: Number
        },
        balance_amount:{
            type: Number
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Useraccount", userAccountSchema);