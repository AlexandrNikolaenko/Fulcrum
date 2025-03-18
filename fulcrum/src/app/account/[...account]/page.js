'use client'

import { API_HOST, APP_HOST } from "@/app/components/host";
import MyAds from "./components/ads";
import MyHelps from "./components/helps";
import Image from "next/image";
import BaseText from "@/app/components/texts";
import { EditButton, UnderlineButton } from "@/app/components/buttons";
import Link from "next/link";
import { H2 } from "./components/titles";
import { useGetSecretData } from "@/app/components/hooks";

export default function Account() {
    let {data} = useGetSecretData(`${API_HOST}/account`);
    console.log(data);
    if (data.isLoad && data.data) {
        return (
            <main className="relative z-40 pt-[502px]">
                {
                    data.isSuccess &&
                    <div className="w-full relative pt-[304px] bg-light-gray rounded-t-[50px]">
                        <BaseInfo data={data.data}/>
                        <div className="flex flex-col wrapper gap-5">
                            <H2>Мои объявления</H2>
                            <MyAds user={data.data}/>
                            <MyHelps user={data.data}/>
                        </div>
                    </div>
                }
            </main>
        )
    } else return <></>
}

function BaseInfo({data}) {
    function toEdit() { document.getElementById("editLink").click(); }

    function showAll() {
        return;
    }

    return (
        <section className="flex gap-10 mx-auto w-full justify-center absolute top-[-96px] items-end">
            <div className="self-start p-2.5 rounded-medium shadow-center bg-white">
                <Image alt={'avatar'} src={`${data.avatar ? data.avatar : '/DefaultUser.svg'}`} width={330} height={330} className="rounded-base"/>   
            </div>
            <div className="flex flex-col gap-2.5 w-full max-w-[676px]">
                <H2>{data.username}</H2>
                <p className="text-dark text-xl font-title">{data.university}, {data.course}</p>
                <p className="text-dark text-xl font-title">О себе:</p>
                <BaseText >{data.about}</BaseText>
                <div className="flex justify-between w-full">
                    <UnderlineButton text={'Посмотреть всю информацию'} action={showAll} />
                    <EditButton action={toEdit} bg={'white'}/>
                    <Link href={`${APP_HOST}/register/user`} className="hidden" id="editLink"/>
                </div>
            </div>
        </section>
    )
}