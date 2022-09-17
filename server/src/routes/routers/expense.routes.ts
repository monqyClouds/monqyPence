import express, { Request, Response } from "express";
import auth from "../../middlewares/auth";
import { createNewExpense } from "../controllers/expense.controller";

const expenseRouter = express.Router();

expenseRouter.post("/", auth, async (req: Request, res: Response) => {
	const { title, amount, date }: { title: string; amount: number; date: Date } =
		req.body;

	if (
		typeof title !== "string" ||
		typeof amount !== "number" ||
		typeof date !== "string"
	)
		return res.status(400).json();

	if (title.trim() === "" || amount <= 0)
		return res.status(400).json("invalid expense");

	const owner = req.user._id;

	try {
		const expenseData = {
			amount: amount,
			title: title.trim(),
			date: new Date(date),
			owner,
		};
		const expense = await createNewExpense(expenseData);

		return res.json(expense);
	} catch (err) {
		console.log(err);
		return res.status(500).json("error adding expense");
	}
});

export default expenseRouter;
