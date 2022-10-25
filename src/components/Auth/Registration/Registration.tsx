import React, { FC, useState } from 'react';
import styles from './Registration.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { Button, Input } from "../../../components-ui";
import { AUTH_CONTINUE } from "../../../constants/nameRoutesConsts";
import { authSlice } from "../../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../../services/AuthService";
import { IRegistrationCredentials } from "../../../models/IRegistration";


export interface RegistrationProps {
    changeAuthStatus: (status: string) => void
}

export const Registration: FC<RegistrationProps> = ({changeAuthStatus}) => {
    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const [registration] = authAPI.useRegistrationMutation()

    const [isEmail, setEmail] = useState('')
    const [isPassword, setPassword] = useState('')
    const [isRepeatPassword, setRepeatPassword] = useState('')

    const navigate = useNavigate()

    const registrationHandler = async () => {
        if (isEmail && isPassword && isRepeatPassword) {
            if (isPassword === isRepeatPassword) {
                const registrationResponse: any = await registration({username: isEmail, password: isPassword} as IRegistrationCredentials)
                try {
                    if (registrationResponse.data.status === 200) {
                        dispatch(loginReducer({isAuth: true, continueAuth: true}))
                        navigate(AUTH_CONTINUE)
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