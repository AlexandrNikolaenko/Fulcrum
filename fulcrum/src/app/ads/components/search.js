'use client'

import { SortButton, BaseButton } from "@/app/components/buttons";
import SearchField from "@/app/components/searchField";

export function Search() {
    function sort() {return}
    function search() {return}

    return (
        <div className="flex gap-x-5 items-center">
            <form className="flex gap-x-5 items-center">
                <SearchField placeholder={'Найдите нужный вам предмет или помощника'} name={'query'}/>
                <BaseButton action={search} text={'Найти'}/>
            </form>
            <SortButton action={sort}/>
        </div>
    )
}