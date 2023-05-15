import React, { FC } from 'react';
import styles from './AuthTabs.module.scss'

export interface AuthTabsProps {
    authStatus: string,
    changeAuthStatus: (status: string) => void
}

export const AuthTabs: FC<AuthTabsProps> = ({authStatus, changeAuthStatus}) => {

    return (
        <div className={styles.tabs}>
            <button className={authStatus === 'Login' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                    onClick={() => changeAuthStatus('Login')}><span>Login</span></button>
            <button className={authStatus === 'Registration' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                    onClick={() => changeAuthStatus('Registration')}><span>Sign Up</span></button>
        </div>
    );
};
