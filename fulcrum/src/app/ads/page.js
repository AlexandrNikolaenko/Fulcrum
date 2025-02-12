'use client'

import { Search } from "./components/search";
import Filter from "./components/filter"
import AdsList from "./components/list"

export default function Page() {
    let ads = [];
    function show() {
        return
    }

    return(
        <div className="flex flex-col items-center gap-7 pt-[110px] wrapper">
            <Search />
            <div className="flex gap-16 items-start">
                <Filter action={show}/>
                <AdsList ads={ads}/>
            </div>
        </div>
    )
}