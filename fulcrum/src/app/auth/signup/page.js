'use client'

import { BaseButton } from "@/app/components/buttons"
import {LableInput, InputAuthField} from "../components/inputs"
import OrLine from "../components/or"
import Link from "next/link"

export default function SignUp() {
    let [isSuccess, setIsSuccess] = useState(false);

    async function send(e) {
        e.preventDefault();
        let clearData = Object.fromEntries(new FormData(document.getElementById('login')))
        let res = await fetch(`${API_HOST}/auth/signup?email=${clearData.email}&password=${clearData.password}'`, );
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
                    <BaseButton text={'Зарегистрироваться'} action={(e) => {
                        e.preventDefault();
                        document.getElementById('signup').submit();
                    }}/>
                </div>
            </form>
            <OrLine />
            <Link href={'/auth/login'} className="underline text-dark text-base">Войти</Link>
        </>
    )
}

