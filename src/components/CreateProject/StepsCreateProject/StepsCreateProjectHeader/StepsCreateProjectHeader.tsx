import React, { FC } from 'react';
import styles from './StepsCreateProjectHeader.module.scss'
import firstActiveStep from '../../../../assets/Steps/First-active-step.png'
import secondActiveStep from '../../../../assets/Steps/Second-active-step.png'
import thirdActiveStep from '../../../../assets/Steps/Third-active-step.png'
import fourthActiveStep from '../../../../assets/Steps/Fourth-active-step.svg'
import secondUnreadyStep from '../../../../assets/Steps/Second-unready-step.png'
import thirdUnreadyStep from '../../../../assets/Steps/Third-unready-step.png'
import fourthUnreadyStep from '../../../../assets/Steps/Fourth-unready-step.svg'
import readyStep from '../../../../assets/Steps/Ready-step.png'

const activeSteps = [firstActiveStep, secondActiveStep, thirdActiveStep, fourthActiveStep]
const unreadySteps = [secondUnreadyStep, thirdUnreadyStep, fourthUnreadyStep]

const steps = [
    {name: 'Verify Token', information: 'Enter the token address and verify'},
    {name: 'DeFi Launchpad Info', information: 'Enter the launchpad information that you want to raise'},
    {name: 'Add Additional Info', information: 'Let People know who you are'},
    {name: 'Finish', information: 'Review your information'},
]

export interface StepsCreateProjectHeaderProps {
    isActiveStepNumber : number
}

export const StepsCreateProjectHeader: FC<StepsCreateProjectHeaderProps> = ({isActiveStepNumber}) => {

    const checkImageSteps = (index: number) => {
        if (index === isActiveStepNumber) {
            return activeSteps[index]
        } else if (isActiveStepNumber < index) {
            return unreadySteps[index - 1]
        } else if (isActiveStepNumber > index) {
            return readyStep
        }
    }

    const checkStylesSteps = (index: number) => {
        if (index === isActiveStepNumber) {
            return styles.stepProjectActive
        } else if (isActiveStepNumber < index) {
            return styles.stepProjectDisabled
        } else if (isActiveStepNumber > index) {
            return styles.stepProjectReady
        }
    }

    return (
        <div className={styles.stepsHeaderBlock}>
            {steps.map((item, index) =>
                <div className={checkStylesSteps(index)} key={index}>
                    <img src={checkImageSteps(index)} alt="step"/>
                    <div className={styles.stepInformation}>
                        <span className={styles.stepInformationHeader}>{item.name}</span>
                        <span className={styles.stepInformationAdditional}>{item.information}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
