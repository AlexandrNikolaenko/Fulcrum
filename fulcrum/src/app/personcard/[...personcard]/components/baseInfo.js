'use client'

import { BaseButton } from "@/app/components/buttons"
import { API_HOST } from "@/app/components/host";
import BaseText from "@/app/components/texts";
import Image from "next/image";
import { useState } from "react";

export default function BaseInfo({person}) {
    function openChat() {
        return;
    }

    return(
        <div className="flex flex-col gap-2.5">
            <h3 className="font-title text-dark text-3xl">{person.name}</h3>
            <p className="text-dark text-xl font-title">{person.university}, {person.course}</p>
            <p className="text-dark text-xl font-title">О себе:</p>
            <BaseText>{person.about}</BaseText>
            <div className="flex gap-5">
                <BaseButton text={'Перейти в чат'} action={openChat}/>
                <LikePerson id={person.id}/>
            </div>
        </div>
    )
}

function LikePerson({id}) {
    let [isLike, setIsLike] = useState();

    async function like() {
        try {
            let res = await fetch(`${API_HOST}/person/like`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                },
                credentials: 'include',
                body: JSON.stringify({id: id})
            });
            if (res.status == 200) setIsLike(!isLike);
            else throw new Error(res.status);
        } catch(e) {
            console.log(e);
            return;
        }

    }

    return (
        <button onClick={like}><Image alt="like" width={24} height={24} src={isLike ? '/notLike.svg' : '/Like.svg'}/></button>
    )
}