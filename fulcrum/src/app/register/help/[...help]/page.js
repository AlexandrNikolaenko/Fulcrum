'use client'

import { useGetRegisterData } from "@/app/components/hooks";
import Image from "next/image";
import { InputField, TextField, SelectField, ButtonsLine, InputFile } from "../../components/input";
import { parts } from "@/app/components/data";
import { ImageFetch } from "../../components/fetchs";

export default function Page() {
    let {data, setData} = useGetRegisterData('help');

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
    return (
        <>
        </>
    )
}

function FillForm({data, setData}) {
    function editImage() {
        document.getElementById("imageHelp").click();
    }

    async function setImage(e) {
        e.preventDefault();
        ImageFetch({ 
            query: `${API_HOST}/register/help/newimg`, 
            onSuccess: (newData) => setData({...data, data: {...data.data, image_link: newData.image_link}}), 
            onError: () => {}, 
            formId: 'imageHelp'
        });
    }

    async function send() {
        let formData = new FormData()
    }

    async function BackToProfile() {

    }

    return (
        <>
            <div className="p-[15px] rounded-large relative shadow-center">
                <Image alt="image" width={330} height={330} src={`${data.data.image_link ? data.data.image_link : '/DefaultUser.svg'}`} className="rounded-base"/>
                <InputFile editImage={editImage} id={'imageHelp'} name={'imageHelp'} setImage={setImage}/>
            </div>
            <form id="helpRegister" className="flex flex-col gap-2.5 w-full">
                <InputField label={'Название'} name={'title'} placeholder={'Введите название услуги'} value={data.data.title ? data.data.title : ''}/>
                <SelectField values={parts} label={'Укажите предметную область'} name={'part'} placeholder={'Введите название области'} value={data.data.part ? data.data.part : ''}/>
                {/* <InputField label={'Укажите начальную цену услуги'} name={'price'} type={'price'} placeholder={'Введите сумму'} value={data.data.prcie ? data.data.price : ''}/> */}
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