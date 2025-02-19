'use client'

import { useEffect, useRef, useState } from "react";
import Plug from "@/app/components/plug";
import Image from "next/image";
import { BaseButton } from "@/app/components/buttons";
import { API_HOST } from "@/app/components/host";

let plugs = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
]

export default function AdsList({filters, sort, searchData}) {
    let [isLoad, setIsLoad] = useState(false);
    let [ads, setAds] = useState(searchData);
    let lastFilters = useRef({});

    useEffect(() => {
        async function getData() {
            if (lastFilters.current != filters) {
                let res = await fetch(`${API_HOST}/ads?university=${filters.university}&subject=${filters.subject}&course=${filters.course}`, {method: 'GET'});
                if (res.status == 200) {
                    lastFilters.current = filters;
                    setAds((await res.json()).ads);
                }
            }
            setIsLoad(true);
        }
        getData();
    })

    if ((ads.length == 0 || !ads) && !isLoad) {
        return <ul className="flex flex-col gap-2.5 w-full">{plugs.map(plug => <Plug key={plug.id} className={'w-full h-[239px] rounded-large bg-white shadow-center'}/>)}</ul>
    } else if ((ads.length == 0 || !ads) && isLoad) {
        return <p className="w-full text-base text-dark">По вашему запросу пока что нет результатов :(</p>
    }

    return (
        <ul className="flex flex-col gap-2.5 w-full">
            {ads.map(ad => <Ad key={ad.id} ad={ad}/>)}
        </ul>
    )
}

function Ad({ad}) {
    let [isShow, setIsShow] = useState(ad.isShow);

    if (!isShow) return <></>

    return (
        <li className={`flex gap-5 p-5 rounded-large shadow-center bg-white items-start`}>
            {ad && ad.imageLink ? <Image src={ad.imageLink} width={256} height={176} alt="Ad's image"/> : <Plug className={'w-[256px] h-[176px] bg-gray rounded-base'}/>}
            <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex justify-between gap-2.5">
                    <p>{ad.title}</p>
                    <p>{ad.price}</p>
                </div>
                <p>{ad.user.univeersity}, {ad.user.course}</p>
                <p>Количество воспользовавшихся услугой: {ad.count}</p>
                <p>{ad.body}</p>
                <div className="flex gap-2.5">
                    <BaseButton text={'Написать'} />
                    <Like like={ad.isLike} id={ad.id}/>
                    <button onClick={setIsShow(false)} className="w-fit h-fit"><Image alt="hide" src={"/Hide.svg"} width={24} height={24}></Image></button>
                </div>
            </div>
        </li>
    )
}

function Like({like, id}) {
    let [isLike, setIsLike] = useState(like);
    let src
    if (isLike) src = '/Like.svg';
    else src = '/notLike.svg';

    async function setLike() {
        let res = await fetch(`${API_HOST}/ads/like`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            credentials: 'include',
            body: JSON.stringify({id: id, like: !like})
        });
        if (res.status == 200) setIsLike(!setIsLike);
        else if (res.status == 401) alert('Чтобы отметить объявление войдите в систему или зарегистрируйтесь');
    }

    return <button onClick={() => {
        setLike();
    }} className="w-fit h-fit"><Image alt="like" src={src} width={24} height={24}></Image></button>
}