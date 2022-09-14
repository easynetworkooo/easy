import React, { FC, useState } from 'react';
import styles from './AuthContinueFirstStep.module.scss'
import { Button, Input, Select, Steps } from "../../../components-ui";

export interface AuthContinueFirstStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
}

export const AuthContinueFirstStep: FC<AuthContinueFirstStepProps> = ({changeStep, nextStep}) => {
    const [isNickname, setNickname] = useState('')

    return (
        <div className={styles.firstStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['firstActiveStep', 'secondUnreadyStep']}/>
            </div>
            <div className={styles.inputBlock}>
                <Input type={'text'} placeholder={'Nickname'} value={isNickname} onChange={e => setNickname(e.target.value)}/>
            </div>
            <div className={styles.inputBlock}>
                <Select/>
            </div>
            <div className={styles.inputBlock}>
                <Select/>
            </div>
            <div className={styles.buttonBlock}>
                <Button buttonColor={'clearButton'} onClick={() => changeStep(2)}>
                    <span>Next</span>
                </Button>
            </div>
        </div>
    );
};