export default function AdsList({ads}) {

    if (ads.length == 0 && ads) {
        return <></>
    }

    return (
        <ul>
            {ads.map()}
        </ul>
    )
}

function Ad() {
    return (
        <li className="flex gap-5">

        </li>
    )
}