import React from "react";
import ListItem from "./ListItem";

type Props = {
    expenseList: ExpenseListItem[];
    setDeleteExpenseListItem: React.Dispatch<React.SetStateAction<DeleteExpenseListItem | null>>;
    setChangeExpenseListItem: React.Dispatch<React.SetStateAction<ChangeExpenseListItem | null>>;
};

export default function List({ expenseList, setChangeExpenseListItem, setDeleteExpenseListItem }: Props) {
    return (
        <div className=" flex flex-col ">
            <div className="flex flex-col h-[20rem] overflow-scroll">
                {expenseList.map((list, i) => (
                    <ListItem
                        key={list.name + `${i}`}
                        index={i}
                        name={list.name}
                        price={list.price}
                        setChangeExpenseListItem={setChangeExpenseListItem}
                        setDeleteExpenseListItem={setDeleteExpenseListItem}
                    />
                ))}
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    className="self-start bg-blue-200 px-5 py-2 rounded-full text-blue-900 font-bold"
                    onClick={() => {
                        setDeleteExpenseListItem({
                            index: -1,
                            deleteStatus: true,
                        });
                    }}
                >
                    목록 지우기
                </button>
                <div className="text-2xl font-bold text-blue-900">{expenseList.reduce((acc, cur) => acc + cur.price, 0)}원</div>
            </div>
        </div>
    );
}
