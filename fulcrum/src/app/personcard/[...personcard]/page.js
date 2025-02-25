'use server'

import { API_HOST } from "@/app/components/host";
import Image from "next/image";
import BaseInfo from "./components/baseInfo";
import { PersonsAds, PersonsHelps } from "./components/lists";
import BaseText from "@/app/components/texts";

export default async function Card({params}) {
    let personId = params.personcard[0];
    try {
        let res = await fetch(`${API_HOST}/getperson?id=${personId}`, {method: 'GET'});
        if (res.status == 200) {
            let data = await res.json();
            return (
                <>
                    <section className="flex gap-10">
                        <div>
                            <div className="p-2.5 rounded-medium h-[330px] aspect-square">
                                <Image alt="avatar" fill={true} className="rounded-base"/>
                            </div>
                            <BaseInfo person={data.base}/>
                        </div>
                    </section>
                    <section className="grid-cols-2">
                        <Info>
                            <About about={data.base.about}></About>
                        </Info>
                        <List>
                            <Title>Объявления пользователя</Title>
                            <PersonsAds ads={data.ads}/>
                            <PersonsHelps ads={data.helps}/>
                        </List>
                    </section>
                </>
            )
        }
        else throw new Error(res.status);
    } catch(e) {
        return(
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

function List({children}) {
    return (
        <div className="flex flex-col gap-5 w-[890px]">
            {children}
        </div>
    )
}


