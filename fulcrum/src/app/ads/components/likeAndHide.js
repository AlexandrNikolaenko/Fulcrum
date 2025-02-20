'use client'

import Image from "next/image";

export function LikeAd({like, id}) {
    let [isLike, setIsLike] = useState(like);
    let src
    if (isLike) src = '/Like.svg';
    else src = '/notLike.svg';

    async function setLike() {
        let res = await fetch(`${API_HOST}/ads/like`, {
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

    return <button onClick={() => {
        setLike();
    }} className="w-fit h-fit"><Image alt="like" src={src} width={24} height={24}></Image></button>
}

export function HideAd({isHide, setIsHide}) {
    async function hide() {
        let res = fetch(`${API_HOST}/ads/hide`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            credentials: 'include', 
            body: JSON.stringify({id: ad.id, hide: !isHide})
        });
        if (res.status == 200) setIsHide(!isHide);
    }

    return <button onClick={hide} className="w-fit h-fit"><Image alt="hide" src={"/Hide.svg"} width={24} height={24}></Image></button>
}