import React, { FC } from 'react';
import styles from './IndicatorStatus.module.scss'

export interface IndicatorStatusProps {
    type: string
}

export const IndicatorStatus:FC<IndicatorStatusProps> = ({type}) => {

    const checkTypeIndicatorStatus = () => {
        if (type === 'Sale Live') {
            return styles.statusIndicator
        } else if (type === 'Sale Ended') {
            return `${styles.statusIndicator} ${styles.statusIndicatorEnded}`
        } else if (type === 'Canceled') {
            return `${styles.statusIndicator} ${styles.statusIndicatorCanceled}`
        } else if (type === 'Upcoming') {
            return `${styles.statusIndicator} ${styles.statusIndicatorUpcoming}`
        }
    }

    return (
        <div className={checkTypeIndicatorStatus()}>
            <span>{type}</span>
        </div>
    );
};