'use client';

import { BaseLink } from "@/app/components/buttons";
import { APP_HOST } from "@/app/components/host";
import Image from "next/image";
import { useState } from "react";
import BaseText from "@/app/components/texts";


export default function AuthorCard({author}) {
    let [isExpand, setIsExpend] = useState(false);

    if (!author.avatar) author.avatar = '/Edit.svg'

    return (
        <div className="flex flex-col gap-2.5 shadow-center p-[15px] rounded-medium bg-white">
            {/* <Image alt="author's avatar" src={`${APP_HOST}/personcard/${author.id}`} fill={true} className="aspect-square"/> */}
            <Image alt="author's avatar" src={author.avatar} width={330} height={330}/>
            <p className="text-2xl font-title text-dark">{author.name}</p>
            <p className="text-base text-dark font-title">{author.university} {author.course}</p>
            <p className="text-base text-dark font-title">О себе</p>
            <BaseText>{author.about}</BaseText>
            <button className="text-dark underline" onClick={() => setIsExpend(!isExpand)}>{isExpand ? 'Свернуть' : 'Развернуть'}</button>
            <BaseLink text={'Перейти на страницу'} href={`${APP_HOST}/personcard/${author.id}`}/>
        </div>
    )
}

