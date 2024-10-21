import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface IChildrenProps {
    children?: ReactNode
}

export default function RequireAuth({ children }: IChildrenProps) {
    const location = useLocation()
    const { userId } = useSelector((state: RootState) => state.rootReducer.userDataSlice)

    return (
        <>
            { userId === 0 ? <Navigate to='/' state={{ from: location }} /> : children }
        </>
    )
}