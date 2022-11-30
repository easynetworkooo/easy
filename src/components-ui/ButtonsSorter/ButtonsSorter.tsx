import React, { FC } from 'react';
import styles from './ButtonSorter.module.scss'

export interface ButtonsSorterProps {
    isSorterName: string,
    isShowFilter: boolean
    setSorterName: (sorter: string) => void
}

export const ButtonsSorter: FC<ButtonsSorterProps> = ({isSorterName, isShowFilter, setSorterName}) => {


    const checkSorterStyles = (nameSorter: string) => {
        if (nameSorter === isSorterName) {
            return `${styles.buttonSorter} ${styles.active}`
        } else {
            return styles.buttonSorter
        }
    }

    const setSorter = (name: string) => {
        setSorterName(name)
    }

    return (
        <div className={styles.buttonSorterBlock}>
            {!isShowFilter &&
                <div className={checkSorterStyles('All')}>
                    <button onClick={() => setSorter('All')}><span>All</span></button>
                </div>
            }
            <div className={checkSorterStyles('People')}>
                <button onClick={() => setSorter('People')}><span>People</span></button>
            </div>
            <div className={checkSorterStyles('Project')}>
                <button onClick={() => setSorter('Project')}><span>Project</span></button>
            </div>
        </div>
    );
};
