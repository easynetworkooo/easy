import React, { FC, useState } from 'react';
import styles from "./InterestItem.module.scss";

export interface InterestItemProps {
    interest: string
}

export const InterestItem:FC<InterestItemProps> = ({interest}) => {

    const [isChosenInterest, setChosenInterest] = useState(false)

    const changeChosenInterest = () => {
        setChosenInterest(!isChosenInterest)
    }

    return (
        <div className={isChosenInterest ? styles.interestChosen : styles.interest} onClick={changeChosenInterest}>
            <span>{interest}</span>
        </div>
    );
};