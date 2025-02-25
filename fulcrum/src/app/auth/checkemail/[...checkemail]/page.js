'use server';

import { API_HOST, APP_HOST } from "@/app/components/host";
import { DifSizeText } from "@/app/components/texts";
import { redirect } from "next/navigation";

export default async function Check({params}) {
    let link = params.checkemail[0];
    let res = await fetch(`${API_HOST}/auth/adduser`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        method: 'POST',
        body: JSON.stringify({link: link})
    });
    if (res.status == 200) redirect(`${APP_HOST}/`, 'replace');
    else {
        console.log(res.status);
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <DifSizeText size={'text-lg'}>Что-то пошло не так:(</DifSizeText>
            </div>
        )
    }
}