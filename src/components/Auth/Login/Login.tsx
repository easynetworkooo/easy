import React, { FC } from 'react';
import styles from './Login.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { Button, Input } from "../../../components-ui";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { authAPI } from "../../../services/AuthService";
import { ILoginCredentials } from "../../../models/ILogin";
import { userAPI } from "../../../services/UserService";
import { IUserProfile } from "../../../models/IUserProfile";
import { useInput } from "../../../hooks/useInput";

export interface LoginProps {
    changeAuthStatus: (status: string) => void
    navigateHandler: (continueAuth: boolean, dataProfile: IUserProfile) => void
}


export const Login: FC<LoginProps> = ({changeAuthStatus, navigateHandler}) => {
    const [login] = authAPI.useLoginMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()
    const isEmail = useInput('', {isEmail: true})
    const isPassword = useInput('', {isEmpty: true})

    const loginHandler = async () => {
        if (isEmail.isInputErrorValidation || isPassword.isInputErrorValidation) {
            isEmail.setDirty(true)
            isPassword.setDirty(true)
            return
        }
        const loginResponse: any = await login({email: isEmail.value, password: isPassword.value} as ILoginCredentials)

        try {
            if (loginResponse.data.status === 200) {
                localStorage.setItem('auth', loginResponse.data.auth)
                const dataProfile: any = await fetchUserProfile('')
                await navigateHandler(dataProfile.data.value.interests === null, dataProfile.data.value)
            }
        } catch (e) {
            console.log(loginResponse.error)
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
                <Input placeholder={'Email'} type={'text'} value={isEmail.value}
                       onChange={e => isEmail.onChange(e)}
                       onBlur={e => isEmail.onBlur(e)}
                       validations={isEmail.validators}
                       isDirty={isEmail.isDirty}
                       isInputErrorValidation={isEmail.isInputErrorValidation}
                       onKeyPress={e => e.key === 'Enter' && loginHandler()}
                       autoFocus={true}
                />
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Password'} type={'password'}
                       value={isPassword.value}
                       onChange={e => isPassword.onChange(e)}
                       onBlur={e => isPassword.onBlur(e)}
                       validations={isPassword.validators}
                       isInputErrorValidation={isPassword.isInputErrorValidation}
                       isDirty={isPassword.isDirty}
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
