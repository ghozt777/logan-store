import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Route, Navigate } from 'react-router-dom'

type PrivateRouterProps = {
    to: string;
    element: JSX.Element;
}


export const PrivateRoute: React.FC<PrivateRouterProps> = (props) => {
    const authState = useSelector((state: RootState) => state.auth)
    console.log("Auth State", authState)
    return (
        <>
            {
                authState.isLoggedIn ? props.element : <Navigate to='/login' />
            }
        </>
    )

}