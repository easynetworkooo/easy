import React, { useState } from 'react';
import styles from './ButtonSorter.module.scss'

export const ButtonsSorter = () => {

    const [isSorterName, setSorterName] = useState('All')


    const checkSorterStyles = (nameSorter: string) => {
        if (nameSorter === isSorterName) {
            return `${styles.buttonSorter} ${styles.active}`
        } else {
            return styles.buttonSorter
        }
    }

    return (
        <div className={styles.buttonSorterBlock}>
            <div className={checkSorterStyles('All')}>
                <button onClick={() => setSorterName('All')}><span>All</span></button>
            </div>
            <div className={checkSorterStyles('People')}>
                <button onClick={() => setSorterName('People')}><span>People</span></button>
            </div>
            <div className={checkSorterStyles('Project')}>
                <button onClick={() => setSorterName('Project')}><span>Project</span></button>
            </div>
        </div>
    );
};