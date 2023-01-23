import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AppContainer } from "../../components-ui";
import { AppRouter } from "../AppRouter/AppRouter";
import { authAPI } from "../../services/AuthService";
import { userAPI } from "../../services/UserService";
import { authSlice } from "../../store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { notificationSlice } from "../../store/reducers/NotificationSlice";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { socketSlice } from "../../store/reducers/SocketSlice";
import { io } from "socket.io-client";
import { serverURL } from "../../constants/serverURL";

export const App: FC = () => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const {setSocketReducer} = socketSlice.actions
    const {loginReducer} = authSlice.actions
    const {setUserReducer} = userSlice.actions
    const {setNotificationsReducer} = notificationSlice.actions
    const dispatch = useAppDispatch()

    const [checkAuthorization] = authAPI.useCheckAuthorizationMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()
    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()

    const [isLoadingAuth, setLoadingAuth] = useState(true)

    const socket = useRef<any>()

    const checkAuthorizationCallback = useCallback(
        async () => {
            if (localStorage.getItem('auth') !== null) {
                const isAuthUser: any = await checkAuthorization('')
                try {
                    if (isAuthUser?.data?.value) {
                        const dataUser: any = await fetchUserProfile('')
                        const dataNotifications: any = await fetchUserNotification('')
                        const isContinueAuth = dataUser.data.value.interests === null
                        dispatch(loginReducer({isAuth: true, continueAuth: isContinueAuth}))
                        dispatch(setUserReducer({...dataUser.data.value}))
                        dispatch(setNotificationsReducer({
                            main: dataNotifications.data.value.main,
                            buttons: dataNotifications.data.value.buttons,
                            bell: dataNotifications.data.value.bell
                        }))
                    } else {
                        localStorage.removeItem('auth')
                        customErrorNotify(isAuthUser.error.data.value, 'Error')
                    }
                } catch (e:any) {
                    customErrorNotify(e, 'Error')
                }
            }
        },
        [checkAuthorization, dispatch, fetchUserNotification, fetchUserProfile, loginReducer, setNotificationsReducer, setUserReducer]
    )
    
    
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

    useEffect(() => {
        checkAuthorizationCallback().then(() => setLoadingAuth(false))
    }, [checkAuthorizationCallback])

    if (isLoadingAuth) return <></>

    return (
        <AppContainer>
            <AppRouter/>
        </AppContainer>
    );
};
