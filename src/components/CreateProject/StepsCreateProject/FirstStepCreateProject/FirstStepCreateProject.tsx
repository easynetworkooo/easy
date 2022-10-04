import React, { FC } from 'react';
import styles from './FirstStepCreateProject.module.scss'
import { Button, Input } from "../../../../components-ui";

export interface FirstStepCreateProjectProps {
    setActiveStepNumber: (page: number) => void
}

export const FirstStepCreateProject:FC<FirstStepCreateProjectProps> = ({setActiveStepNumber}) => {
    return (
        <div className={styles.firstStepCreateProjectBlock}>
            <div className={styles.firstStepCreateProject}>
                <div className={styles.selectTokenBlock}>
                    <span className={styles.helperText}>Token Address</span>
                    <div className={styles.placeholderSelect}>
                        <div className={styles.inputBlock}>
                            <Input type={'text'} placeholder={'Token Address'}/>
                        </div>
                        <Button buttonColor={'grayButton'}>
                            <span>Select Token</span>
                        </Button>
                        <Button buttonColor={'grayButton'}>
                            <span>Create Token</span>
                        </Button>
                    </div>
                    <div className={styles.buttonApprove}>
                        <Button>
                            <span style={{fontSize: '14px'}}>Click to Approve</span>
                        </Button>
                    </div>
                </div>
                <div className={styles.selectedTokenInformation}>
                    <div className={styles.tokenPoint}>
                        <span className={styles.tokenHeader}>Name</span>
                        <span className={styles.tokenValue}>SaulToken</span>
                    </div>
                    <div className={styles.tokenPoint}>
                        <span className={styles.tokenHeader}>Symbol</span>
                        <span className={styles.tokenValue}>STK</span>
                    </div>
                    <div className={styles.tokenPoint}>
                        <span className={styles.tokenHeader}>Decimals</span>
                        <span className={styles.tokenValue}>18</span>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsNext}>
                <Button buttonColor={'clearButton'} onClick={() => setActiveStepNumber(1)}>
                    <span>Next Step</span>
                </Button>
            </div>
        </div>
    );
};