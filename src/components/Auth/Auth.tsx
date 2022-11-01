import React, { FC, useState } from 'react';
import styles from './Auth.module.scss'
import { AuthLogo } from "./AuthLogo/AuthLogo";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import { Recovery } from "./Recovery/Recovery";
import { useLocation, useNavigate } from "react-router-dom";
import { ILocationFromState } from "../../models/ILocationFromState";
import { PEOPLE_AND_PROJECTS } from "../../constants/nameRoutesConsts";
import { authSlice } from "../../store/reducers/AuthSlice";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/redux";
import { IUserProfile } from "../../models/IUserProfile";


export const Auth: FC = () => {
    const {loginReducer} = authSlice.actions
    const {setUserReducer} = userSlice.actions
    const dispatch = useAppDispatch()

    const [isAuthStatus, setAuthStatus] = useState('Login')


    const changeAuthStatus = (status: string) => {
        setAuthStatus(status)
    }

    const navigate = useNavigate()
    const location = useLocation();
    const fromPathname = (location.state as ILocationFromState)?.from?.pathname || PEOPLE_AND_PROJECTS

    const navigateHandler = async (continueAuth: boolean, userData: IUserProfile) => {
        dispatch(setUserReducer({...userData}))
        dispatch(loginReducer({isAuth: true, continueAuth: continueAuth}))
        navigate(fromPathname, {replace: true})
    }

    const checkStatusAuth = () => {
        if (isAuthStatus === 'Login') {
            return (
                <Login changeAuthStatus={changeAuthStatus} navigateHandler={navigateHandler}/>
            )
        } else if (isAuthStatus === 'Registration') {
            return (
                <Registration changeAuthStatus={changeAuthStatus} navigateHandler={navigateHandler}/>
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