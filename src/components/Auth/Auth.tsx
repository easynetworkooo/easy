import React, { FC, useState } from 'react';
import styles from './Auth.module.scss'
import { AuthLogo } from "./AuthLogo/AuthLogo";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import { Recovery } from "./Recovery/Recovery";

export const Auth: FC = () => {

    const [isAuthStatus, setAuthStatus] = useState('Login')

    const changeAuthStatus = (status: string) => {
        setAuthStatus(status)
    }

    const checkStatusAuth = () => {
        if (isAuthStatus === 'Login') {
            return (
                <Login changeAuthStatus={changeAuthStatus}/>
            )
        } else if (isAuthStatus === 'Registration') {
            return (
                <Registration changeAuthStatus={changeAuthStatus}/>
            )
        } else if (isAuthStatus === 'Recovery') {
            return (
                <Recovery changeAuthStatus={changeAuthStatus}/>
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