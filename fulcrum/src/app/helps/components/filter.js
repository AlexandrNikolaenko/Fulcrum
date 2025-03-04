'use client'

import { BaseButton } from "@/app/components/buttons";
import { useRef, useState, useEffect } from "react";
import { API_HOST } from "@/app/components/host";
import BaseText from "@/app/components/texts";

const defaultFilters = {
    university: {
        id: 0,
        name: 'university',
        variants: [
            {id: 1, name: 'ИТМО'},
            {id: 2, name: 'ГУАП'},
            {id: 3, name: 'МГУ'}
        ],
        value: 0,
        title: 'Университет'
    },
    part: {
        id: 1,
        name: 'part',
        variants: [
            {id: 1, name: 'Хакатоны'},
            {id: 2, name: 'Учеба'},
            {id: 3, name: 'Работа'},
            {id: 4, name: 'Внеучебная деятельность'}
        ],
        value: 0,
        title: 'Область деятельности'
    },
    time: {
        id: 2,
        name: 'time',
        points: [
            {id: 0, value: 0},
            {id: 1, value: 20},
        ],
        title: 'Время публикации (дни)'
    },
    tags: {
        id: 3,
        name: 'tags',
        tags: [
            {id: 1, name: 'тег 1'},
            {id: 2, name: 'тег 2'},
            {id: 3, name: 'тег 3'},
            {id: 4, name: 'тег 4'},
            {id: 5, name: 'тег 10'},
            {id: 6, name: 'тег 100'},
        ],
        value: [],
        title: 'Теги'
    }
};

export default function Filters({isShow, action}) {
    let [filters, setFilters] = useState(defaultFilters);
    let [amount, setAmount] = useState(0);
    let message = useRef(`Показать ${amount} объявлений`);

    useEffect(() => {
        async function getAmount()  {
            console.log(`${API_HOST}/helps/amount?${filters.university.name}=${filters.university.value}&${filters.part.name}=${filters.part.value}&${filters.tags.name}=${filters.tags.value.join('_')}`);
            let res = await fetch(`${API_HOST}/helps/amount?${filters.university.name}=${filters.university.value}&${filters.part.name}=${filters.part.value}&${filters.tags.name}=${filters.tags.value.join('_')}`, {method: 'GET'});
            if (res.status == 200) {
                let data = (await res.json()).amount;
                if (amount != data) setAmount(data);
            }
        }     
        getAmount();  
    });
    
    if (amount == 1 || (amount > 20 && amount % 10 == 1)) message.current = `Показать 1 объявление`;
    else if ((amount > 1 && amount < 5) || (amount > 20 && amount % 10 > 1 && amount % 10 < 5)) message.current = `Показать ${amount} объявления`;
    else message.current = `Показать ${amount} объявлений`;

    function show() {
        let stroke = `${filters.university.name}=${filters.university.value}&${filters.part.name}=${filters.part.value}&${filters.tags.name}=${filters.tags.value.join('_')}`
        action(stroke);
    }

    function change({variant, checked, filter}) {
        let newfilter = {};
        Object.assign(newfilter, filters);
        if (checked) newfilter[filter].value = 0;
        else newfilter[filter].value = variant;
        setFilters(newfilter);
    }

    function setTags({tag, checked}) {
        let newfilter = {};
        Object.assign(newfilter, filters);
        if (checked) {
            newfilter.tags.value = newfilter.tags.value.filter(id => id != tag);
        }
        else newfilter.tags.value.push(tag);
        setFilters(newfilter);
    }

    return (
        <div className={`${isShow ? 'flex' : 'hidden'} gap-[15px] p-[25px] rounded-large bg-white shadow-center flex-wrap items-start`}>
            <UnivFilter filter={filters.university} change={change}/>
            <PartFilter filter={filters.part} change={change}/>
            <TimeFilter filter={filters.time} />
            <TagsFilter filter={filters.tags} action={setTags}/>
            <BaseButton text={message.current} action={show}/>
        </div>
    )
}

function UnivFilter({filter, change}) {

    return (
        <form className="flex flex-col gap-2.5 items-start">
            <FilterName>{filter.title}</FilterName>
            <ul className="flex flex-col gap-2.5 items-start">
                {
                    filter.variants.map(variant => {
                        return (
                            <li key={variant.id} className="flex gap-2.5">
                                <input type="checkbox" value={variant.id} id={`helpuniv${variant.name}`} name={variant.name} onChange={() => change({variant: variant.id, checked: variant.id == filter.value, filter: filter.name})} checked={variant.id == filter.value}></input>
                                <label htmlFor={`helpuniv${variant.name}`}>{variant.name}</label>
                            </li>
                        )
                    })
                }
            </ul>
        </form>
    )
}

function PartFilter({filter}) {
    return (
        <form className="flex flex-col gap-2.5 items-start">
            <FilterName>{filter.title}</FilterName>
            <select className="px-[15px] py-2.5 rounded-base border-gray">
                <option value={'all'}>
                    Все области
                </option>
                {filter.variants.map(variant => {
                    return (
                        <option key={variant.id} value={variant.id}>{variant.name}</option>
                    )
                })}
            </select>
        </form>
    )
}

function TimeFilter({filter}) {
    return(
        <form id={'timeform'} className="flex flex-col gap-2.5">
            <FilterName>{filter.title}</FilterName>
        </form>
    )
}

function TagsFilter({filter, action}) {
    return(
        <form id='tagsform' className="flex flex-col gap-2.5">
            <FilterName>{filter.title}</FilterName>
            <div className="flex flex-wrap gap-2.5">
                {filter.tags.map((tag => <button key={tag.id} onClick={(e) => {
                    e.preventDefault();
                    action({tag: tag.id, checked: Boolean(filter.value.includes(tag.id))})
                }} className={`${Boolean(filter.value.includes(tag.id)) ? 'bg-light-gray shadow-inner' : 'bg-white shadow-center'} rounded-[5px] py-[5px] px-2.5 active:bg-light-gray active:shadow-inner`}>{tag.name}</button>))}
            </div>
        </form>
    )
}


function FilterName({children}) {
    return <BaseText>{children}</BaseText>
}

function Filter({filter}) {
    return <input></input>
}