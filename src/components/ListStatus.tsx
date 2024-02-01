import { useEffect, useState } from "react";

type Props = {
    changeExpenseListItem: ChangeExpenseListItem | null;
    deleteExpenseListItem: DeleteExpenseListItem | null;
    expenseListItem: ExpenseListItem | null;
};

type ListStatus = {
    backgroundColorClass: string;
    message: string;
};

export default function ListStatus({ changeExpenseListItem, deleteExpenseListItem, expenseListItem }: Props) {
    const [listStatus, setListStatus] = useState<ListStatus | null>(null);

    const changeListStatus = (item: ChangeExpenseListItem | DeleteExpenseListItem | ExpenseListItem) => {
        if ("changeStatus" in item && item.changeStatus) {
            setListStatus({ backgroundColorClass: "bg-green-300", message: "아이템이 수정되었습니다." });
        }

        if ("deleteStatus" in item && item.deleteStatus) {
            setListStatus({ backgroundColorClass: "bg-red-300", message: "아이템이 삭제되었습니다." });
        }

        if ("addStatus" in item && item.addStatus) {
            setListStatus({ backgroundColorClass: "bg-green-300", message: "아이템이 추가되었습니다." });
        }

        setTimeout(() => {
            setListStatus(null);
        }, 2000);
    };
    useEffect(() => {
        if (changeExpenseListItem) {
            changeListStatus(changeExpenseListItem);
        }
        if (deleteExpenseListItem) {
            changeListStatus(deleteExpenseListItem);
        }
        if (expenseListItem) {
            changeListStatus(expenseListItem);
        }
    }, [changeExpenseListItem, deleteExpenseListItem, expenseListItem]);
    return <>{listStatus && <div className={`${listStatus.backgroundColorClass} absolute w-full top-0 p-4 left-0 text-1xl font-bold`}>{listStatus.message}</div>}</>;
}
