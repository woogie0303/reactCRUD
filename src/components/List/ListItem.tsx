import React from "react";

type Props = {
    name: string;
    price: number;
    index: number;
    setDeleteExpenseListItem: React.Dispatch<React.SetStateAction<DeleteExpenseListItem | null>>;
    setChangeExpenseListItem: React.Dispatch<React.SetStateAction<ChangeExpenseListItem | null>>;
};

export default function ListItem({ name, price, setDeleteExpenseListItem, setChangeExpenseListItem, index }: Props) {
    return (
        <div className="flex w-full items-center text-2xl border-2  px-2 py-4 mb-4 rounded-lg font-bold text-blue-900">
            <div className="w-full text-left">{name}</div>
            <div className="flex w-full justify-between px-2">
                <div className="">{price}</div>
                <div className="">
                    <button
                        className="mr-5"
                        onClick={() => {
                            setChangeExpenseListItem({
                                changeStatus: false,
                                name,
                                price,
                                index,
                            });
                        }}
                    >
                        수정
                    </button>
                    <button onClick={() => setDeleteExpenseListItem({ index, deleteStatus: true })}>삭제</button>
                </div>
            </div>
        </div>
    );
}
