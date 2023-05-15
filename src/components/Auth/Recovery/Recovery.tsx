import React, { FC, useState } from 'react';
import styles from './Recovery.module.scss'
import { FirstRecoveryStep } from "./FirstRecoveryStep/FirstRecoveryStep";
import { SecondRecoveryStep } from "./SecondRecoveryStep/SecondRecoveryStep";
import { ThirdRecoveryStep } from "./ThirdRecoveryStep/ThirdRecoveryStep";
import { IUserProfile } from "../../../models/IUserProfile";

export interface RecoveryProps {
    changeAuthStatus: (status: string) => void
    navigateHandler: (continueAuth: boolean, userData: IUserProfile) => void
}

export const Recovery: FC<RecoveryProps> = ({changeAuthStatus, navigateHandler}) => {

    const [isStep, setStep] = useState(1)
    const [isRecoveryMail, setRecoveryMail] = useState('')

    const checkStep = (stepNumber: number) => {
        if (stepNumber === 1) {
            return (
                <FirstRecoveryStep changeStep={changeStep} nextStep={2} setRecoveryMail={setRecoveryMail}/>
            )
        } else if (stepNumber === 2) {
            return (
                <SecondRecoveryStep changeStep={changeStep} nextStep={3} isRecoveryMail={isRecoveryMail}/>
            )
        } else if (stepNumber === 3) {
            return (
                <ThirdRecoveryStep navigateHandler={navigateHandler} isRecoveryMail={isRecoveryMail}/>
            )
        }
    }

    const changeStep = (stepNumber: number) => {
        setStep(stepNumber)
    }

    return (
        <div className={styles.recoveryBlock}>
            <div className={styles.recoveryElements}>
                <div className={styles.recoveryHeader}>
                    <h2>Recovery password</h2>
                </div>
                <div className={styles.stepsContentBlock}>
                    {checkStep(isStep)}
                </div>
                <div className={styles.withoutAccountBlock}>
                <span>
                    No have an account?
                    <span className={styles.signUp} onClick={() => changeAuthStatus('Registration')}>Sign Up</span>
                </span>
                </div>
            </div>
        </div>
    );
};
