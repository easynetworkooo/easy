import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";

import styles from './ProtectGooglePage.module.scss'
import AuthGoogle from '../../assets/Auth/btn_google_light_normal_ios.svg'

export const ProtectGooglePage = () => {
    const {search} = useLocation()
    const [token, setToken] = useState('')

    const checkAuthorizationCallback = useCheckAuthorization()
    
    useEffect(() => {
        setToken(search.split('token=')[1])
    }, [search])


    useEffect(() => {
        if (token !== '') {
            localStorage.setItem('auth', token)
            checkAuthorizationCallback().then(() => console.log('Google connect'))
        }
    }, [checkAuthorizationCallback, token])


    return (
        <div className={styles.googleForwarding}>
            <img src={AuthGoogle} alt="google auth"/>
            <span>Google authorization forwarding</span>
        </div>
    );
};
