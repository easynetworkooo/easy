import React from 'react';
import styles from './IndicatorStatus.module.scss'

export const IndicatorStatus = () => {
    return (
        <div className={styles.statusIndicator}>
            <span>Sale Live</span>
        </div>
    );
};