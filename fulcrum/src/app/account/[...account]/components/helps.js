'use client'

import { H3 } from "./titles";
import { BaseLink, EditButton, DeleteButton } from "@/app/components/buttons";
import Image from "next/image";
import BaseText from "@/app/components/texts";
import Link from "next/link";
import { useGetData } from "@/app/components/hooks";
import { API_HOST, APP_HOST } from "@/app/components/host";

export default function MyHelps({userId}) {
    let {data} = useGetData(`${API_HOST}/usersads?userId=${userId}`);

    return (
        <section className="flex flex-col gap-5 w-full">
            <H3>Взаимопомощь</H3>
            <BaseLink text={'Разместить объявление'} href={`${APP_HOST}/register/help/new`}/>
            {
                (data.isLoad && data.isSuccess) &&
                <ul className="flex w-full flex-col gap-2.5">
                    {data.data.map(help => <MyHelp key={help.id} help={help}/>)}
                </ul>
            }
        </section>
    )
}

function MyHelp({help}) {
    return (
        <li className="flex gap-5 w-full shadow-center p-[15px] rounded-large">
            {
                help.image_link &&
                <Image alt="image" width={256} height={176} src={help.image_link}/>
            }
            <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex justify-between gap-2.5">
                    <h4 className="font-bold text-2xl text-wrap">{help.title}</h4>
                </div>
                <BaseText>{help.user.university}, {help.user.course}</BaseText>
                <BaseText>Опубликовано {help.created_at}</BaseText>
                <BaseText>{help.body}</BaseText>
                <div className="flex gap-5">
                    <EditButton action={toEdit} bg={'light-gray'}/>
                    <Link href={`${APP_HOST}/register/${ad.id}`} className="hidden" id={`editAdLink${help.id}`}/>
                    <DeleteButton />
                </div>
            </div>
        </li>
    )
}