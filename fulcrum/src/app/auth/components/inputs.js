'use client'

export function LableInput({htmlFor, children}) {
    return <label htmlFor={htmlFor} className='text-base text-dark'>{children}</label>
}

export function InputAuthField({placeholder, name, type, autoFill}) {
    return <input id={name} name={name} placeholder={placeholder} type={type} autoComplete={autoFill} className="bg-light-gray shadow-inner w-full py-[6px] px-5 rounded-base"></input>
}