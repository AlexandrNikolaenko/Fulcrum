import { BaseLink } from "./buttons";
import Link from "next/link";

function enter() {
    return
}

export default function Header() {

    return (
        <header className="fixed w-full bg-white flex justify-between items-center px-[50px] py-3.5 shadow-down">
            <Logo />
            <NavLinks />
            <BaseLink text={'Войти'} href={'/auth/signup'} />
        </header>
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