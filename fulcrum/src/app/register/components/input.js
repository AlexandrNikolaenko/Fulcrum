'use client'

import { BaseButton } from "@/app/components/buttons"

function Label({name, label}) {
    return (
        <label htmlFor={name} className="text-base text-dark">{label}</label>
    )
}

function InputWrapper({children}) {
    return (
        <div className="flex flex-col items-start gap-2.5 w-full">
            {children}
        </div>
    )
}

export function InputField({label, placeholder, value, name, type}) {
    return (
        <InputWrapper>
            <Label label={label} name={name}/>
            <input id={name} name={name} type={type ? type : "text"} className="w-full outline-none px-5 py-1.5 rounded-base shadow-inner bg-light-gray placeholder:text-base placeholder:text-gray" defaultValue={value} placeholder={placeholder}/>
        </InputWrapper>
        
    )
}

export function TextField({label, placeholder, value, name}) {
    return (
        <InputWrapper>
            <Label label={label} name={name}/>
            <textarea className="w-full min-h-[161px] outline-none px-5 py-1.5 rounded-base shadow-inner bg-light-gray placeholder:text-base placeholder:text-gray" id={name} name={name} defaultValue={value} placeholder={placeholder} />
        </InputWrapper>
    )
}

export function InputLine({children}) {
    return (
        <div className="grid grid-cols-3 gap-2.5">
            {children}
        </div>
    )
}

export function SelectField({label, placeholder, value, name, values}) {
    return (
        <InputWrapper>
            <Label label={label} name={name}/>
            <select defaultValue={value} placeholder={placeholder} id={name} name={name} type="text" className="w-full px-5 py-1.5 outline-none rounded-base shadow-inner bg-light-gray placeholder:text-base placeholder:text-gray">
                {values.map(option => <Option key={option.id} value={option.value}/>)}
            </select>
        </InputWrapper>
    )
}

export function Option({value}) {
    return (
        <option value={value}>{value}</option>
    )
}

export function ButtonsLine({onSend, onBack}) {
    return (
        <div className="flex gap-2.5">
            <BaseButton action={onSend} text={'Сохранить'}/>
            <button onClick={onBack} className="text-base text-base-blue rounded-base border-[1px] border-base-blue py-[6px] px-5 bg-transparent active:border-dark-blue active:text-dark-blue focus:border-dark-blue focus:text-dark-blue hover:border-dark-blue hover:text-dark-blue transition-all">Выйти без изменений</button>
        </div>
    )
}