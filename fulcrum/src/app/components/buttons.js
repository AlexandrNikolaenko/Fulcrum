'use client'

import Link from "next/link";
import Image from "next/image";

export function BaseButton({text, action}) {
    return (
        <button onClick={action} className="text-base text-white rounded-base py-[6px] px-5 bg-base-blue active:bg-dark-blue focus:bg-dark-blue hover:bg-dark-blue transition-all">{text}</button>
    )
}

export function BaseLink({text, href}) {
    return(
        <Link href={href} className="text-base text-white rounded-base py-[6px] px-5 bg-base-blue active:bg-dark-blue focus:bg-dark-blue hover:bg-dark-blue">{text}</Link>
    )
}

export function EditButton({action}) {
    return(
        <button onClick={action} className="flex gap-2.5 rounded-base py-[6px] px-5 bg-">
            <span className="text-dark">Редактировать</span>
            <Image alt="Edit" src={'/Edit.svg'} />
        </button>
    )
}

export function DeleteButton({action}) {
    return (
        <button onClick={action} className="text-base rounded-base py-[6px] px-5 bg-white shadow-center text-red active:text-dark-red focus:text-dark-red hover:text-dark-red">Удалить</button>
    )
}

export function SortButton({action}) {
    return (
        <button onClick={action} className="p-2.5 rounded-base bg-white shadow-center"><Image src={'/Sort.svg'} alt="sort" width={20} height={20}/></button>
    )
}