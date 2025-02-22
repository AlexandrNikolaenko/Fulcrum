'use client'

import { SortButton, BaseButton } from "@/app/components/buttons";
import { API_HOST } from "@/app/components/host";
import SearchField from "@/app/components/searchField";

export function Search({setAds, setSort}) {
    function sort() {return}
    async function search() {
        let data = new FormData(document.getElementById('adsearch'));
        let res = await fetch(`${API_HOST}/ads/search?query=${Object.fromEntries(data).query}`, {method: 'GET'});
        if (res.status == 200) {
            setAds((await res.json()));
        }
    }

    return (
        <div className="flex gap-x-5 items-center">
            <form id="adsearch" className="flex gap-x-5 items-center">
                <SearchField placeholder={'Найдите нужный вам предмет или помощника'} name={'query'}/>
                <BaseButton action={search} text={'Найти'}/>
            </form>
            <SortButton action={sort}/>
        </div>
    )
}