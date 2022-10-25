import React from 'react';
import styles from "./ThirdRecoveryStep.module.scss";
import { Button, Input, Steps } from "../../../../components-ui";
import { authSlice } from "../../../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { AUTH_CONTINUE } from "../../../../constants/nameRoutesConsts";

export const ThirdRecoveryStep = () => {

    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const saveAndLoginHandler = () => {
        dispatch(loginReducer({isAuth: true, continueAuth: true}))
        navigate(AUTH_CONTINUE)
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