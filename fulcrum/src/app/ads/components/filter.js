'use client'

import { BaseButton } from "@/app/components/buttons";
import { useState } from "react";

const defaultFilters = [
    {
        id: 1,
        name: 'university',
        question: 'Какой университет?',
        variants: [
            {id: 1, name: 'ИТМО', active: true},
            {id: 2, name: 'ГУАП', active: false},
            {id: 3, name: 'МГУ', active: false}
        ],
        value: 1,
        type: 'radio'
    },
    {
        id: 2,
        name: 'subject',
        question: 'Какой предмет?',
        variants: [
            {id: 1, name: 'Физика', active: true},
            {id: 2, name: 'Математическая статистика', active: false},
            {id: 3, name: 'Линейная алгебра', active: false}
        ],
        value: 1,
        type: 'radio'
    },
    {
        id: 3,
        name: 'cource',
        question: 'Какой курс помощника?',
        variants: [
            {id: 1, name: '1 курс бакалавриата', active: true},
            {id: 2, name: '2 курс бакалавриата', active: false},
            {id: 3, name: '3 курс бакалавриата', active: false}
        ],
        value: 1,
        type: 'radio'
    },
    {
        id: 4,
        name: 'price',
        question: 'Цена',
        from: 0,
        to: 2500,
        value: 1,
        type: 'choice'
    },
]

export default function Filters({action}) {
    let [filters, setFilters] = useState(defaultFilters);
    console.log(filters)

    let amount
    let message
    
    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message = `Показать 1 объявление`
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message = `Показать ${amount} объявления`
    else message = `Показать ${amount} объявлений`;

    function show() {
        action();
    }

    return (
        <div className="flex flex-col gap-2.5 items-start w-[272px]">
            {filters.map(filter => <Filter key={filter.id} filter={filter} change={({filterId, variant}) => {
                let newVal = filters;
                console.log(filters);
                newVal[filterId-1].value = variant;
                setFilters(newVal);
            }}/>)}
            <BaseButton text={message} onClick={show}/>
        </div>
    )
}

function Filter({filter, change}) {
    if (filter.type == 'radio') {
        return (
            <form id={`adsfilter${filter.id}`} className="flex flex-col gap-2.5 items-start w-full p-5 rounded-base bg-white shadow-center">
                <p className="text-sm text-dark">{filter.question}</p>
                {
                    filter.variants.map((variant) => {
                        return (
                            <div key={variant.id} className="flex w-full gap-x-2.5">
                                <input id={`${filter.name}${variant.id}`} name={`${filter.name}${variant.name}`} type="radio" onChange={() => change({filterId: filter.id, variant: variant.id})} value={variant.name} checked={filter.value == variant.id}></input>
                                <label htmlFor={`${filter.name}${variant.id}`} className="text-sm text-dark">{variant.name}</label>
                            </div>
                        )
                        
                    })
                }
            </form>
        )
    } else if (filter.type == 'choice') {
        return <></>
    }
}
