import React, { FC, useEffect, useState } from 'react';
import styles from './Select.module.scss'
import dropdown from '../../assets/Select/dropdown.png'


export interface SelectProps {
    options: string[],
    placeholder: string,
    moreGrayBackColor?: any
}

export const Select:FC<SelectProps> = ({options, placeholder, moreGrayBackColor}) => {

    const [isActiveSelect, setActiveSelect] = useState('')
    const [isOpenDropDown, setOpenDropdown] = useState(false)

    const openDropDownHandler = () => {
        setOpenDropdown(!isOpenDropDown)
    }

    const chooseOptionSelectHandler = (option: string) => {
        setOpenDropdown(false)
        setActiveSelect(option)
    }

    useEffect(() => {
        setActiveSelect(placeholder)
    }, [placeholder])

    return (
        <div className={styles.selectBlock}>
            <div className={isOpenDropDown ? `${styles.select} ${styles.active}` : styles.select} onClick={openDropDownHandler} title={moreGrayBackColor ? 'gray200' : ''}>
                <span className={placeholder === isActiveSelect ? styles.placeholder : styles.selected}>{isActiveSelect}</span>
                <img src={dropdown} alt="drop" className={styles.dropdownImage}/>
            </div>
            {isOpenDropDown &&
                <div className={styles.listDropDownBlock} title={moreGrayBackColor ? 'gray200' : ''}>
                    {options.map((item) =>
                        <div className={styles.dropdownElement} onClick={() => chooseOptionSelectHandler(item)}>
                            <span>{item}</span>
                        </div>
                    )}
                </div>
            }
        </div>

    );
};