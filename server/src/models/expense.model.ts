import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
