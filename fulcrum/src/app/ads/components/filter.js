'use client'

import { BaseButton } from "@/app/components/buttons"

const filters = [

]

export default function Filters({action}) {
    let amount
    let message
    
    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message = `Показать 1 объявление`
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message = `Показать ${amount} объявления`
    else message = `Показать ${amount} объявлений`

    function show() {
        action();
    }

    return (
        <ul className="flex flex-col gap-2.5 items-start">
            {filters.map(filter => <Filter key={filter.id} filter={filter}/>)}
            <BaseButton text={message} onClick={show}/>
        </ul>
    )
}

function Filter({filter}) {
    return (
        <li>
        </li>
    )
}