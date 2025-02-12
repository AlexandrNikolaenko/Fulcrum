import HelpList from "./components/helpList"
import Search from "./components/search"

export default function Page() {
    return(
        <div className="flex flex-col gap-y-7 pt-[110px] wrapper items-center">
            <Search />
            <HelpList />
        </div>
    )
}