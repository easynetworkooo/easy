import React from 'react';
import styles from './AuthGoogleButton.module.scss'
import authGoogle from '../../../assets/Auth/authGoogle.png'

export const AuthGoogleButton = () => {
    return (
        <button className={styles.authGoogleButton}>
            <img src={authGoogle} alt="gmail"/>
            <span>With Google</span>
        </button>
    );
};