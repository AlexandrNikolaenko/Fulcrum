'use client'

import { useGetSecretData } from "@/app/components/hooks"
import { API_HOST } from "@/app/components/host";
import Image from "next/image";
import { ButtonsLine, InputField, InputLine, SelectField, TextField, InputFile } from "../components/input";
import { courses, universities } from "@/app/components/data";
import { ImageFetch } from "../components/fetchs";

export default function Page() {
    let {data, setData} = useGetSecretData(`${API_HOST}/register/user`);
    function editAvatar(e) {
        e.preventDefault();
        document.getElementById('avataInput').click();
    }

    function setAvatar(e) {
        e.preventDefault();
        ImageFetch({ 
            query: `${API_HOST}/register/user/newimg`, 
            onSuccess: (newData) => setData({...data, data: {...data.data, avatar: newData.avatar}}), 
            onError: () => {}, 
            formId: 'avatar'
        });
    }

    async function send() {

    }

    async function BackToProfile() {

    }

    return (
        <>
        {
            data.isSuccess &&
            <>
                <div className="p-[15px] rounded-large relative shadow-center">
                    <Image alt="avatar" width={330} height={330} src={`${data.data.avatar ? `${data.data.avatar}?nocache=${Date.now()}` : '/DefaultUser.svg'}`} className="rounded-base"/>
                    <form id={'avatar'} className="absolute bottom-[25px] right-[25px]">
                        <InputFile editImage={editAvatar} id={'avataInput'} name={'avatar'} setImage={setAvatar}/>
                    </form>
                </div>
                <form id="userRegister" className="flex flex-col gap-2.5 w-full">
                    <InputLine>
                        <InputField label={'Имя'} name={'name'} placeholder={'Имя'} value={data.data.username ? data.data.username.split(' ')[0] : ''}/>
                        <InputField label={'Фамилия'} name={'lastname'} placeholder={'Фамилия'} value={data.data.username ? data.data.username.split(' ')[1] : ''}/>
                        <InputField label={'Отчество'} name={'surname'} placeholder={'Отчество'} value={data.data.username ? data.data.username.split(' ')[1] : ''}/>
                    </InputLine>
                    <InputLine>
                        <SelectField values={universities} label={'Место обучения'} name={'university'} placeholder={'Выберите университет'} value={data.data.university ? data.data.university : ''}/>
                        <SelectField values={courses} label={'Курс'} name={'course'} placeholder={'Укажите курс'} value={data.data.course ? data.data.course : ''}/>
                    </InputLine>
                    <TextField label={'Место обучения'} name={'university'} placeholder={'Выберите университет'} value={data.data.username ? data.data.username : ''}/>
                    <InputLine>
                        <InputField label={'Email для связи'} name={'email'} type={'email'} placeholder={'Укажите свою почту для связи'} value={data.data.username ? data.data.username.split(' ')[1] : ''}/>
                        <InputField label={'Ник в телеграмм'} type={'telegram'} name={'telegram'} placeholder={'@nickname'} value={data.data.username ? data.data.username.split(' ')[0] : ''}/>
                    </InputLine>
                </form>
                <ButtonsLine onSend={send} onBack={BackToProfile}/>
            </>
        }
        </>
    )
}