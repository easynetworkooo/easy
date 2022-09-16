import React from 'react';
import styles from './AuthLogo.module.scss'
import authLogo from '../../../assets/Auth/auth-logo.png'
import authLogoName from '../../../assets/Auth/authLogoName.svg'

export const AuthLogo = () => {
    return (
        <div className={styles.authLogoBlock}>
            <div className={styles.authLogoName}>
                <img src={authLogoName} alt="auth logo name"/>
            </div>
            <div className={styles.authLogoDescription}>
                <span>Social network for cryptocurrency investors</span>
            </div>
            <div className={styles.authLogoImage}>
                <img src={authLogo} alt="auth logo"/>
            </div>
        </div>
    );
};