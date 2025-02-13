'use server'

export default async function AuthLayout({children}) {
    return (
        <div className="flex justify-center items-center wrapper h-screen">
            <div className="flex flex-col gap-y-2.5 w-[482px] items-center p-5 h-fit bg-white shadow-base rounded-large">
                {children}
            </div>
        </div>
    )
}