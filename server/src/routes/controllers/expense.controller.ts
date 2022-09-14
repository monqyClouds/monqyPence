interface Expense {
    amount: number,
    title: string,
    owner: string,
    date: Date,
}

function createNewExpense(expenseData:Expense) {
    console.log(expenseData);

    return {...expenseData, _id: "nicely"}
}