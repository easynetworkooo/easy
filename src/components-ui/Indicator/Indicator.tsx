import React, { FC } from 'react';
import styles from './Indicator.module.scss'

export interface IndicatorProps {
    currentCount: number
    maxCount: number
    type: string
}

export const Indicator: FC<IndicatorProps> = ({maxCount, currentCount, type}) => {

    const calculatePercentages = () => {
        return +(currentCount * 100 / maxCount).toFixed(0)
    }

    const setWidthIndicator = () => {
        const width = calculatePercentages()
        if (width >= 10) {
            return width
        } else {
            return 0
        }
    }

    const checkTypeIndicator = () => {
        if (type === 'Sale Live' || type === 'Sale Ended') {
            return styles.indicator
        } else {
            return styles.indicatorNonActive
        }
    }

    return (
        <div className={styles.indicatorBlock}>
            <div className={checkTypeIndicator()}>
                <div
                    className={calculatePercentages() === 100 ? `${styles.indicatorProgress} ${styles.indicatorProgressEnded}` : styles.indicatorProgress}
                    style={{width: `${setWidthIndicator()}%`}}>
                    <span className={styles.activeIndicator}>{calculatePercentages()}%</span>
                </div>
                <span className={styles.indicatorStart}>0%</span>
            </div>
            <div className={styles.coinBlock}>
                <div className={styles.countCoins}>
                    <span>{currentCount} BNB</span>
                </div>
                <div className={styles.countCoins}>
                    <span>{maxCount} BNB</span>
                </div>
            </div>
        </div>
    );
};
