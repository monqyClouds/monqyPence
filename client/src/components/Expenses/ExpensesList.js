import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
	if (props.items.length === 0) {
		return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
	}

	return (
		<ul className="expenses-list">
			{props.items.map((expense, i) => (
				<ExpenseItem
					key={expense.id ?? i} //Always use key tag when working with list items
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
				/>
			))}
		</ul>
	);
};

export default ExpensesList;
