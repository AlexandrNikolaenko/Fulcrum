import Link from "next/link";
import Image from "next/image";

export function BaseButton({text, action}) {
    return (
        <button onClick={action} className="text-base rounded-base py-2.5 px-5 bg-base-blue active:bg-dark-blue focus:bg-dark-blue hover:bg-dark-blue">{text}</button>
    )
}

export function BaseLink({text, href}) {
    return(
        <Link href={href} className="text-base rounded-base py-2.5 px-5 bg-base-blue active:bg-dark-blue focus:bg-dark-blue hover:bg-dark-blue">{text}</Link>
    )
}

export function EditButton({action}) {
    return(
        <button onClick={action} className="flex gap-2.5 rounded-base py-2.5 px-5 bg-">
            <span>Редактировать</span>
            <Image alt="Edit" src={'/Edit.svg'} />
        </button>
    )
}

export function DeleteButton({action}) {
    return (
        <button onClick={action} className="text-base rounded-base py-2.5 px-5 bg-white shadow-center text-red active:text-dark-red focus:text-dark-red hover:text-dark-red">Удалить</button>
    )
}