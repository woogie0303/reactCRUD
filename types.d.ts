type ExpenseListItem = {
    name: string;
    price: number;
    addStatus: boolean;
};

type ChangeExpenseListItem = {
    changeStatus: boolean;
    name: string;
    price: number;
    index: number;
};

type DeleteExpenseListItem = {
    deleteStatus: boolean;
    index: number;
};
