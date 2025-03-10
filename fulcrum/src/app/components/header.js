'use client'

import { BaseLink } from "./buttons";
import Link from "next/link";
import { API_HOST } from "./host";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    let [user, setUser] = useState({name: null, id: null});
    let [isShow, setIsShow] = useState(true);
    let path = usePathname();
    if (path.split('/')[1] == 'auth' && isShow) setIsShow(false); 
    else if (path.split('/')[1] != 'auth' && !isShow) setIsShow(true);

    useEffect(() => {
        async function getData () {
            if (user.name !== null) return;
            let res = await fetch(`${API_HOST}/getuser`, {method: 'GET', credentials: 'include', cache: 'no-cache'});
            if (res.status == 200) {
                let data = await res.json();
                if (data.name) setUser(data);
                else if (data.id) setUser({name: `user_${data.id}`, id: data.id});
                
            }
        }
        getData();
    })
    
    if (isShow) {
        return (
            <header className="z-50 fixed w-full bg-white flex justify-between items-center px-[50px] py-3.5 shadow-down">
                <div className="flex justify-between items-center max-w-[1360px] w-full mx-auto">
                    <Logo />
                    <NavLinks />
                    {user.name ? <UserMenu user={user}/> : <BaseLink text={'Войти'} href={'/auth/signup'} />}
                </div>
            </header>
        );
    } else return <></>
}

function UserMenu({user}) {
    return (
        <Link href={`/account/${user.id}`}>{user.name}</Link>
    )
}

function NavLinks() {
    return(
        <nav className="flex gap-x-10">
            <Link href={'/'}>Главная</Link>
            <Link href={'/ads'}>Объявления</Link>
            <Link href={'/helps'}>Взаимопомощь</Link>
        </nav>
    )
}

function Logo() {
    return(
        <Link href={'/'} className="flex flex-col rotate-[-25deg]">
            <TextLogo>точка</TextLogo>
            <TextLogo>опоры</TextLogo>
        </Link>
    )
}

function TextLogo({children}) {
    return <span className="text-base-blue font-title font-bold text-xs uppercase">{children}</span>
}