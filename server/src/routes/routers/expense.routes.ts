import express, {Request, Response} from "express";
import auth from "../../middlewares/auth";
import { createNewExpense } from "../controllers/expense.controller";

const expenseRouter = express.Router();

expenseRouter.post("/", auth, async (req: Request, res: Response) => {
    const {title, amount}: {title: string, amount: number} = req.body;

    if (!title.trim() || !amount || amount <= 0) return res.status(400).json("invalid expense");

    const date = new Date(Date.now());
    const owner = req.user._id;

    try {
        const expenseData = {
            amount: amount,
            title: title.trim(),
            date,
            owner,
        }
        const expense = await createNewExpense(expenseData);

        return res.json(expense)
    } catch (err) {
        return res.status(500).json("error adding expense");
    }

});

export default expenseRouter;