'use client'

import { useState } from "react"
import HelpList from "./components/helpList"
import Search from "./components/search"

export default function Page() {
    let [helps, setHelps] = useState([]);

    return(
        <div className="flex flex-col gap-y-7 pt-[110px] wrapper items-center">
            <Search change={setHelps}/>
            <HelpList helps={helps}/>
        </div>
    )
}