import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = ({isAuth}: any) => {
  if (!isAuth) return <Navigate to='/' />
  return <Outlet /> 
}

export default ProtectedRouter
