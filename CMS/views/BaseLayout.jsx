import { Outlet } from "react-router-dom"
import NavBar from "../src/components/NavBar"
export default function BaseLayout () {
    return (
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}