import React, { FC } from 'react';
import styles from "./ThirdRecoveryStep.module.scss";
import { Button, Input, Steps } from "../../../../components-ui";
import { IUserProfile } from "../../../../models/IUserProfile";
import { userAPI } from "../../../../services/UserService";

export interface ThirdRecoveryStepProps {
    navigateHandler: (continueAuth: boolean, userData: IUserProfile) => void
}

export const ThirdRecoveryStep:FC<ThirdRecoveryStepProps> = ({navigateHandler}) => {
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()

    const saveAndLoginHandler = async () => {
        const dataProfile: any = await fetchUserProfile('')
        navigateHandler(true, dataProfile.data.value)
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
                <Input placeholder={'New password'} type={'password'} autoFocus={true} onKeyPress={e => e.key === 'Enter' && saveAndLoginHandler()}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat new password'} type={'password'} onKeyPress={e => e.key === 'Enter' && saveAndLoginHandler()}/>
            </div>
            <div className={styles.savePassword}>
                <Button onClick={() => saveAndLoginHandler()}>
                    <span>Save and Login</span>
                </Button>
            </div>
        </>
    );
};