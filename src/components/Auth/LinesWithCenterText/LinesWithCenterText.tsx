import React from 'react';
import styles from "./LinesWithCenterText.module.scss";

export const LinesWithCenterText = () => {
    return (
        <>
            <div className={styles.line}/>
            <div className={styles.lineText}>
                <span>or</span>
            </div>
            <div className={styles.line}/>
        </>
    );
};
