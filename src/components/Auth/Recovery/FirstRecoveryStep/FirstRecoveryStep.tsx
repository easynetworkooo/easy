import React, { FC, useState } from 'react';
import styles from './FirstRecoveryStep.module.scss'
import { Button, Input, Steps } from "../../../../components-ui";
import { authAPI } from "../../../../services/AuthService";
import { useInput } from "../../../../hooks/useInput";
import { customErrorNotify } from "../../../../helpers/customErrorNotify";

export interface FirstRecoveryStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
    setRecoveryMail: (mail: string) => void
}

export const FirstRecoveryStep: FC<FirstRecoveryStepProps> = ({changeStep, nextStep, setRecoveryMail}) => {

    const isEmail = useInput('', {isEmail: true})

    const [sendMail] = authAPI.useSendMailMutation()

    const sendMailHandler = async () => {
        if (!isEmail.isInputErrorValidation) {
            const status: any = await sendMail({email: isEmail.value})
            try {
                if (status.data.status === 200) {
                    customErrorNotify(status.data.value, 'Success')
                    changeStep(nextStep)
                    setRecoveryMail(isEmail.value)
                }
            } catch (e) {
                customErrorNotify(status.error.data.value, 'Error')
            }
        }
    }

    return (
        <>
            <div className={styles.stepsBlock}>
                <Steps steps={['firstActiveStep', 'secondUnreadyStep', 'thirdUnreadyStep']}/>
            </div>
            <div className={styles.textBlock}>
                <span>Enter your current Email and we will send a recovery code</span>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Email'} type={'text'} value={isEmail.value}
                       onChange={e => isEmail.onChange(e)}
                       onBlur={e => isEmail.onBlur(e)}
                       validations={isEmail.validators}
                       isDirty={isEmail.isDirty}
                       isInputErrorValidation={isEmail.isInputErrorValidation}
                       onKeyPress={e => e.key === 'Enter' && sendMailHandler()}
                       autoFocus={true}
                />
            </div>
            <div className={styles.nextStepBlock}>
                <Button onClick={sendMailHandler}>
                    <span>Next</span>
                </Button>
            </div>
        </>
    );
};
