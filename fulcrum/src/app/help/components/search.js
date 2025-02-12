'use client'

import SearchField from "@/app/components/searchField";
import { BaseButton, SortButton, FilterButton } from "@/app/components/buttons";
import Filters from "./filter";

export default function Search() {
    function sort() {return}
    function search() {return}
    function filter() {return}

    return (
        <>
            <div className="flex gap-x-5 items-center">
                <form className="flex gap-x-5 items-center">
                    <SearchField placeholder={'Найдите нужный вам предмет или помощника'} name={'query'}/>
                    <BaseButton action={search} text={'Найти'}/>
                </form>
                <FilterButton action={filter}/>
                <SortButton action={sort}/>
            </div>
            <Filters />
        </>
    )
}