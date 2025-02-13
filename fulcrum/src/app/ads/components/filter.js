'use client'

import { BaseButton } from "@/app/components/buttons";
import { useState } from "react";

const defaultFilters = [

]

export default function Filters({action}) {
    let [filters, setFilters] = useState({});

    let amount
    let message
    
    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message = `Показать 1 объявление`
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message = `Показать ${amount} объявления`
    else message = `Показать ${amount} объявлений`;

    function show() {
        action();
    }

    return (
        <form className="flex flex-col gap-2.5 items-start w-[272px]">
            {defaultFilters.map(filter => <Filter key={filter.id} filter={filter} change={setFilters} start={filters} id={filter.id}/>)}
            <BaseButton text={message} onClick={show}/>
        </form>
    )
}

function Filter({filter, change, start, id}) {
    return (
        <input id="" onChange={(e) => change()} value={start[id - 1].value}></input>
    )
}