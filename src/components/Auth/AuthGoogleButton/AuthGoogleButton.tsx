import React from 'react';
import styles from './AuthGoogleButton.module.scss'
import authGoogle from '../../../assets/Auth/btn_google_light_normal_ios.svg'
import { serverURL } from "../../../constants/serverURL";

export const AuthGoogleButton = () => {

    const loginWithGoogleHandler = () => {
        window.open(`${serverURL}google`, '_self')
    }


    return (
        <button className={styles.authGoogleButton} onClick={loginWithGoogleHandler}>
            <img src={authGoogle} alt="gmail"/>
            <span>Sign in with Google</span>
        </button>
    );
};
