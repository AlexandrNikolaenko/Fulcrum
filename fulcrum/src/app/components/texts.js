'use client'

export default function BaseText({children}) {
    return (
        <p className="text-dark text-base">{children}</p>
    )
}

export function CenterFullText({children}) {
    return (
        <p className="text-dark text-base w-full text-center">{children}</p>
    )
}

export function CenterText({children}) {
    return (
        <p className="text-base text-dark text-center">{children}</p>
    )
}

export function DifSizeText({size, children}) {
    return (
        <p className={`text-dark ${size}`}>{children}</p>
    )
}