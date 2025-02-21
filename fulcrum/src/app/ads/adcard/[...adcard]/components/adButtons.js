'use client';

import { LikeAd, HideAd } from "@/app/ads/components/likeAndHide";
import { BaseButton } from "@/app/components/buttons";

export default function AdButtons({data}) {
    function toChat() {
        return
    }

    return (
        <div className="flex gap-2.5">
            <BaseButton text={'Перейти в чат'} action={toChat}/>
            <LikeAd like={data.like} id={data.id}/>
            <HideAd isHide={data.hide} setIsHide={() => {return}}/>
        </div>
    )
}