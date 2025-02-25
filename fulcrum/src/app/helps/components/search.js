'use client'

import SearchField from "@/app/components/searchField";
import { BaseButton, SortButton, FilterButton } from "@/app/components/buttons";
import Filters from "./filter";
import { useState } from "react";
import { API_HOST } from "@/app/components/host";

export default function Search({change}) {
    let [isShow, setIsShow] = useState(false);

    async function returnHepls(args) {
        let res = await fetch(`${API_HOST}/helps?${args}`, {method: 'GET'});
        if (res.status == 200) change(await res.json());
    }

    function sort() {return}
    function search() {return}

    return (
        <>
            <div className="flex gap-x-5 items-center">
                <form className="flex gap-x-5 items-center">
                    <SearchField placeholder={'Найдите нужный вам предмет или помощника'} name={'query'}/>
                    <BaseButton action={search} text={'Найти'}/>
                </form>
                <FilterButton action={() => setIsShow(!isShow)}/>
                <SortButton action={sort}/>
            </div>
            <Filters isShow={isShow} action={returnHepls}/>
        </>
    )
}