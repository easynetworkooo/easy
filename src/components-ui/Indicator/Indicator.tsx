import React, { FC } from 'react';
import styles from './Indicator.module.scss'

export interface IndicatorProps {
    currentCount: number
    maxCount: number
}

export const Indicator: FC<IndicatorProps> = ({maxCount, currentCount}) => {

    const calculatePercentages = () => {
        return +(currentCount * 100 / maxCount).toFixed(0)
    }

    const setWidthIndicator = () => {
        const width = calculatePercentages()
        if (width >= 10) {
            return width
        } else {
            return 10
        }
    }

    return (
        <div className={styles.indicatorBlock}>
            <div className={styles.indicator}>
                <div
                    className={calculatePercentages() === 100 ? `${styles.indicatorProgress} ${styles.indicatorProgressEnded}` : styles.indicatorProgress}
                    style={{width: `${setWidthIndicator()}%`}}>
                    <span>{calculatePercentages()}%</span>
                </div>
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
