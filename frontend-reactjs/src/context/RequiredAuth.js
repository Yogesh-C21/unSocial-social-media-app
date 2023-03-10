import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequiredAuth = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return (
        isLoggedIn
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}


export default RequiredAuth;