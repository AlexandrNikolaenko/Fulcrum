export default function Layout({children}) {
    return(
        <div className="flex flex-col gap-12 wrapper pt-[110px]">
            {children}
        </div>
    )
}