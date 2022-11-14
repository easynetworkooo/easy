import React, { FC } from 'react';
import styles from './Registration.module.scss'
import { AuthGoogleButton } from "../AuthGoogleButton/AuthGoogleButton";
import { LinesWithCenterText } from "../LinesWithCenterText/LinesWithCenterText";
import { Button, Input } from "../../../components-ui";
import { authAPI } from "../../../services/AuthService";
import { IUserProfile } from "../../../models/IUserProfile";
import { userAPI } from "../../../services/UserService";
import { useInput } from "../../../hooks/useInput";


export interface RegistrationProps {
    changeAuthStatus: (status: string) => void
    navigateHandler: (continueAuth: boolean, dataProfile: IUserProfile) => void
}

export const Registration: FC<RegistrationProps> = ({changeAuthStatus, navigateHandler}) => {
    const [registration] = authAPI.useRegistrationMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()

    const isEmail = useInput('', {isEmail: true})
    const isPassword = useInput('', {isEmpty: true, minLength: 6})
    const isRepeatPassword = useInput('', {isEmpty: true, isMatch: isPassword.value})

    const registrationHandler = async () => {
        if (isEmail.isInputErrorValidation || isPassword.isInputErrorValidation || isRepeatPassword.isInputErrorValidation) {
            isEmail.setDirty(true)
            isPassword.setDirty(true)
            isRepeatPassword.setDirty(true)
            return
        }
        const registrationResponse: any = await registration({email: isEmail.value, password: isPassword.value})
        try {
            if (registrationResponse.data.status === 200) {
                localStorage.setItem('auth', registrationResponse.data.auth)
                const dataProfile: any = await fetchUserProfile('')
                navigateHandler(true, dataProfile.data.value)
            }
        } catch (e) {
            console.log(registrationResponse.error)
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
                <Input placeholder={'Email'}
                       type={'text'}
                       value={isEmail.value}
                       validations={isEmail.validators}
                       isInputErrorValidation={isEmail.isInputErrorValidation}
                       isDirty={isEmail.isDirty}
                       onChange={(e) => isEmail.onChange(e)}
                       onBlur={(e) => isEmail.onBlur(e)}
                       onKeyPress={e => e.key === 'Enter' && registrationHandler()}
                       autoFocus={true}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Password'}
                       type={'password'}
                       value={isPassword.value}
                       validations={isPassword.validators}
                       isInputErrorValidation={isPassword.isInputErrorValidation}
                       isDirty={isPassword.isDirty}
                       onChange={(e) => isPassword.onChange(e)}
                       onBlur={(e) => isPassword.onBlur(e)}
                       onKeyPress={e => e.key === 'Enter' && registrationHandler()}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat password'} type={'password'} value={isRepeatPassword.value}
                       onChange={(e) => isRepeatPassword.onChange(e)}
                       onBlur={e => isRepeatPassword.onBlur(e)}
                       isInputErrorValidation={isRepeatPassword.isInputErrorValidation}
                       isDirty={isRepeatPassword.isDirty}
                       validations={isRepeatPassword.validators}
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