import React, { useState } from 'react';
import styles from './CreateProject.module.scss'
import { Button, ButtonBack, Modal } from "../../components-ui";
import { StepsCreateProjectHeader } from "./StepsCreateProjectHeader/StepsCreateProjectHeader";
import { FirstStepCreateToken } from "./FirstStepCreateToken/FirstStepCreateToken";
import { SecondStepCreateToken } from "./SecondStepCreateToken/SecondStepCreateToken";
import { ThirdStepCreateToken } from "./ThirdStepCreateToken/ThirdStepCreateToken";
import { FourthStepCreateToken } from "./FourthStepCreateToken/FourthStepCreateToken";

export const CreateProject = () => {

    const [isModalVisible, setModalVisible] = useState(true)
    const [isActiveStepNumber, setActiveStepNumber] = useState(0)

    const checkStep = () => {
        if (isActiveStepNumber === 0) {
            return <FirstStepCreateToken/>
        } else if (isActiveStepNumber === 1) {
            return <SecondStepCreateToken/>
        } else if (isActiveStepNumber === 2) {
            return <ThirdStepCreateToken/>
        } else if (isActiveStepNumber === 3) {
            return <FourthStepCreateToken/>
        }
    }

    return (
        <div className={styles.createProjectContainer}>
            <ButtonBack/>
            <div className={styles.projectStepsHeader}>
                <StepsCreateProjectHeader isActiveStepNumber={isActiveStepNumber}/>
            </div>
            <div className={styles.stepBlock}>
                {checkStep()}
            </div>
            <Modal active={isModalVisible} setActive={setModalVisible}>
                <div className={styles.modalContent}>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Launchpad</span>
                    </Button>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Token</span>
                    </Button>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Lock Liquidity</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};