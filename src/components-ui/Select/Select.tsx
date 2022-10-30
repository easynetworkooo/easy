import React, { FC, useState } from 'react';
import styles from './Select.module.scss'
import dropdown from '../../assets/Select/dropdown.png'


export interface SelectProps {
    options: string[],
    placeholder: string,
    moreGrayBackColor?: any
    disabled?: boolean
    isActiveSelect: string,
    setActiveSelect: (item: string) => void
}

export const Select: FC<SelectProps> = ({
                                            options,
                                            disabled,
                                            placeholder,
                                            moreGrayBackColor,
                                            isActiveSelect,
                                            setActiveSelect
                                        }) => {
    const [isOpenDropDown, setOpenDropdown] = useState(false)

    const openDropDownHandler = () => {
        if (disabled === undefined || !disabled) {
            setOpenDropdown(!isOpenDropDown)
        }
    }

    const chooseOptionSelectHandler = (option: string) => {
        setOpenDropdown(false)
        setActiveSelect(option)
    }

    return (
        <div className={styles.selectBlock}>
            <div className={isOpenDropDown ? `${styles.select} ${styles.active}` : styles.select}
                 onClick={openDropDownHandler} title={moreGrayBackColor ? 'gray200' : ''}>
                <span className={isActiveSelect === '' ? styles.placeholder : styles.selected}>
                    {isActiveSelect === '' ? placeholder : isActiveSelect}
                </span>
                <img src={dropdown} alt="drop" className={styles.dropdownImage}/>
            </div>
            {isOpenDropDown &&
                <div className={styles.listDropDownBlock} title={moreGrayBackColor ? 'gray200' : ''}>
                    {options.map((item, index) =>
                        <div className={styles.dropdownElement} onClick={() => chooseOptionSelectHandler(item)} key={index}>
                            <span>{item}</span>
                        </div>
                    )}
                </div>
            }
        </div>

    );
};