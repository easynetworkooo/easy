import React, { FC } from 'react';
import styles from "./ThirdRecoveryStep.module.scss";
import { Button, Input, Steps } from "../../../../components-ui";
import { IUserProfile } from "../../../../models/IUserProfile";
import { useInput } from "../../../../hooks/useInput";
import { customErrorNotify } from "../../../../helpers/customErrorNotify";
import { authAPI } from "../../../../services/AuthService";
import { userAPI } from "../../../../services/UserService";
import { ILoginCredentials } from "../../../../models/ILogin";

export interface ThirdRecoveryStepProps {
    navigateHandler: (continueAuth: boolean, userData: IUserProfile) => void
    isRecoveryMail: string
}

export const ThirdRecoveryStep: FC<ThirdRecoveryStepProps> = ({navigateHandler, isRecoveryMail}) => {
    const isPassword = useInput('', {isEmpty: true, minLength: 6})
    const isRepeatPassword = useInput('', {isEmpty: true, isMatch: isPassword.value})

    const [login] = authAPI.useLoginMutation()
    const [updatePassword] = authAPI.useUpdatePasswordMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()

    const loginAfterUpdatePassword = async () => {
        const loginResponse: any = await login({email: isRecoveryMail, password: isPassword.value} as ILoginCredentials)

        try {
            if (loginResponse.data.status === 200) {
                localStorage.setItem('auth', loginResponse.data.auth)
                const dataProfile: any = await fetchUserProfile('')
                await navigateHandler(dataProfile.data.value.interests === null, dataProfile.data.value)
            }
        } catch (e) {
            customErrorNotify(loginResponse.error.data.value, 'Error')
        }
    }

    const updatePasswordHandler = async () => {
        if (isPassword.value !== isRepeatPassword.value) {
            customErrorNotify('Passwords dont match', 'Error')
            return
        }
        if (!isPassword.isInputErrorValidation && !isRepeatPassword.isInputErrorValidation) {
            const status: any = await updatePassword({email: isRecoveryMail, password: isPassword.value})

            try {
                if (status.data.status === 200) {
                    customErrorNotify(status.data.value, 'Success')
                    await loginAfterUpdatePassword()
                }
            } catch (e) {
                customErrorNotify(status.error.data.value, 'Error')
            }
        }

    }

    return (
        <>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'readyStep', 'thirdActiveStep']}/>
            </div>
            <div className={styles.textBlock}>
                <span>Enter a new password</span>
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
                       onKeyPress={e => e.key === 'Enter' && updatePasswordHandler()}
                       autoFocus={true}
                />
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat password'} type={'password'} value={isRepeatPassword.value}
                       onChange={(e) => isRepeatPassword.onChange(e)}
                       onBlur={e => isRepeatPassword.onBlur(e)}
                       isInputErrorValidation={isRepeatPassword.isInputErrorValidation}
                       isDirty={isRepeatPassword.isDirty}
                       validations={isRepeatPassword.validators}
                       onKeyPress={e => e.key === 'Enter' && updatePasswordHandler()}/>
            </div>
            <div className={styles.savePassword}>
                <Button onClick={() => updatePasswordHandler()}>
                    <span>Save and Login</span>
                </Button>
            </div>
        </>
    );
};
