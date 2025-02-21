'use server'

export default async function AdcardLayout({children}) {
    return (
        <main className="flex flex-col w-full gap-y-7 wrapper pt-[110px]">
            {children}
        </main>
    )
}