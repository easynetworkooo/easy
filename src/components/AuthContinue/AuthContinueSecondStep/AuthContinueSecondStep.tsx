import React, { FC, useState } from 'react';
import styles from './AuthContinueSecondStep.module.scss'
import { Button, Steps } from "../../../components-ui";
import { InterestItem } from "./InterestItem/IntrestItem";
import { authSlice } from "../../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { PEOPLE_AND_PROJECTS } from "../../../constants/nameRoutesConsts";


const interestItems = [
    'Solidity Developer', 'Rust Developer', 'NFT Investor', 'Telegram Crypto Blogger', 'Crypto Enthusiast', 'Motoko Developer',
    'JS Frontend Developer', 'React Frontend Developer', 'Youtube Crypto Blogger', 'NFT Gamer', 'Instagram Crypto Blogger',
    'Tiktok Crypto Blogger', 'Twitch Crypto Blogger', 'Reddit Crypto Blogger', 'Miner', 'Discord Customizer', 'NFT Staker', 'Crypto Staker', 'IDO Enthusiast',
]

export const AuthContinueSecondStep: FC = () => {

    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isInterestItems, setInterestItems] = useState<string[]>([])

    const endAuthHandler = () => {
        if (isInterestItems.length >= 3) {
            dispatch(loginReducer({isAuth: true, continueAuth: false}))
            navigate(PEOPLE_AND_PROJECTS)
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
                {interestItems.map((interest, key) =>
                    <div key={key}>
                        <InterestItem interest={interest} setInterestItems={setInterestItems}
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