import React, { FC, useState } from 'react';
import styles from './AuthContinueSecondStep.module.scss'
import { Button, Steps } from "../../../components-ui";
import { InterestItem } from "./InterestItem/IntrestItem";
import { authSlice } from "../../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { CONTENT } from "../../../constants/nameRoutesConsts";
import { appAPI } from "../../../services/AppService";
import { authAPI } from "../../../services/AuthService";
import { IFinishRegisterCredentials } from "../../../models/IFinishRegister";
import { userSlice } from "../../../store/reducers/UserSlice";
import { customErrorNotify } from "../../../helpers/customErrorNotify";


export interface AuthContinueSecondStepProps {
    isCredentialsFinishRegister: IFinishRegisterCredentials,
}

export const AuthContinueSecondStep: FC<AuthContinueSecondStepProps> = ({isCredentialsFinishRegister}) => {
    const {setUserAfterAuthContinue} = userSlice.actions
    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isInterestItems, setInterestItems] = useState<string[]>([])

    const {data: interestItems} = appAPI.useFetchAllInterestQuery('')
    const [finishRegister] = authAPI.useFinishRegisterMutation()

    const endAuthHandler = async () => {
        if (isInterestItems.length >= 3) {
            const {nickname, country, city} = isCredentialsFinishRegister
            const finishDataRegister:any = await finishRegister({...isCredentialsFinishRegister, interests: JSON.stringify(isInterestItems)})
            if (finishDataRegister.data.status === 200) {
                dispatch(loginReducer({isAuth: true, continueAuth: false}))
                dispatch(setUserAfterAuthContinue({name: nickname, country, city, interests: isInterestItems}))
                navigate(CONTENT)
                customErrorNotify('Good luck!', 'Success')
            } else {
                customErrorNotify(finishDataRegister.error.data.value, 'Error')
            }
        } else {
            customErrorNotify('Choose minimum 3 interests', 'Error')
        }
    }

    return (
        <div className={styles.secondStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'secondActiveStep']}/>
            </div>
            <div className={styles.helperTextBlock}>
                <span>Choose 3 of your crypto interests</span>
            </div>
            <div className={styles.interestsBlock}>
                {interestItems && interestItems.value.interests.map(({id, name}) =>
                    <div key={id}>
                        <InterestItem interest={name} setInterestItems={setInterestItems}
                                      isInterestItems={isInterestItems}/>
                    </div>
                )}
            </div>
            <div className={styles.buttonDoneBlock}>
                <Button buttonColor={'clearButton'} onClick={() => endAuthHandler()}>
                    <span>Done</span>
                </Button>
            </div>
        </div>
    );
};
