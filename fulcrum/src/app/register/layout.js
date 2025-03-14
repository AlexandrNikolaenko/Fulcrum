'use server'

export default async function Layout({children}) {
    return (
        <main className="w-full bg-light-gray flex items-center justify-center">
            <div className="flex flex-col p-5 rounded-large shadow-center bg-white gap-[30px] items-center">
                {children}
            </div>
        </main>
    )
}
