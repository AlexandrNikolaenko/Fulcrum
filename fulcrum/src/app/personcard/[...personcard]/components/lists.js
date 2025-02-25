'use client';

import { useState } from "react";
import { UnderlineButton } from "@/app/components/buttons";
import Image from "next/image";
import { BaseLink } from "@/app/components/buttons";
import { LikeAd } from "@/app/ads/components/likeAndHide";
import Plug from "@/app/components/plug";
import BaseText from "@/app/components/texts";

function UnderTitle({children}) {
    return (
        <h4 className="text-dark text-2xl font-title">{children}</h4>
    )
}

export function PersonsAds({ads}) {   
    let [isOpen, setIsOpen] = useState(false);
    let list = [];
    if (isOpen) list = ads;
    else list.push([ads[0], ads[1]]);

    return(
        <>
            <UnderTitle>Услуги</UnderTitle>
            <ul className="flex flex-col gap-2.5">
                {list.map(ad => <OnceAd key={ad.id} ad={ad}/>)}
                <UnderlineButton action={setIsOpen.bind(!isOpen)} text={'Показать все'}/>
            </ul>
        </>
    )
}

function OnceAd({ad}) {
    return(
        <li className={`flex gap-5 p-5 rounded-large shadow-center bg-white items-start w-full`}>
            {ad && ad.imageLink ? <Image src={ad.imageLink} width={256} height={176} alt="Ad's image"/> : <Plug className={'w-[256px] h-[176px] bg-gray rounded-base'}/>}
            <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex justify-between gap-2.5">
                    <p>{ad.title}</p>
                    <p>{ad.price}</p>
                </div>
                <p>{ad.university}, {ad.course}</p>
                <p>Количество воспользовавшихся услугой: {ad.count}</p>
                <p>{ad.body}</p>
                <div className="flex gap-2.5 items-center">
                    <BaseLink text={'Написать'} href={`${APP_HOST}/ads/adcard/${ad.id}`}/>
                    <LikeAd like={ad.isLike} id={ad.id}/>
                </div>
            </div>
        </li>
    )
}

export function PersonsHelps({helps}) {
    let [isOpen, setIsOpen] = useState(false);
    let list = [];
    if (isOpen) list = helps;
    else list.push([helps[0], helps[1]]);

    return(
        <>
            <UnderTitle>Взаимопомощь</UnderTitle>
            <ul className="flex flex-col gap-2.5">
                {list.map(help => <OnceHelp key={help.id} help={help}/>)}
                <UnderlineButton action={setIsOpen.bind(!isOpen)} text={'Показать все'}/>
            </ul>
        </>
    )
}

function OnceHelp({help}) {
    return(
        <li className={`flex flex-col gap-2.5 rounded-large p-[15px] bg-white shadow-center w-full`}>
            {help.image_link && <Image alt={'image'} src={help.image_link} fill={true}/>}
            <h2 className="text-dark text-2xl font-bold">{help.title}</h2>
            <BaseText>{help.university}, {help.course}</BaseText>
            <BaseText>{help.created_at}</BaseText>
            <BaseText>{help.body}</BaseText>
            <div className="flex gap-5 items-center">
                <BaseLink text={'Написать'} href={`${APP_HOST}/help/helpcard/${help.id}`}/>
                <button onClick={hide} className="w-fit h-fit"><Image alt="hide" src={"/Hide.svg"} width={24} height={24}></Image></button>
            </div>
        </li>
    )
}