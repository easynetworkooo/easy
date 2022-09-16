import React from 'react';
import styles from './AuthGoogleButton.module.scss'
import gmailImage from '../../../assets/Auth/authGmail.svg'

export const AuthGoogleButton = () => {
    return (
        <button className={styles.authGoogleButton}>
            <img src={gmailImage} alt="gmail"/>
            <span>With google</span>
        </button>
    );
};