'use client'

import { useEffect, useState } from "react"
import { API_HOST } from "./host";
import { redirect } from "next/navigation";

export function useGetData(query) {
    let [data, setData] = useState({data: null, isSuccess: false, isLoad: false});

    useEffect(() => {
        async function getData() {
            if (!data.isLoad) {
                try {
                    let res = await fetch(query, {method: 'GET'});
                    if (res.ok) setData({data: await res.json(), isLoad: true, isSuccess: true});
                    else throw new Error();
                } catch(e) {
                    console.log(e);
                    setData({...data, isLoad: true});
                }
            }            
        }
        getData();
    })

    return {data, setData}
}

export function useGetSecretData(query) {
    let [data, setData] = useState({data: null, isSuccess: false, isLoad: false});

    useEffect(() => {
        async function getData() {
            console.log('here');
            if (!data.isLoad) {
                
                let redirectPath = ''
                try {
                    let res = await fetch(query, {
                        method: 'GET',
                        credentials: 'include',
                        cache: 'no-cache'
                    });
                    if (res.ok) setData({data: await res.json(), isLoad: true, isSuccess: true});
                    else if (res.status == 401) redirectPath = `${API_HOST}/auth/signup`;
                    else throw new Error();
                } catch(e) {
                    console.log(e);
                    setData({...data, isLoad: true});
                } finally {
                    if (redirectPath != '') redirect(redirectPath);
                }
            }            
        }
        getData();
    })

    return {data, setData}
}