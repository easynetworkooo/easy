import React, { FC, useState } from 'react';
import styles from './StepsCreateProject.module.scss'
import { StepsCreateProjectHeader } from "./StepsCreateProjectHeader/StepsCreateProjectHeader";
import { FirstStepCreateProject } from "./FirstStepCreateProject/FirstStepCreateProject";
import { SecondStepCreateProject } from "./SecondStepCreateProject/SecondStepCreateProject";
import { ThirdStepCreateProject } from "./ThirdStepCreateProject/ThirdStepCreateProject";
import { FourthStepCreateProject } from "./FourthStepCreateProject/FourthStepCreateProject";
import { CreatedProjectNavigate } from "./CreatedProjectNavigate/CreatedProjectNavigate";

export interface StepsCreateProjectProps {
    setModalCreateToken: (visible: boolean) => void
}

const StepsCreateProject:FC<StepsCreateProjectProps> = ({setModalCreateToken}) => {

    const [isActiveStepNumber, setActiveStepNumber] = useState(0)
    const [isSuccessfullyCreatedProject, setSuccessfullyCreatedProject] = useState(false)

    const checkStep = () => {
        if (isActiveStepNumber === 0) {
            return <FirstStepCreateProject setActiveStepNumber={setActiveStepNumber} setModalCreateToken={setModalCreateToken}/>
        } else if (isActiveStepNumber === 1) {
            return <SecondStepCreateProject setActiveStepNumber={setActiveStepNumber}/>
        } else if (isActiveStepNumber === 2) {
            return <ThirdStepCreateProject setActiveStepNumber={setActiveStepNumber}/>
        } else if (isActiveStepNumber === 3) {
            return <FourthStepCreateProject setActiveStepNumber={setActiveStepNumber} setSuccessfullyCreatedProject={setSuccessfullyCreatedProject}/>
        }
    }

    return (
        <>
            {isSuccessfullyCreatedProject ?
                <CreatedProjectNavigate/>
                :
                <>
                    <div className={styles.projectStepsHeader}>
                        <StepsCreateProjectHeader isActiveStepNumber={isActiveStepNumber}/>
                    </div>
                    <div className={styles.stepBlock}>
                        {checkStep()}
                    </div>
                </>
            }
        </>
    );
};

export default StepsCreateProject;