import React from 'react';
import styles from "./ThirdRecoveryStep.module.scss";
import { Button, Input, Steps } from "../../../../components-ui";
import { userSlice } from "../../../../store/reducers/UserSlice";
import { useAppDispatch } from "../../../../hooks/redux";

export const ThirdRecoveryStep = () => {

    const {login} = userSlice.actions
    const dispatch = useAppDispatch()

    const saveAndLoginHandler = () => {
        dispatch(login({name: 'Stas', continueAuth: true}))
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
                <Input placeholder={'New password'} type={'password'}/>
            </div>
            <div className={styles.inputBlock}>
                <Input placeholder={'Repeat new password'} type={'password'}/>
            </div>
            <div className={styles.savePassword}>
                <Button onClick={() => saveAndLoginHandler()}>
                    <span>Save and Login</span>
                </Button>
            </div>
        </>
    );
};