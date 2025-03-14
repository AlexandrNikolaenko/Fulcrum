'use client'

import { useGetSecretData } from "@/app/components/hooks"
import { API_HOST } from "@/app/components/host";
import Image from "next/image";

export default function Page() {
    let {data, setData} = useGetSecretData(`${API_HOST}/register/user`);
    function editAvatar() {
        document.getElementById("avatar").click();
    }

    async function setAvatar(e) {
        e.preventDefault();
        let names = [];
        Array.from(e.target.files).forEach(file => names.push(file.name));
        names = names.join(', ');
        // setData({...data, data: {...data.data, avatar:}})
    }

    return (
        <>
        {
            data.isSuccess &&
            <>
                <div className="p-[15px] rounded-large relative">
                    <Image alt="avatar" width={330} height={330} src={`${data.avatar ? data.avatar : '/DefaultUser.svg'}`} className="rounded-base"/>
                    <form className="absolute bottom-[25px] right-[25px]">
                        <button onClick={editProfile} className="bg-white rounded-full aspect-square overflow-hidden"><Image alt="edit" width={40} height={40} src={'/Edit.svg'}/></button>
                        <input type="file" accept={'.jpg'} name={'file'} id={'file'} className="hidden" multiple={false} onChange={setAvatar} />
                    </form>
                </div>
                <form className="flex flex-col gap-2.5">
                    <div className="flex gap-2.5">
                        
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </form>
            </>
        }
        </>
    )
}