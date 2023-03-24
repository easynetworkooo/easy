import React, { FC, useRef } from 'react';
import styles from './InputFind.module.scss'
import search from '../../assets/UI/Search.svg'
import close from '../../assets/UI/closeHover.svg'
import enter from '../../assets/UI/enter.svg'

export interface InputFindProps {
    value: string
    onChangeValue: (value: string) => void
    clearFilters: () => void
}

export const InputFind: FC<InputFindProps> = ({onChangeValue, value, clearFilters}) => {

    const inputRef = useRef<any>(null)

    const clearFiltersHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        clearFilters()
    }

    return (
        <div className={styles.inputFindBlock} onClick={() => inputRef.current.focus()}>
            <div className={styles.inputFindIcon}>
                <img src={search} alt="search"/>
            </div>
            <div className={styles.inputFind}>
                <input ref={inputRef} type="text" placeholder={'Search members by name, country'}
                       value={value} onChange={e => onChangeValue(e.target.value)}/>
            </div>
            {
                value &&
                <div className={styles.clearFilters}>
                    <img src={enter} alt="enterFind"/>
                    <img src={close} alt="clear" onClick={clearFiltersHandler}/>
                </div>

            }

        </div>
    );
};
