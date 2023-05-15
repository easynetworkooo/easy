import React, { FC, useState } from 'react';
import styles from './Auth.module.scss'
import { AuthLogo } from "./AuthLogo/AuthLogo";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import { Recovery } from "./Recovery/Recovery";
import { useLocation, useNavigate } from "react-router-dom";
import { ILocationFromState } from "../../models/ILocationFromState";
import { CONTENT } from "../../constants/nameRoutesConsts";
import { authSlice } from "../../store/reducers/AuthSlice";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/redux";
import { IUserProfile } from "../../models/IUserProfile";
import { notificationSlice } from "../../store/reducers/NotificationSlice";
import { userAPI } from "../../services/UserService";


export const Auth: FC = () => {
    const {loginReducer} = authSlice.actions
    const {setUserReducer} = userSlice.actions
    const {setNotificationsReducer} = notificationSlice.actions
    const dispatch = useAppDispatch()

    const [fetchUserNotifications] = userAPI.useFetchUserNotificationMutation()

    const [isAuthStatus, setAuthStatus] = useState('Login')


    const changeAuthStatus = (status: string) => {
        setAuthStatus(status)
    }

    const navigate = useNavigate()
    const location = useLocation();
    const fromPathname = (location.state as ILocationFromState)?.from?.pathname || CONTENT

    const navigateHandler = async (continueAuth: boolean, userData: IUserProfile) => {
        const dataNotifications: any = await fetchUserNotifications('')
        dispatch(setNotificationsReducer({
            main: dataNotifications.data.value.main,
            buttons: dataNotifications.data.value.buttons,
            bell: dataNotifications.data.value.bell
        }))
        dispatch(setUserReducer({...userData}))
        dispatch(loginReducer({isAuth: true, continueAuth: continueAuth}))
        navigate(fromPathname, {replace: true})
    }

    const checkStatusAuth = () => {
        if (isAuthStatus === 'Login') {
            return (
                <Login changeAuthStatus={changeAuthStatus} navigateHandler={navigateHandler} authStatus={isAuthStatus}/>
            )
        } else if (isAuthStatus === 'Registration') {
            return (
                <Registration changeAuthStatus={changeAuthStatus} navigateHandler={navigateHandler} authStatus={isAuthStatus}/>
            )
        } else if (isAuthStatus === 'Recovery') {
            return (
                <Recovery changeAuthStatus={changeAuthStatus} navigateHandler={navigateHandler}/>
            )
        }
    }

    return (
        <div className={styles.authBlock}>
            {checkStatusAuth()}
            <AuthLogo/>
        </div>
    );
};
