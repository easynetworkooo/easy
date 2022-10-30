import React, { FC } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { AUTH, AUTH_CONTINUE } from "../../constants/nameRoutesConsts";
import { useAppSelector } from "../../hooks/redux";

export interface AppRequireAuthProps {
    children: React.ReactElement
}

export const AppRequireAuth: FC<AppRequireAuthProps> = ({children}) => {

    const location = useLocation()

    const {isAuth} = useAppSelector(state => state.authReducer)
    const {continueAuth} = useAppSelector(state => state.authReducer)

    if (!isAuth) {
        return <Navigate to={AUTH} state={{from: location}}/>
    }

    if (continueAuth) {
        return <Navigate to={AUTH_CONTINUE} state={{from: location}}/>
    }

    return children
};