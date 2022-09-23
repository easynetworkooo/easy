import React from 'react';
import styles from './ProjectDeposit.module.scss'
import { Button, Indicator, IndicatorStatus, Input } from "../../../components-ui";
import { useNavigate } from "react-router-dom";
import { WALLET } from "../../../constants/nameRoutesConsts";

export const ProjectDeposit = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.projectDepositBlock}>
            <div className={styles.indicatorBlock}>
                <div className={styles.indicatorStatus}>
                    <IndicatorStatus/>
                    <span className={styles.indicatorTime}>Presale Start 02.02.22 / 12:12:00</span>
                </div>
                <Indicator currentCount={120} maxCount={200}/>
            </div>
            <div className={styles.depositAmountBlock}>
                <span className={styles.amountText}>Amount</span>
                <Input placeholder={'0.0'} type={'number'}/>
                <Button onClick={() => navigate(WALLET)}>
                    <span>Connect wallet</span>
                </Button>
            </div>
            <div className={styles.depositInformationBlock}>
                <div className={styles.informationDeposit}>
                    <div className={styles.information}>
                        <span className={styles.title}>Status</span>
                        <span className={styles.highlightValue}>Sale live</span>
                    </div>
                    <div className={styles.information}>
                        <span className={styles.title}>Sale Type</span>
                        <span className={styles.highlightValue}>Public</span>
                    </div>
                    <div className={styles.information}>
                        <span className={styles.title}>Minimum Buy</span>
                        <span className={styles.value}>0.1 BNB</span>
                    </div>
                    <div className={styles.information}>
                        <span className={styles.title}>Maximum Buy</span>
                        <span className={styles.value}>5 BNB</span>
                    </div>
                </div>
            </div>
        </div>
    );
};