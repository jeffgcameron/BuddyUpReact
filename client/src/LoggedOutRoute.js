import { Navigate } from "react-router-dom";

function LoggedOutRoute({children, isLoggedIn}) {
  return isLoggedIn ? children: <Navigate to='/login'/>
}

export default LoggedOutRoute;