'use client'

import { API_HOST, APP_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Account() {
    let [data, setData] = useState({data: null, isLoad: false, isSuccess: false});
    useEffect(() => {
        async function getData() {
            if (!data.isLoad) {
                let redirectPath = false;
                try {
                    let res = await fetch(`${API_HOST}/account`, {
                        method: 'GET', 
                        credentials: 'include',
                        cache: 'no-cache'
                    });
                    console.log(res.status);
                    if (res.ok) setData({data: await res.json(), isLoad: true, isSuccess: true});
                    else if (res.status == 401) redirectPath = `${APP_HOST}/auth/signup`;
                    else throw new Error(res.status);
                } catch(e) {
                    console.log(e);
                    setData({data: null, isLoad: true, isSuccess: false});
                } finally {
                    if (redirectPath) redirect(redirectPath);
                }
            }
        }
        getData();
    });
    if (data.isLoad) {
        return (
            <main className="relative z-40 pt-[502px]">
                {
                    data.isSuccess &&
                    <div className="w-full bg-white rounded-t-[50px] h-60">

                    </div>
                }
            </main>
        )
    } else return <></>
}

function BaseInfo() {
    return (
        <section className="flex">
            
        </section>
    )
}