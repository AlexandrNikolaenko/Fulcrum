import { redirect } from "next/navigation"
import { APP_HOST } from "../components/host"

export default function Auth() {
    redirect(`${APP_HOST}/auth/signup`);
}