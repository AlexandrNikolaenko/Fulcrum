'use client'

import { BaseButton } from "@/app/components/buttons";

const filters = [];

export default function Filters({isShow, action}) {
    let amount
    let message
    
    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message = `Показать 1 объявление`;
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message = `Показать ${amount} объявления`;
    else message = `Показать ${amount} объявлений`;

    function show() {
        action();
    }

    return (
        <form className="flex gap-[15px] p-[25px] rounded-large bg-white shadow-center flex-wrap">
            {filters.map(filter => <Filter key={filter.id} filter={filter}/>)}
            <BaseButton text={message} onClick={show}/>
        </form>
    )
}

function Filter({filter}) {
    return <input></input>
}