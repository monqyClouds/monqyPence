import Expense from "../../models/expense.model";

interface Expense {
    amount: number,
    title: string,
    owner?: string,
    date: Date,
}

export async function createNewExpense(expenseData:Expense) {
    console.log(expenseData);
    const expense = Expense.create(expenseData);

    return (await expense).toObject();
}