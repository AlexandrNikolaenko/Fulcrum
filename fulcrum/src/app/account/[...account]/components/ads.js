'use client'

import { H3 } from "./titles";
import { BaseLink, EditButton, DeleteButton } from "@/app/components/buttons";
import Image from "next/image";
import BaseText from "@/app/components/texts";
import Link from "next/link";
import { useGetData } from "@/app/components/hooks";

export default function MyAds({user}) {
    let {data} = useGetData(`${API_HOST}/usersads?userId=${user.id}`);

    return (
        <section className="flex flex-col gap-5 w-full">
            <H3>Услуги</H3>
            <BaseLink text={'Разместить объявление'} href={`${APP_HOST}/register`}/>
            {
                (data.isLoad && data.isSuccess) &&
                <ul className="flex w-full flex-col gap-2.5">
                    {data.data.map(ad => <MyAd key={ad.id} ad={{...ad, user}}/>)}
                </ul>
            }
        </section>
    )
}

function MyAd({ad}) {
    console.log(ad);
    function toEdit() {
        document.getElementById(`editAdLink${ad.id}`).click();
    }

    return (
        <li className="flex gap-5 w-full shadow-center p-[15px] rounded-large">
            <Image alt="image" width={256} height={176} className="w-[256px] h-[176px]" src={`${ad.image_link ? ad.image_link : '/MainFon.svg'}`}/>
            <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex justify-between gap-2.5">
                    <h4 className="font-bold text-2xl text-wrap">{ad.title}</h4>
                    <h4 className="font-bold text-2xl text-wrap">{ad.price}</h4>
                </div>
                <BaseText>{ad.user.university}, {ad.user.course}</BaseText>
                <BaseText>Количество воспользовавшихся услугой: {ad.count}</BaseText>
                <BaseText>{ad.body}</BaseText>
                <div className="flex gap-5">
                    <EditButton action={toEdit} bg={'light-gray'}/>
                    <Link href={`${APP_HOST}/register/${ad.id}`} className="hidden" id={`editAdLink${ad.id}`}/>
                    <DeleteButton />
                </div>
            </div>
        </li>
    )
}