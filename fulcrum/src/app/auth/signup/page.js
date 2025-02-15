'use client'

import { SubmitButton } from "@/app/components/buttons"
import {LableInput, InputAuthField} from "../components/inputs"
import OrLine from "../components/or"
import Link from "next/link"
import { useState } from "react"
import { API_HOST, APP_HOST } from "@/app/components/host"

export default function SignUp() {
    let [isSuccess, setIsSuccess] = useState(false);

    async function send() {
        console.log('done');
        let clearData = Object.fromEntries(new FormData(document.getElementById('signup')))
        let res = await fetch(`${API_HOST}/auth/signup?email=${clearData.email}&password=${clearData.password}`, {method: 'GET'});
        if (res.status == 200) setIsSuccess(true);
    }

    if (isSuccess) {
        return (
            <p className="text-lg text-dark">Подтвердите адрес электронной почты, перейдя по ссылке из отправленного письма</p>
        )
    }

    return (
        <>
            <form id="signup" className="flex flex-col gap-y-2.5 w-full" onSubmit={(e) => {
                e.preventDefault();
                send();
            }}>
                <LableInput htmlFor={'email'}>Введите адрес электронной почты</LableInput>
                <InputAuthField name={'email'} type={'email'} placeholder={'Email'}/>
                <LableInput htmlFor={'password'}>Введите пароль</LableInput>
                <InputAuthField name={'password'} type={'password'} placeholder={'Пароль'} autoFill={'new-password'}/>
                <LableInput htmlFor={'repassword'}>Повторите пароль</LableInput>
                <InputAuthField name={'repassword'} type={'password'} placeholder={'Пароль'} autoFill={'new-password'}/>
                <div className="flex justify-center">
                    <SubmitButton text={'Зарегистрироваться'}/>
                </div>
            </form>
            <OrLine />
            <Link href={'/auth/login'} className="underline text-dark text-base">Войти</Link>
        </>
    )
}

