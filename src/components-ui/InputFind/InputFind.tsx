import React, { FC } from 'react';
import styles from './InputFind.module.scss'
import search from '../../assets/UI/Search.svg'

export interface InputFindProps {
    setShowFilter: (show: boolean) => void
    value: string
    onChangeValue: (value: string) => void
}

export const InputFind: FC<InputFindProps> = ({setShowFilter, onChangeValue, value}) => {

    return (
        <div className={styles.inputFindBlock}>
            <div className={styles.inputFindIcon}>
                <img src={search} alt="search"/>
            </div>
            <div className={styles.inputFind}>
                <input type="text" placeholder={'Search members by name, country or qualification'} onClick={() => setShowFilter(true)} value={value} onChange={e => onChangeValue(e.target.value)}/>
            </div>
        </div>
    );
};
