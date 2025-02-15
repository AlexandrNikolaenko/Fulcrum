'use client'

import { BaseLink } from "./buttons";
import Link from "next/link";
import { API_HOST } from "./host";
import { useState, useEffect } from "react";

export default function Header() {
    let [user, setUser] = useState(null);

    useEffect(() => {
        async function getData () {
            if (user !== null) return;
            let res = await fetch(`${API_HOST}/getuser`, {method: 'GET', credentials: 'include', cache: 'no-cache'});
            if (res.status == 200) {
                let data = await res.json();
                if (data.name) setUser(data.name);
                else if (data.id) setUser(`user_${data.id}`);
                
            }
        }
        getData();
    })
    

    return (
        <header className="fixed w-full bg-white flex justify-between items-center px-[50px] py-3.5 shadow-down">
            <div className="flex justify-between items-center max-w-[1360px] w-full mx-auto">
                <Logo />
                <NavLinks />
                {user ? <UserMenu user={user}/> : <BaseLink text={'Войти'} href={'/auth/signup'} />}
            </div>
        </header>
    )
}

function UserMenu({user}) {
    return (
        <Link href={'/account'}>{user}</Link>
    )
}

function NavLinks() {
    return(
        <nav className="flex gap-x-10">
            <Link href={'/'}>Главная</Link>
            <Link href={'/ads'}>Объявления</Link>
            <Link href={'/help'}>Взаимопомощь</Link>
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