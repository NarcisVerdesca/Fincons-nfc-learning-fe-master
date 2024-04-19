import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoutes = () =>{
    const auth = Cookies.get("jwt-token")
    return auth ? <Outlet/> : <Navigate to={"/authentication"}/>
}

export default ProtectedRoutes;