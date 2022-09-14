import React, { useState } from 'react';
import styles from './Select.module.scss'
import dropdown from '../../assets/Select/dropdown.png'

export const Select = () => {

    const [isActiveSelect, setActiveSelect] = useState('Select')
    const [isOpenDropDown, setOpenDropdown] = useState(false)

    const openDropDownHandler = () => {
        setOpenDropdown(!isOpenDropDown)
    }

    const chooseOptionSelectHandler = (option: string) => {
        setOpenDropdown(false)
        setActiveSelect(option)
    }

    return (
        <div className={styles.selectBlock}>
            <div className={styles.select} onClick={openDropDownHandler}>
                <span>{isActiveSelect}</span>
                <img src={dropdown} alt="drop" className={styles.dropdownImage}/>
            </div>
            {isOpenDropDown &&
                <div className={styles.listDropDownBlock}>
                    <div className={styles.dropdownElement} onClick={() => chooseOptionSelectHandler('TEST')}>
                        <span>TEST</span>
                    </div>
                    <div className={styles.dropdownElement}>
                        <span>TEST  FDSFS</span>
                    </div>
                    <div className={styles.dropdownElement}>
                        <span>FSDFS</span>
                    </div>
                </div>
            }
        </div>

    );
};
