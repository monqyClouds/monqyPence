import Expense from "../../models/expense.model";

interface Expense {
    amount: number,
    title: string,
    owner?: string,
    date: Date,
}

export async function createNewExpense(expenseData:Expense) {
    console.log(expenseData);
    const expense = await Expense.create(expenseData);



    return ({
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        id: expense._id.toString(),
    });
}