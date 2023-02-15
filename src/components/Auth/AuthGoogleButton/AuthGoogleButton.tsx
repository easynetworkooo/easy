import React from 'react';
import styles from './AuthGoogleButton.module.scss'
import authGoogle from '../../../assets/Auth/authGoogle.png'
import { serverURL } from "../../../constants/serverURL";

export const AuthGoogleButton = () => {

    const loginWithGoogleHandler = () => {
        window.open(`${serverURL}google`, '_self')
    }


    return (
        <button className={styles.authGoogleButton} onClick={loginWithGoogleHandler}>
            <img src={authGoogle} alt="gmail"/>
            <span>With Google</span>
        </button>
    );
};
