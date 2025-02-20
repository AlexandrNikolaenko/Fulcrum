'use server';

import { BaseButton } from "@/app/components/buttons";
import AuthorCard from "./components/person";
import { LikeAd, HideAd } from "../../components/likeAndHide";
import Image from "next/image";
import Ad from "./components/ad";

export default async function Adcard({params}) {
    const cardId = params.adcard[0];
    let res = await fetch(`/getad?id=${cardId}`, {method: 'GET'});
    if (res.status == 200) {
        let data = await res.json();
        return (
            <>
                <div className="flex items-start gap-7 ">
                    <AuthorCard author={data.author}/>
                    <BaseInfo data={data.base}/>
                </div>
                <h3 className="text-3xl text-dark font-title">Похожее</h3>
                <Same ads={data.same}/>
            </>
        )
    } else {
        return <p className="text-base text-dark text-center">Что-то пошло не так:(</p>
    }
}

function BaseInfo({data}) {
    return(
        <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-7">
                <div className="flex flex-col gap-5">
                    <h2 className="font-title text-4xl text-dark font-bold">{data.title}</h2>
                    <span className="font-title text-3xl text-dark font-bold">{data.price}</span>
                    <div className="flex gap-2.5">
                        <BaseButton text={'Перейти в чат'} action={() => {return}}/>
                        <LikeAd like={data.like} id={data.id}/>
                        <HideAd isHide={data.hide} setIsHide={() => {return}}/>
                    </div>
                </div>
                <Image alt={"ad's imgae"} src={data.image_link} width={253} height={190}/>
            </div>
            <p className="text-dark">Описание</p>
            <p className="text-dark text-base">{data.desc}</p>
        </div>
    )
}

function Same({ads}) {
    return (
        <ul className="w-full overflow-x-scroll">
            {
                ads.map(ad => <Ad key={ad.id} ad={ad}/>)
            }
        </ul>
    )
}