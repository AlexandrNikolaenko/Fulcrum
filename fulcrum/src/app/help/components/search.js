'use client'

import SearchField from "@/app/components/searchField";
import { BaseButton, SortButton, FilterButton } from "@/app/components/buttons";
import Filters from "./filter";
import { useState } from "react";

export default function Search() {
    let [isShow, setIsShow] = useState(false);

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
            <Filters isShow={isShow}/>
        </>
    )
}