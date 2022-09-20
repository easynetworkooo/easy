import React from 'react';
import styles from './ButtonSorter.module.scss'

export const ButtonsSorter = () => {


    return (
        <div className={styles.buttonSorterBlock}>
            <div className={`${styles.buttonSorter} ${styles.active}`}>
                <button><span>All</span></button>
            </div>
            <div className={styles.buttonSorter}>
                <button><span>People</span></button>
            </div>
            <div className={styles.buttonSorter}>
                <button><span>Project</span></button>
            </div>
        </div>
    );
};