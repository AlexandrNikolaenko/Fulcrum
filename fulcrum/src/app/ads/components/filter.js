'use client'

import { BaseButton } from "@/app/components/buttons";
import { API_HOST } from "@/app/components/host";
import { useEffect, useRef, useState } from "react";

export const defaultFilters = [
    {
        id: 1,
        name: 'university',
        question: 'Какой университет?',
        variants: [
            {id: 1, name: 'ИТМО', active: true},
            {id: 2, name: 'ГУАП', active: false},
            {id: 3, name: 'МГУ', active: false}
        ],
        value: 0,
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
        value: 0,
        type: 'radio'
    },
    {
        id: 3,
        name: 'course',
        question: 'Какой курс помощника?',
        variants: [
            {id: 1, name: '1 курс бакалавриата', active: true},
            {id: 2, name: '2 курс бакалавриата', active: false},
            {id: 3, name: '3 курс бакалавриата', active: false}
        ],
        value: 0,
        type: 'radio'
    },
    {
        id: 4,
        name: 'price',
        question: 'Цена',
        from: 0,
        to: 2500,
        value: 0,
        type: 'choice'
    }
]

export default function Filters({action}) {
    let [filters, setFilters] = useState(defaultFilters);
    let [amount, setAmount] = useState(0);
    let message = useRef(`Показать ${amount} объявлений`);

    useEffect(() => {
        async function getAmount()  {
            let res = await fetch(`${API_HOST}/ads/amount?${filters[0].name}=${filters[0].value}&${filters[1].name}=${filters[1].value}&${filters[2].name}=${filters[2].value}`, {method: 'GET'});
            if (res.status == 200) {
                let data = (await res.json()).amount;
                if (amount != data) setAmount(data);
            }
        }     
        getAmount();  
    });

    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message.current = `Показать 1 объявление`
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message.current = `Показать ${amount} объявления`
    else message.current = `Показать ${amount} объявлений`;

    function show() {
        console.log({university: filters[0].value, subject: filters[1].value, course: filters[2].value});
        action({university: filters[0].value, subject: filters[1].value, course: filters[2].value});
    }

    function change({filterId, variant, checked}) {
        let newVal = [...filters];
        if (checked) newVal[filterId-1].value = 0;
        else newVal[filterId-1].value = variant;
        setFilters(newVal);
    }

    return (
        <div className="flex flex-col gap-2.5 items-start w-[272px]">
            {filters.map(filter => <Filter key={filter.id} filter={filter} change={change}/>)}
            <BaseButton text={message.current} action={show}/>
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
                                <input id={`${filter.name}${variant.id}`} name={`${filter.name}${variant.name}`} type="checkbox" onChange={() => change({filterId: filter.id, variant: variant.id, checked: filter.value == variant.id})} value={variant.name} checked={filter.value == variant.id}></input>
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
