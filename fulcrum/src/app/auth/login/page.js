'use client'

import { BaseButton, SubmitButton } from "@/app/components/buttons"
import {LableInput, InputAuthField} from "../components/inputs"
import OrLine from "../components/or"
import Link from "next/link";
import { APP_HOST, API_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";

export default function Login() {
    async function send(e) {
        e.preventDefault();
        let clearData = Object.fromEntries(new FormData(document.getElementById('login')))
        let res = await fetch(`${API_HOST}/auth/login?email=${clearData.email}&password=${clearData.password}`, {method: 'GET', credentials: 'include'});
        if (res.status == 200) redirect(`${APP_HOST}/`);
    }

    return(
        <>
            <form id="login" className="flex flex-col gap-y-2.5 w-full" onSubmit={(e) => send(e)}>
                <LableInput htmlFor={'email'}>Введите адрес электронной почты</LableInput>
                <InputAuthField name={'email'} type={'email'} placeholder={'Email'}/>
                <LableInput htmlFor={'password'}>Введите пароль</LableInput>
                <InputAuthField name={'password'} type={'password'} placeholder={'Пароль'} autoFill={'new-password'}/>
                <div className="flex justify-center">
                    <SubmitButton text={'Войти'} />
                </div>
            </form>
            <OrLine />
            <Link href={'/auth/signup'} className="underline text-dark text-base">Зарегистрироваться</Link>
            <span className="underline text-xs text-dark">Забыли пароль?</span>
        </>
    )
}