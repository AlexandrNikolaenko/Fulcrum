'use client'

import { useGetRegisterData } from "@/app/components/hooks";
import Image from "next/image";
import { InputField, TextField, SelectField, ButtonsLine, InputLine, InputFile } from "../../components/input";
import { parts } from "@/app/components/data";

export default function Page() {
    let {data, setData} = useGetRegisterData('ad');
    
    if (data.isLoad) {
        return (
            <>
                {
                    data.data && data.isSuccess
                    ?
                    <FillForm data={data} setData={setData}/>
                    :
                    <EmptyForm />
                }
            </>
        )
    }
}

function FillForm({data, setData}) {
    function editImage() {
        document.getElementById("imageAd").click();
    }

    async function setImage(e) {
        e.preventDefault();
        ImageFetch({ 
            query: `${API_HOST}/register/ad/newimg`, 
            onSuccess: (newData) => setData({...data, data: {...data.data, image_link: newData.image_link}}), 
            onError: () => {}, 
            formId: 'imageAd'
        });
    }

    async function send() {

    }

    async function BackToProfile() {

    }

    return (
        <>
            <div className="p-[15px] rounded-large relative shadow-center">
                <Image alt="image" width={330} height={330} src={`${data.data.image_link ? data.data.image_link : '/DefaultUser.svg'}`} className="rounded-base"/>
                <InputFile editImage={editImage} id={'imageAd'} name={'image'} setImage={setImage}/>
            </div>
            <form id="userRegister" className="flex flex-col gap-2.5 w-full">
                <InputField label={'Название'} name={'title'} placeholder={'Введите название услуги'} value={data.data.title ? data.data.title : ''}/>
                <InputLine>
                    <SelectField values={parts} label={'Укажите предметную область'} name={'part'} placeholder={'Введите название области'} value={data.data.part ? data.data.part : ''}/>
                    <InputField label={'Укажите начальную цену услуги'} name={'price'} type={'price'} placeholder={'Введите сумму'} value={data.data.price ? data.data.price : ''}/>
                </InputLine>
                <TextField label={'Описание'} name={'body'} placeholder={'ВОпишите услугу подробнее'} value={data.data.body ? data.data.body : ''}/>
            </form>
            <ButtonsLine onSend={send} onBack={BackToProfile}/>
        </>
    )
}

function EmptyForm() {
    return (
        <>
        </>
    )
}