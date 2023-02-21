import React, { FC, useEffect, useState } from 'react';
import styles from "./SecondRecoveryStep.module.scss";
import { Button, Steps } from "../../../../components-ui";
import ReactCodeInput from "react-code-input";
import { authAPI } from "../../../../services/AuthService";
import { customErrorNotify } from "../../../../helpers/customErrorNotify";

export interface SecondRecoveryStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
    isRecoveryMail: string
}


export const SecondRecoveryStep: FC<SecondRecoveryStepProps> = ({changeStep, nextStep, isRecoveryMail}) => {

    const [isCode, setCode] = useState('')

    const [isChancesEnter, setChancesEnter] = useState(3)

    const [checkCode] = authAPI.useCheckCodeMutation()
    const [sendMail] = authAPI.useSendMailMutation()
    const [cancelCodes] = authAPI.useCancelCodesMutation()

    const checkCodeHandler = async () => {
        if (isChancesEnter > 0) {
            const status: any = await checkCode({code: isCode, email: isRecoveryMail})
            try {
                if (status.data.status === 200) {
                    customErrorNotify(status.data.value.toString(), 'Success')
                    changeStep(nextStep)
                }
            } catch (e) {
                setChancesEnter(prevState => prevState - 1)
                customErrorNotify(status.error.data.value.toString(), 'Error')
            }
        }
    }

    const repeatSendMailHandler = async () => {
        if (isChancesEnter > 0) {
            await cancelCodes({email: isRecoveryMail})
            setChancesEnter(3)
        }
        setChancesEnter(3)
        await sendMail({email: isRecoveryMail})
    }

    useEffect(() => {
        if (isChancesEnter === 0) {
            cancelCodes({email: isRecoveryMail})
        }

        // eslint-disable-next-line
    }, [isChancesEnter])

    useEffect(() => {
        if (isCode.length === 4) {
            checkCodeHandler()
        }

        // eslint-disable-next-line
    }, [isCode])

    return (
        <>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'secondActiveStep', 'thirdUnreadyStep']}/>
            </div>
            <div className={styles.textBlock}>
                <span>Enter the code that was sent to your email</span>
                <span>You have {isChancesEnter} chances</span>
            </div>
            <div className={styles.codeBlock}>
                <ReactCodeInput
                    type='number'
                    fields={4}
                    inputMode={'verbatim'}
                    name={'stas'}
                    autoFocus={true}
                    className={styles.code}
                    value={isCode}
                    disabled={isChancesEnter === 0 && true}
                    onChange={e => setCode(e)}
                />
            </div>
            <div className={styles.retryReceiveCode}>
                <span>Didn't receive a code? <span className={styles.sendAgain} onClick={repeatSendMailHandler}>Send again</span></span>
            </div>
            <div className={styles.nextStepBlock}>
                <Button onClick={checkCodeHandler}>
                    <span>Next</span>
                </Button>
            </div>
        </>
    );
};
