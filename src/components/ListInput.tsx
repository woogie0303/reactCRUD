import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";

type Props = {
    changeExpenseListItem: ChangeExpenseListItem | null;
    setExpenseListItem: React.Dispatch<React.SetStateAction<ExpenseListItem | null>>;
    setChangeExpenseListItem: React.Dispatch<React.SetStateAction<ChangeExpenseListItem | null>>;
};

export default function ListInput({ changeExpenseListItem, setExpenseListItem, setChangeExpenseListItem }: Props) {
    const [expenseNameInput, setExpenseNameInput] = useState("");
    const [expensePriceInput, setExpensePriceInput] = useState("");

    const submitInputValue: FormEventHandler = (e) => {
        e.preventDefault();

        if (changeExpenseListItem) {
            setChangeExpenseListItem({ ...changeExpenseListItem, changeStatus: true });
        }

        setExpenseListItem((pre) => ({
            ...pre,
            name: expenseNameInput,
            price: Number(expensePriceInput),
            addStatus: changeExpenseListItem ? false : true,
        }));

        setExpenseNameInput("");
        setExpensePriceInput("");
    };

    const changeExpenseName: ChangeEventHandler<HTMLInputElement> = (e) => {
        setExpenseNameInput(e.target.value);
    };

    const changeExpenseValue: ChangeEventHandler<HTMLInputElement> = (e) => {
        setExpensePriceInput(e.target.value);
    };

    useEffect(() => {
        if (changeExpenseListItem) {
            setExpenseNameInput(changeExpenseListItem.name);
            setExpensePriceInput(changeExpenseListItem.price.toString());
        } else {
            setExpenseNameInput("");
            setExpensePriceInput("");
        }
    }, [changeExpenseListItem]);

    return (
        <div className="">
            <form className="flex flex-col mb-[5rem]" onSubmit={submitInputValue}>
                <div className="flex w-full justify-between">
                    <label htmlFor="expenseNameInput" className="text-gray-200 flex flex-col text-left w-[45%]">
                        지출 항목
                        <input value={expenseNameInput} onChange={changeExpenseName} type="text" id="expenseNameInput" className="mt-2 py-1 bg-transparent border-b-2" />
                    </label>

                    <label htmlFor="expenseCostInput" className="text-gray-200 flex flex-col text-left w-[45%]">
                        비용
                        <input value={expensePriceInput} type="number" id="expenseCostInput" className="mt-2 py-1 bg-transparent border-b-2" onChange={changeExpenseValue} />
                    </label>
                </div>
                <button className="mt-6 self-start bg-blue-200 px-5 py-2 rounded-full text-blue-900 font-bold">{changeExpenseListItem ? "수정" : "제출하기"}</button>
            </form>
        </div>
    );
}
