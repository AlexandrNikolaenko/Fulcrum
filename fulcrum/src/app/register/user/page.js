'use client'

import { useGetSecretData } from "@/app/components/hooks"
import { API_HOST } from "@/app/components/host";
import Image from "next/image";
import { ButtonsLine, InputField, InputLine, SelectField, TextField } from "../components/input";
import { courses, universities } from "@/app/components/data";
import { ImageFetch } from "../components/fetchs";

export default function Page() {
    let {data, setData} = useGetSecretData(`${API_HOST}/register/user`);
    function editAvatar() {
        document.getElementById("avatar").click();
    }

    async function setAvatar(e) {
        e.preventDefault();
        let names = [];
        Array.from(e.target.files).forEach(file => names.push(file.name));
        names = names.join(', ');
        ImageFetch({onSuccess: (newData) => setData({...data, data: {...data.data, avatar: newData.avatar}})});
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
                    <Image alt="avatar" width={330} height={330} src={`${data.data.avatar ? data.data.avatar : '/DefaultUser.svg'}`} className="rounded-base"/>
                    <button onClick={editAvatar} className="bg-white absolute bottom-[25px] right-[25px] rounded-full aspect-square overflow-hidden p-2.5"><Image alt="edit" width={20} height={20} src={'/Edit.svg'}/></button>
                    <input type="file" accept={'.jpg'} name={'avatar'} id={'avatar'} className="hidden" multiple={false} onChange={setAvatar} />
                    {/* <form className="absolute bottom-[25px] right-[25px]" onSubmit={e => e.preventDefault}>
                        <button onClick={editAvatar} className="bg-white rounded-full aspect-square overflow-hidden p-2.5"><Image alt="edit" width={20} height={20} src={'/Edit.svg'}/></button>
                        <input type="file" accept={'.jpg'} name={'avatar'} id={'avatar'} className="hidden" multiple={false} onChange={setAvatar} />
                    </form> */}
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