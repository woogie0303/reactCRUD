import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import ListInput from "./components/ListInput";
import ListStatus from "./components/ListStatus";

function App() {
    const [expenseListItem, setExpenseListItem] = useState<ExpenseListItem | null>(null);
    const [expenseList, setExpenseList] = useState<ExpenseListItem[]>(() => {
        const localData = localStorage.getItem("expenseLists");
        return localData ? JSON.parse(localData) : [];
    });
    const [changeExpenseListItem, setChangeExpenseListItem] = useState<ChangeExpenseListItem | null>(null);
    const [deleteExpenseListItem, setDeleteExpenseListItem] = useState<DeleteExpenseListItem | null>(null);

    useEffect(() => {
        if (expenseListItem && !changeExpenseListItem) {
            setExpenseList((pre) => [expenseListItem, ...pre]);
        }

        if (changeExpenseListItem && changeExpenseListItem.changeStatus && expenseListItem) {
            const replaceExpenseListItem = expenseList.map((list, i) => {
                if (i === changeExpenseListItem.index) {
                    return (list = expenseListItem);
                } else {
                    return list;
                }
            });

            setExpenseList(replaceExpenseListItem);
            setChangeExpenseListItem(null);
        }

        setExpenseListItem(null);
    }, [expenseListItem]);

    useEffect(() => {
        if (deleteExpenseListItem && deleteExpenseListItem.index >= 0) {
            console.log(deleteExpenseListItem);
            const deleteExpenseList = expenseList.filter((_, i) => deleteExpenseListItem.index !== i);

            console.log(deleteExpenseList);

            setExpenseList(deleteExpenseList);
            setDeleteExpenseListItem(null);
        }
        if (deleteExpenseListItem && deleteExpenseListItem.index === -1) {
            setExpenseList([]);
            setDeleteExpenseListItem(null);
        }
    }, [deleteExpenseListItem]);

    useEffect(() => {
        localStorage.setItem("expenseLists", JSON.stringify(expenseList));
    }, [expenseList]);

    return (
        <div className="bg-blue-400 h-full  flex flex-col p-5">
            <ListStatus changeExpenseListItem={changeExpenseListItem} deleteExpenseListItem={deleteExpenseListItem} expenseListItem={expenseListItem} />
            <h1 className="text-5xl mb-4  font-bold text-white">예산 계산기</h1>

            <div className="h-full">
                <ListInput changeExpenseListItem={changeExpenseListItem} setExpenseListItem={setExpenseListItem} setChangeExpenseListItem={setChangeExpenseListItem} />
                {expenseList.length > 0 && <List expenseList={expenseList} setChangeExpenseListItem={setChangeExpenseListItem} setDeleteExpenseListItem={setDeleteExpenseListItem} />}
            </div>
        </div>
    );
}

export default App;
