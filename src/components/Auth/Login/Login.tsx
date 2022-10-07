import React, { FC, useState } from 'react';
import styles from './Login.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { Button, Input } from "../../../components-ui";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { useAppDispatch } from "../../../hooks/redux";
import { userSlice } from "../../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { AUTH_CONTINUE } from "../../../constants/nameRoutesConsts";

export interface LoginProps {
    changeAuthStatus: (status: string) => void
}


export const Login: FC<LoginProps> = ({changeAuthStatus}) => {
    const {login} = userSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isEmail, setEmail] = useState('')
    const [isPassword, setPassword] = useState('')

    const loginHandler = () => {
        if (isEmail === 'test' && isPassword === 'test') {
            dispatch(login({name: 'Stas', continueAuth: true}))
            navigate(AUTH_CONTINUE)
        }
    }

    return (
        <div className={styles.loginBlock}>
            <div className={styles.loginHeader}>
                <h2>Login</h2>
            </div>
            <div className={styles.authWithGoogle}>
                <AuthGoogleButton/>
            </div>
            <div className={styles.linesWithText}>
                <LinesWithCenterText/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Email'} type={'text'} value={isEmail}
                       onChange={e => setEmail(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && loginHandler()}
                       autoFocus={true}
                />
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Password'} type={'password'} value={isPassword}
                       onChange={e => setPassword(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && loginHandler()}
                />
            </div>
            <div className={styles.loginButtonBlock}>
                <Button onClick={() => loginHandler()}>
                    <span>Login</span>
                </Button>
            </div>
            <div className={styles.forgotPasswordBlock}>
                <span onClick={() => changeAuthStatus('Recovery')}>Forgot your password?</span>
            </div>
            <div className={styles.withoutAccountBlock}>
                <span>
                    No have an account?
                    <span className={styles.signUp} onClick={() => changeAuthStatus('Registration')}>Sign Up</span>
                </span>
            </div>
        </div>
    );
};