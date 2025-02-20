'use client';

import { BaseLink } from "@/app/components/buttons";
import { APP_HOST } from "@/app/components/host";
import Image from "next/image";
import { useState } from "react";


export default function AuthorCard({author}) {
    let [isExpand, setIsExpend] = useState(false)

    return (
        <div className="flex flex-col shadow-center ">
            {/* <Image alt="author's avatar" src={`${APP_HOST}/personcard/${author.id}`} fill={true} className="aspect-square"/> */}
            <Image alt="author's avatar" src={author.avatar} width={330} height={330}/>
            <p className="text-2xl font-title text-dark">{author.name}</p>
            <p className="text-base text-dark font-title">{author.university} {author.course}</p>
            <p className="text-base text-dark font-title">О себе</p>
            <p className="text-base text-dark">{author.about}</p>
            <button className="text-dark underline" onClick={() => setIsExpend(!isExpand)}>{isExpand ? 'Свернуть' : 'Развернуть'}</button>
            <BaseLink text={'Перейти на страницу'} href={`${APP_HOST}/personcard/${author.id}`}/>
        </div>
    )
}

