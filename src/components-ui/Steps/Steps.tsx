import React, { FC } from 'react';
import styles from './Steps.module.scss'
import firstActiveStep from '../../assets/Steps/First-active-step.png'
import secondActiveStep from '../../assets/Steps/Second-active-step.png'
import thirdActiveStep from '../../assets/Steps/Third-active-step.png'
import secondUnreadyStep from '../../assets/Steps/Second-unready-step.png'
import thirdUnreadyStep from '../../assets/Steps/Third-unready-step.png'
import readyStep from '../../assets/Steps/Ready-step.png'

export interface StepsProps {
    steps: string[]
}

export const Steps: FC<StepsProps> = ({steps}) => {

    const checkSteps = (name: string) => {
        if (name === 'firstActiveStep') {
            return firstActiveStep
        } else if (name === 'secondActiveStep') {
            return secondActiveStep
        } else if (name === 'thirdActiveStep') {
            return thirdActiveStep
        } else if (name === 'secondUnreadyStep') {
            return secondUnreadyStep
        } else if (name === 'thirdUnreadyStep') {
            return thirdUnreadyStep
        } else if (name === 'readyStep') {
            return readyStep
        }
    }

    return (
        <div className={styles.stepsBlock}>
            {steps.map((item, index) =>
                <>
                    {index + 1 <= steps.length && index + 1 !== 1 && <div className={styles.line}/>}
                    <div className={styles.stepBlock}>
                        <img src={checkSteps(item)} alt="step"/>
                    </div>
                </>
            )}
        </div>
    );
};