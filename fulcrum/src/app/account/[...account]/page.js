'use server'

import { API_HOST, APP_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";

export default async function Account() {
    let redirectPath = false;
    try {
        let res = await fetch(`${API_HOST}/account`, {
            method: 'GET',
            credentials: 'include'
        });
        if (res.ok) {
            let data = await res.json();
            return (
                <>
                </>
            )
        } else if (res.status == 401) redirectPath = `${APP_HOST}/auth/signup`;
        else throw new Error(res.status);
    } catch(e) {
        console.log(e);
        return (
            <main className="relative z-40">
            </main>
        )
    } finally {
        if (redirectPath) redirect(redirectPath);
    }
}

function BaseInfo() {
    return (
        <section className="flex">

        </section>
    )
}