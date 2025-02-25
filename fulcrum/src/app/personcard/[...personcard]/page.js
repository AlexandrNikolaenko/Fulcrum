'use server'

import { API_HOST } from "@/app/components/host";
import Image from "next/image";
import BaseInfo from "./components/baseInfo";

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
                        <div className="flex flex-col gap-2.5 w-full">

                        </div>
                        <div className="flex flex-col gap-5 w-[890px]">

                        </div>
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

function About({about}) {
    return (
        <div className="flex flex-col gap-2.5">
            <p className="text-3xl text-dark font-title">О себе:</p>
            <p className="text-dark text-base">{about}</p>
        </div>
    )
}