import React, { FC, useState } from 'react';
import styles from './Registration.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { Button, Input } from "../../../components-ui";
import { authAPI } from "../../../services/AuthService";
import { IRegistrationCredentials } from "../../../models/IRegistration";
import { IUserProfile } from "../../../models/IUserProfile";
import { userAPI } from "../../../services/UserService";


export interface RegistrationProps {
    changeAuthStatus: (status: string) => void
    navigateHandler: (continueAuth: boolean, dataProfile: IUserProfile) => void
}

export const Registration: FC<RegistrationProps> = ({changeAuthStatus, navigateHandler}) => {
    const [registration] = authAPI.useRegistrationMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()

    const [isEmail, setEmail] = useState('')
    const [isPassword, setPassword] = useState('')
    const [isRepeatPassword, setRepeatPassword] = useState('')


    const registrationHandler = async () => {
        if (isEmail && isPassword && isRepeatPassword) {
            if (isPassword === isRepeatPassword) {
                const registrationResponse: any = await registration({email: isEmail, password: isPassword} as IRegistrationCredentials)
                try {
                    if (registrationResponse.data.status === 200) {
                        localStorage.setItem('auth', registrationResponse.data.auth)
                        const dataProfile: any = await fetchUserProfile('')
                        navigateHandler(true, dataProfile.data.value)
                    }
                } catch (e) {
                    console.log(registrationResponse.error)
                }
            } else {
                console.log('Password dont match')
            }
        }
    }

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
                <Input placeholder={'Email'} type={'text'} value={isEmail} onChange={(e) => setEmail(e.target.value)}
                       autoFocus={true} onKeyPress={e => e.key === 'Enter' && registrationHandler()}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Password'} type={'password'} value={isPassword}
                       onChange={(e) => setPassword(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && registrationHandler()}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat password'} type={'password'} value={isRepeatPassword}
                       onChange={(e) => setRepeatPassword(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && registrationHandler()}/>
            </div>
            <div className={styles.registrationButtonBlock}>
                <Button onClick={() => registrationHandler()}>
                    <span>Sign Up</span>
                </Button>
            </div>
            <div className={styles.loginBlock}>
                <span>
                    Already have an account?<span className={styles.login}
                                                  onClick={() => changeAuthStatus('Login')}>Login</span>
                </span>
            </div>
        </div>
    );
};