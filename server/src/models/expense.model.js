import mongoose, { Schema } from "mongoose";

const expenseSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	amount: {
		type: String,
		required: true,
	},
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = { Expense: mongoose.model("Expense", expenseSchema) };
