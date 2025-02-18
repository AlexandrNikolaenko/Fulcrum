'use client'

import { Search } from "./components/search";
import Filter, {defaultFilters} from "./components/filter"
import AdsList from "./components/list"
import { useState } from "react";

export default function Page() {
    let [showResults, setShowResults] = useState({university: defaultFilters[0].value, subject: defaultFilters[1].value, course: defaultFilters[2].value})

    function show(filters) {
        console.log(filters);
        setShowResults(filters);
        return
    }

    return(
        <div className="flex flex-col items-center gap-7 pt-[110px] wrapper">
            <Search />
            <div className="flex gap-16 items-start w-full">
                <Filter action={show}/>
                <AdsList filters={showResults}/>
            </div>
        </div>
    )
}