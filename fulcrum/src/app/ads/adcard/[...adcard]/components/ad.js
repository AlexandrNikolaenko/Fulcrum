'use client';

import { BaseLink } from "@/app/components/buttons";
import { LikeAd, HideAd } from "../../components/likeAndHide";
import Image from "next/image";
import Plug from "@/app/components/plug";

export default function Ad({ad}) {
    let [isHide, setIsHide] = useState(ad.isHide);

    if (isHide) return <></>

    return (
        <li className={`flex gap-5 p-5 rounded-large shadow-center bg-white items-start w-full max-w-[869px]`}>
            {ad && ad.imageLink ? <Image src={ad.imageLink} width={256} height={176} alt="Ad's image"/> : <Plug className={'w-[256px] h-[176px] bg-gray rounded-base'}/>}
            <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex justify-between gap-2.5">
                    <p>{ad.title}</p>
                    <p>{ad.price}</p>
                </div>
                <p>{ad.user.univeersity}, {ad.user.course}</p>
                <p>Количество воспользовавшихся услугой: {ad.count}</p>
                <p>{ad.body}</p>
                <div className="flex gap-2.5">
                    <BaseLink text={'Написать'} href={`${APP_HOST}/ads/adcard/${ad.id}`}/>
                    <LikeAd like={ad.isLike} id={ad.id}/>
                    <HideAd isHide={isHide} setIsHide={setIsHide}/>
                </div>
            </div>
        </li>
    )
}