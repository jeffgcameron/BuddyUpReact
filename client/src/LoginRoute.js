import { Navigate } from "react-router-dom";

function LoginRoute({children, isLoggedIn}) {
  return !isLoggedIn ? children: <Navigate to='/'/>
}

export default LoginRoute;