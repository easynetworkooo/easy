import React, { FC, useState } from 'react';
import styles from "./InterestItem.module.scss";

export interface InterestItemProps {
    interest: string
    isInterestItems: string[]
    setInterestItems: (arrayInterests: string[]) => void
}

export const InterestItem:FC<InterestItemProps> = ({interest, isInterestItems, setInterestItems}) => {

    const [isChosenInterest, setChosenInterest] = useState(false)

    const changeChosenInterest = () => {

        if (isChosenInterest) {
            const interests = isInterestItems.filter(item => item !== interest)
            setInterestItems(interests)
        } else {
            setInterestItems([...isInterestItems, interest])
        }

        setChosenInterest(!isChosenInterest)
    }

    return (
        <div className={isChosenInterest ? styles.interestChosen : styles.interest} onClick={changeChosenInterest}>
            <span>{interest}</span>
        </div>
    );
};