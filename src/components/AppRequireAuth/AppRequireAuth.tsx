import React, { FC, useEffect, useRef } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { AUTH, AUTH_CONTINUE } from "../../constants/nameRoutesConsts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { socketSlice } from "../../store/reducers/SocketSlice";
import { io } from "socket.io-client";
import { serverURL } from "../../constants/serverURL";

export interface AppRequireAuthProps {
    children: React.ReactElement
}

export const AppRequireAuth: FC<AppRequireAuthProps> = ({children}) => {

    const location = useLocation()

    const {isAuth} = useAppSelector(state => state.authReducer)
    const {continueAuth} = useAppSelector(state => state.authReducer)

    const dispatch = useAppDispatch()
    const {setSocketReducer} = socketSlice.actions
    const socket = useRef<any>()

    useEffect(() => {
        if (isAuth) {
            socket.current = io(serverURL, {
                extraHeaders: {
                    "Authorization": `${localStorage.getItem('auth')}`
                }
            })
        }

    }, [isAuth])

    useEffect(() => {
        if (socket.current !== undefined && isAuth) {
            dispatch(setSocketReducer({socket: socket.current}))
        }
    }, [dispatch, setSocketReducer, isAuth])

    if (!isAuth) {
        return <Navigate to={AUTH} state={{from: location}}/>
    }

    if (continueAuth) {
        return <Navigate to={AUTH_CONTINUE} state={{from: location}}/>
    }

    return children
};
