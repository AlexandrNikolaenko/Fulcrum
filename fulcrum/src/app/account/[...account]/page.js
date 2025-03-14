'use client'

import { API_HOST, APP_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import BaseText from "@/app/components/texts";
import { EditButton, UnderlineButton, BaseLink, DeleteButton } from "@/app/components/buttons";
import Link from "next/link";
import { H2, H3 } from "./components/titles";
import { useGetData, useGetSecretData } from "@/app/components/hooks";

export default function Account() {
    let data = useGetSecretData(`${API_HOST}/account`);
    console.log(data.data);
    if (data.isLoad) {
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
                    <Link href={`${APP_HOST}/register`} className="hidden" id="editLink"/>
                </div>
            </div>
        </section>
    )
}

function MyAds({user}) {
    let data = useGetData(`${API_HOST}/usersads?userId=${user.id}`);

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

function MyHelps({userId}) {
    let data = useGetData(`${API_HOST}/usersads?userId=${userId}`);

    return (
        <section className="flex flex-col gap-5 w-full">
            <H3>Взаимопомощь</H3>
            <BaseLink text={'Разместить объявление'} href={`${APP_HOST}/register`}/>
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
                <BaseText>Количество воспользовавшихся услугой: {help.count}</BaseText>
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