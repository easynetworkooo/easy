import React, { FC } from 'react';
import styles from './Registration.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { Button, Input } from "../../../components-ui";


export interface RegistrationProps {
    changeAuthStatus: (status: string) => void
}

export const Registration: FC<RegistrationProps> = ({changeAuthStatus}) => {
    return (
        <div className={styles.registrationBlock}>
            <div className={styles.registrationHeader}>
                <h2>Join our community</h2>
            </div>
            <div className={styles.authWithGoogle}>
                <AuthGoogleButton/>
            </div>
            <div className={styles.linesWithText}>
                <LinesWithCenterText/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Email'} type={'text'}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Password'} type={'password'}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat password'} type={'password'}/>
            </div>
            <div className={styles.registrationButtonBlock}>
                <Button>
                    <span>Sign Up</span>
                </Button>
            </div>
            <div className={styles.loginBlock}>
                <span>
                    Already have an account?<span className={styles.login} onClick={() => changeAuthStatus('Login')}>Login</span>
                </span>
            </div>
        </div>
    );
};