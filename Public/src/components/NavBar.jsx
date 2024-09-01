import { useNavigate } from "react-router-dom"

export default function NavBar () {
    const navigate = useNavigate()
    return (
        <>
        <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>DaSeas</a>
        </div>
        </div>
        </>
    )
}