import Fon from "../components/fon"

export default function Layout({children}) {
    return (
        <div className="w-full bg-base-blue">
            <Fon />
            {children}
        </div>
    )
}