import React, { FC, useState } from 'react';
import styles from './FirstRecoveryStep.module.scss'
import { Button, Input, Steps } from "../../../../components-ui";

export interface FirstRecoveryStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
}

export const FirstRecoveryStep: FC<FirstRecoveryStepProps> = ({changeStep, nextStep}) => {

    const [isEmail, setEmail] = useState('')

    return (
        <>
            <div className={styles.stepsBlock}>
                <Steps steps={['firstActiveStep', 'secondUnreadyStep', 'thirdUnreadyStep']}/>
            </div>
            <div className={styles.textBlock}>
                <span>Enter your current Email and we will send a recovery code</span>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Email'} type={'text'} value={isEmail}
                       onChange={(e) => setEmail(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && changeStep(nextStep)}
                       autoFocus={true}
                />
            </div>
            <div className={styles.nextStepBlock}>
                <Button onClick={() => changeStep(nextStep)}>
                    <span>Next</span>
                </Button>
            </div>
        </>
    );
};