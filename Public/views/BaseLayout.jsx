import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../src/components/NavBar"

export default function BaseLayout (){
    const navigate = useNavigate()
    return (
       <>
       <NavBar/>
       <Outlet/>
       </>
    )
}