import React, { FC, useState } from 'react';
import styles from './FourthStepCreateProject.module.scss'
import { Alert, Button } from "../../../../components-ui";

export interface FourthStepCreateProjectProps {
    setActiveStepNumber: (page: number) => void
    setSuccessfullyCreatedProject: (created: boolean) => void
}

export const FourthStepCreateProject:FC<FourthStepCreateProjectProps> = ({setActiveStepNumber, setSuccessfullyCreatedProject}) => {

    const [isAlert, setAlert] = useState(true)

    return (
        <div className={styles.fourthStepCreateProjectBlock}>
            <div className={styles.fourthStepCreateProject}>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Total token</span>
                    <span className={styles.value}>834,340,000 STK</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>ERAORA</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Decimals</span>
                    <span className={styles.value}>18</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Total token</span>
                    <span className={styles.value}>834,340,000 STK</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>ERAORA</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Decimals</span>
                    <span className={styles.value}>18</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Total token</span>
                    <span className={styles.value}>834,340,000 STK</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>ERAORA</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Decimals</span>
                    <span className={styles.value}>18</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Total token</span>
                    <span className={styles.value}>834,340,000 STK</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>ERAORA</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Decimals</span>
                    <span className={styles.value}>18</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Total token</span>
                    <span className={styles.value}>834,340,000 STK</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>ERAORA</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.headerInformation}>
                    <span className={styles.header}>Token Decimals</span>
                    <span className={styles.value}>18</span>
                </div>
                <div className={styles.alertBlock}>
                    <Alert setShow={setAlert} isShow={isAlert}>
                        <span>Holy guacamole! You should check in on some of those fields below.</span>
                    </Alert>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.backButton}>
                    <Button buttonColor={'grayButton'} onClick={() => setActiveStepNumber(2)}>
                        <span>Back</span>
                    </Button>
                </div>
                <div className={styles.nextButton}>
                    <Button buttonColor={'clearButton'} onClick={() => setSuccessfullyCreatedProject(true)}>
                        <span>Submit</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};