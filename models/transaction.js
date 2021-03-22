const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const transactionSchema = new mongoose.Schema(
    {
        from_account: {
            type: String,
            trim: true,
        },
        to_account: {
            type: String,
            trim: true
        },
        user_id: {
            type: ObjectId,
            ref:"User",
            trim: true
        },
        amount: {
            type: Number
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);