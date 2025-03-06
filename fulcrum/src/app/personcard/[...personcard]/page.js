'use server'

import { API_HOST } from "@/app/components/host";
import Image from "next/image";
import BaseInfo from "./components/baseInfo";
import { PersonsAds, PersonsHelps } from "./components/lists";
import BaseText, { DifSizeText } from "@/app/components/texts";
import { Feedbacks } from "./components/lists";

export default async function Card({params}) {
    let personId = (await params).personcard[0];
    console.log(personId);
    try {
        let res = await fetch(`${API_HOST}/person?id=${personId}`, {method: 'GET'});
        if (res.ok) {
            let data = await res.json();
            console.log(data);
            return (
                <>
                    <section className="flex gap-10">
                        <div className="flex gap-10">
                            <div className="relative z-0 p-2.5 rounded-medium h-[350px] aspect-square bg-white shadow-center">
                                <Image alt="avatar" fill={true} className="rounded-base" src={'/Edit.svg'}/>
                            </div>
                            <BaseInfo person={data.base}/>
                        </div>
                    </section>
                    <section className="person-grid">
                        <Info>
                            <About about={data.base.about}></About>
                            <Feedbacks feedbacks={data.base.id} />
                            {data.base.contacts && <Title>Контакты</Title>}
                            <Contacts contacts={data.base.contacts}/>
                        </Info>
                        <List>
                            <Title>Объявления пользователя</Title>
                            <PersonsAds ads={data.ads}/>
                            <PersonsHelps ads={data.helps}/>
                        </List>
                    </section>
                </>
            )
        } else throw new Error(res.status)
    } catch(e) {
        console.log(e);
        return (
            <h3 className="text-dark forn-title text-center">Что то пошло не так или этого пользователя не существует:(</h3>
        )
    }
}

function Title({children}) {
    return (
        <h3 className="text-dark text-3xl font-title">{children}</h3>
    )
}



function Info({children}) {
    return (
        <div className="flex flex-col gap-2.5 w-full">
            {children}
        </div>
    )
}

function About({about}) {
    return (
        <div className="flex flex-col gap-2.5">
            <p className="text-3xl text-dark font-title">О себе:</p>
            <BaseText>{about}</BaseText>
        </div>
    )
}

function Contacts({contacts}) {
    return (
        <>
            {contacts && contacts.map(contact => <Contact key={contact.id}/>)}
        </>
    )
}

function Contact({contact}) {
    return (
        <DifSizeText size={'text-xl'}>{contact.name}: {contact.value}</DifSizeText>
    )
}

function List({children}) {
    return (
        <div className="flex flex-col gap-5 w-full">
            {children}
        </div>
    )
}


