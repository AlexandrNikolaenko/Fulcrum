import { BaseLink } from "@/app/components/buttons"
import { APP_HOST, API_HOST } from "@/app/components/host"
import Image from "next/image"
import { useState } from "react"

export default function HelpList({helps}) {
    if (!helps || helps.length == 0){
        return <p className="w-full text-base text-dark text-center">По вашему запросу пока что нет результатов :(</p>
    }

    return (
        <div className="w-full grid-cols-2 gap-2.5">
            <ul className="w-full flex flex-col gap-2.5">
                {helps[0].map(help => <Help key={help.id} help={help}/>)}
            </ul>
            <ul className="w-full flex flex-col gap-2.5">
                {helps[1].map(help => <Help key={help.id} help={help}/>)}
            </ul>
        </div>
    )
}

function Help({help}) {
    let [isHide, setIsHide] = useState(help.hide);

    async function hide() {
        let res = fetch(`${API_HOST}/helps/hide`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            credentials: 'include', 
            body: JSON.stringify({id: help.id, hide: !help.hide})
        });
        if (res.status == 200) setIsHide(!isHide)
    }

    if (isHide) {
        return <></>
    }

    return(
        <li className={`flex flex-col gap-2.5 rounded-large p-[15px] bg-white shadow-center`}>
            {help.image_link && <Image alt={'image'} src={help.image_link} fill={true}/>}
            <h2 className="text-dark text-2xl font-bold">{help.title}</h2>
            <p className="text-base text-dark">{help.university}, {help.course}</p>
            <p className="text-base text-dark">{help.created_at}</p>
            <p className="text-base text-dark">{help.body}</p>
            <div className="flex gap-5">
                <BaseLink text={'Написать'} href={`${APP_HOST}/help/helpcard/${help.id}`}/>
                <Like like={help.like} id={help.id}/>
                <button onClick={hide} className="w-fit h-fit"><Image alt="hide" src={"/Hide.svg"} width={24} height={24}></Image></button>
            </div>
        </li>
    )
}

function Like({like, id}) {
    let [isLike, setIsLike] = useState(like);
    let src
    if (isLike) src = '/Like.svg';
    else src = '/notLike.svg';

    async function setLike() {
        let res = await fetch(`${API_HOST}/helps/like`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            credentials: 'include',
            body: JSON.stringify({id: id, like: !like})
        });
        if (res.status == 200) setIsLike(!setIsLike);
        else if (res.status == 401) alert('Чтобы отметить объявление войдите в систему или зарегистрируйтесь');
    }

    return <button onClick={setLike} className="w-fit h-fit"><Image alt="like" src={src} width={24} height={24}></Image></button>
}