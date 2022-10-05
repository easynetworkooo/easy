import React, { FC } from 'react';
import styles from './InformationAboutCreatedToken.module.scss'
import successCreatedToken from '../../../../assets/Steps/Ready-step.png'
import { Button } from "../../../../components-ui";

export interface InformationAboutCreatedTokenProps {
    setModalCreateToken: (visible: boolean) => void
}

export const InformationAboutCreatedToken:FC<InformationAboutCreatedTokenProps> = ({setModalCreateToken}) => {
    return (
        <>
            <div className={styles.headerAboutCreateToken}>
                <img src={successCreatedToken} alt="successCreatedToken"/>
                <span>Your token was created</span>
            </div>
            <div className={styles.informationBlock}>
                <div className={styles.information}>
                    <span className={styles.header}>Token Name</span>
                    <span className={styles.value}>EREORA</span>
                </div>
                <div className={styles.information}>
                    <span className={styles.header}>Token Symbol</span>
                    <span className={styles.value}>EOT</span>
                </div>
                <div className={styles.information}>
                    <span className={styles.header}>Total supply</span>
                    <span className={styles.value}>1000000000000</span>
                </div>
                <div className={styles.information}>
                    <span className={styles.header}>Liquidity Lockup Time</span>
                    <span className={styles.value}>91 days after poll ends</span>
                </div>
                <div className={styles.information}>
                    <span className={styles.header}>Address</span>
                    <span className={`${styles.value} ${styles.link}`}>htpps/asfhakjshfkjahs.lhfkh</span>
                </div>
            </div>
            <div className={styles.buttonsBlock}>
                <div className={styles.buttonCreatedToken}>
                    <Button buttonColor={'grayButton'}>
                        <span>View transaction on BSCScan</span>
                    </Button>
                </div>
                <div className={styles.buttonCreatedToken}>
                    <Button buttonColor={'clearButton'} onClick={() => setModalCreateToken(false)}>
                        <span>Create Launchpad</span>
                    </Button>
                </div>
            </div>
        </>
    );
};