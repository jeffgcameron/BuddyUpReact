import { Navigate } from "react-router-dom";

function LoginRoute({children, isLoggedIn}) {
  return !isLoggedIn ? children: <Navigate to='/home'/>
}

export default LoginRoute;