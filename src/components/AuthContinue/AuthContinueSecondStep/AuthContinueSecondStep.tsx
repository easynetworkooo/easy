import React, { FC } from 'react';
import styles from './AuthContinueSecondStep.module.scss'
import { Button, Steps } from "../../../components-ui";
import { InterestItem } from "./InterestItem/IntrestItem";
import { userSlice } from "../../../store/reducers/UserSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { PEOPLE_AND_PROJECTS } from "../../../constants/nameRoutesConsts";


export const AuthContinueSecondStep: FC = () => {

    const {endAuth} = userSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const interestItems = [
        'Solidity Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer',
        'NFT Investor', 'NFT Investor', 'Telegram Crypto Blogger', 'Telegram Crypto Blogger', 'Crypto Enthusiast',
        'Solidity Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer',
        'NFT Investor', 'NFT Investor', 'Telegram Crypto Blogger', 'Telegram Crypto Blogger', 'Crypto Enthusiast',
        'Solidity Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer', 'Rust Developer',
        'NFT Investor', 'NFT Investor', 'Telegram Crypto Blogger', 'Telegram Crypto Blogger', 'Crypto Enthusiast',
    ]

    const endAuthHandler = () => {
        dispatch(endAuth())
        navigate(PEOPLE_AND_PROJECTS)
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
                        <InterestItem interest={interest}/>
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