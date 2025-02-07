import { RouteNames } from "@/constants/route";
import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch, RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestMiddleware() {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAuthProfile())
  }, [])
  if (isLoading) return <h1>Loading...</h1>
  if (isAuth) return <Navigate to={RouteNames.HOME} />
  return (
    <Outlet />
  )
}
