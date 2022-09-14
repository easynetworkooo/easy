import React, { useState } from 'react';
import styles from './AuthContinue.module.scss'
import { AuthContinueFirstStep } from "./AuthContinueFirstStep/AuthContinueFirstStep";
import { AuthContinueSecondStep } from "./AuthContinueSecondStep/AuthContinueSecondStep";

export const AuthContinue = () => {
    const [isStep, setStep] = useState(1)

    const checkStep = (stepNumber: number) => {
        if (stepNumber === 1) {
            return (
                <AuthContinueFirstStep changeStep={changeStep} nextStep={2}/>
            )
        } else if (stepNumber === 2) {
            return (
                <AuthContinueSecondStep/>
            )
        }
    }

    const changeStep = (stepNumber: number) => {
        setStep(stepNumber)
    }

    return (
        <div className={styles.authContinueBlock}>
            <div className={styles.headerAuthContinueBlock}>
                <h1>Tell us about yourself</h1>
            </div>
            <div className={styles.contentStepsBlock}>
                {checkStep(isStep)}
            </div>
        </div>
    );

};