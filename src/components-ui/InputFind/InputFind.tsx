import React, { FC, useState } from 'react';
import styles from './InputFind.module.scss'
import search from '../../assets/UI/Search.svg'
import searchActive from '../../assets/UI/SearchActive.svg'

export interface InputFindProps {
    setShowFilter: (show: boolean) => void
    value: string
    onChangeValue: (value: string) => void
}

export const InputFind: FC<InputFindProps> = ({setShowFilter, onChangeValue, value}) => {

    const [isFocus, setFocus] = useState(false)

    return (
        <div className={styles.inputFindBlock}>
            <div className={styles.inputFindIcon}>
                <img src={isFocus ? searchActive : search} alt="search"/>
            </div>
            <div className={styles.inputFind}>
                <input type="text" placeholder={'Search people or project'} onClick={() => setShowFilter(true)} onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)} value={value} onChange={e => onChangeValue(e.target.value)}/>
            </div>
        </div>
    );
};
