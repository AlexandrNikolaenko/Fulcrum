import { APP_HOST } from "@/app/components/host";
import { redirect } from "next/navigation";


export async function ImageFetch({onSuccess, onError, query, formId}) {
    let redirectPath = '';
    try {
        let formData = new FormData(document.getElementById(formId));
        console.log(Object.fromEntries(formData));
        let res = await fetch(query, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": '*'
            },
            credentials: 'include',
            body: formData,
            cache: 'no-cache'
        });
        if (res.ok) onSuccess(await res.json());
        else if (res.status == 401) redirectPath = `${APP_HOST}/auth/signup`;
        else throw new Error(res.status);
    } catch (e) {
        console.log(e);
        onError(e);
    } finally {
        if (redirectPath != '') redirect(redirectPath)
    }
}

export async function DataFetch({onSuccess, onError, query, formsId}) {
    let redirectPath = '';
    try {
        let resImg = await fetch(query.img, {
            method: "POST",
            credentials: 'include',
            body: new FormData(document.getElementById(formsId.img))
        });
        let resData = await fetch(query.data, {
            method: "POST",
            credentials: 'include',
            body: Object.fromEntries(new FormData(document.getElementById(formsId.data)))
        });
        if (resData.ok && resImg.ok) onSuccess(await res.json());
        else if (resData.status == 401 || resImg.status == 401) redirectPath = `${APP_HOST}/auth/signup`;
        else throw new Error(resData.status);
    } catch (e) {
        console.log(e);
        onError(e);
    } finally {
        if (redirectPath != '') redirect(redirectPath)
    }
}