export default function AdsList({ads}) {

    if (ads.length == 0 || !ads) {
        return <></>
    }

    return (
        <ul className="flex flex-col gap-2.5 w-full">
            {ads.map(ad => <Ad key={ad.id} ad={ad}/>)}
        </ul>
    )
}

function Ad({ad}) {
    return (
        <li className="flex gap-5">

        </li>
    )
}