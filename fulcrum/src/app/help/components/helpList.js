export default function HelpList({helps}) {
    if (!helps || helps.length == 0){
        return <></>
    }

    return (
        <div className="w-full grid-cols-2">
            <ul>
                {helps[0].map(help => <Help key={help.id} help={help}/>)}
            </ul>
            <ul>
                {helps[1].map(help => <Help key={help.id} help={help}/>)}
            </ul>
        </div>
    )
}

function Help(help) {
    return(
        <li>
        </li>
    )
}