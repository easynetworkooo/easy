import React from 'react';
import styles from './InputFind.module.scss'
import search from '../../assets/UI/Search.svg'

export const InputFind = () => {
    return (
        <div className={styles.inputFindBlock}>
            <div className={styles.inputFindIcon}>
                <img src={search} alt="search"/>
            </div>
            <div className={styles.inputFind}>
                <input type="text" placeholder={'Search people or project'}/>
            </div>
        </div>
    );
};