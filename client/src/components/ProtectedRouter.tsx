import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = ({isAuth}: any) => {
    console.log(isAuth)
  if (!isAuth) return <Navigate to='/' />
  return <Outlet /> 
}

export default ProtectedRouter
