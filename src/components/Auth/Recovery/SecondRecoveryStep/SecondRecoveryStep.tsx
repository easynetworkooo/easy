import React, { FC, useState } from 'react';
import styles from "./SecondRecoveryStep.module.scss";
import { Button, Steps } from "../../../../components-ui";
import ReactCodeInput from "react-code-input";

export interface SecondRecoveryStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
}


export const SecondRecoveryStep: FC<SecondRecoveryStepProps> = ({changeStep, nextStep}) => {

    const [isCode, setCode] = useState('')

    const nextStepHandler = () => {
        changeStep(nextStep)
    }

    return (
        <>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'secondActiveStep', 'thirdUnreadyStep']}/>
            </div>
            <div className={styles.textBlock}>
                <span>Enter the code that was sent to your email</span>
            </div>
            <div className={styles.codeBlock} onKeyPress={e => e.key === 'Enter' && nextStepHandler()}>
                <ReactCodeInput
                    type='number'
                    fields={4}
                    inputMode={'verbatim'}
                    name={'stas'}
                    autoFocus={true}
                    className={styles.code}
                    value={isCode}
                    onChange={e => setCode(e)}
                />
            </div>
            <div className={styles.retryReceiveCode}>
                <span>Didn't receive a code? <span className={styles.sendAgain}>Send again</span> in 0:59</span>
            </div>
            <div className={styles.nextStepBlock}>
                <Button onClick={() => nextStepHandler()}>
                    <span>Next</span>
                </Button>
            </div>
        </>
    );
};
