import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { ReactNode, useEffect, useState } from "react";
import checkToken from "../middleware/checkToken";

interface IChildrenProps {
    children?: ReactNode
}

export default function RequireAuth({ children }: IChildrenProps) {
    const location = useLocation()
    const { userAuthorize } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
    const [ authStatus, setAuthStatus ] = useState<null | boolean>(null)

    useEffect(() => {
        async function checkAuth(){
            const resultCheckingToken = await checkToken()

            resultCheckingToken!.status === 200 ? setAuthStatus(true) : setAuthStatus(false)
        }

        checkAuth()
    }, [userAuthorize])

    return (
        <>
            { authStatus === null
                ? children
                : authStatus === false 
                ? <Navigate to='/' state={{ from: location }} />
                : children
            }
        </>
    )
}