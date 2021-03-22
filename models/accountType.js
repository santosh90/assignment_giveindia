const mongoose = require("mongoose");
const accountTypeSchema = new mongoose.Schema(
    {
        account_type_id: {
            type: Number
        },
        account_type: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Accounttype", accountTypeSchema);