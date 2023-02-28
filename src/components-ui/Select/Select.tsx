import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss'
import dropdown from '../../assets/Select/dropdown.svg'


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
    const [isOptions, setOptions] = useState<string[]>([])
    const [findValue, setFindValue] = useState('')
    const blockRef = useRef<any>(null)
    const inputRef = useRef<any>(null)

    const openDropDownHandler = () => {
        if (disabled === undefined || !disabled) {
            setOpenDropdown(prevState => !prevState)
        }
    }

    const highlightFindTextOption = (option: string) => {
        const regex = new RegExp(findValue, 'gi');
        return option.replace(regex, '<span>$&</span>');
    }

    const chooseOptionSelectHandler = (e: React.MouseEvent<HTMLDivElement>, option: string) => {
        setOpenDropdown(false)
        setFindValue(option)
        setActiveSelect(option)
    }

    useEffect(() => {
        if (findValue === '') {
            setOptions(options)
        } else {
            setOptions(options.filter(item => item.toLowerCase().includes(findValue.toLowerCase())))

        }
    }, [findValue, options])

    useEffect(() => {
        if (options.find(item => item === isActiveSelect)) {
            setFindValue(isActiveSelect)
        } else {
            setFindValue('')
        }

    }, [isActiveSelect, options])

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (blockRef.current && !blockRef.current.contains(event.target)) {
                if (options.find(item => item === findValue)) {
                    setActiveSelect(findValue)
                } else {
                    setFindValue('')
                    setActiveSelect('')
                }
                setOpenDropdown(false)
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [findValue, blockRef, options, setActiveSelect])

    return (
        <div className={styles.selectBlock} ref={blockRef}>
            <div className={isOpenDropDown ? `${styles.select} ${styles.selectActive}` : styles.select}
                 onFocus={openDropDownHandler}>
                <input type="text" disabled={disabled} placeholder={placeholder} value={findValue}
                       onChange={e => setFindValue(e.currentTarget.value)} ref={inputRef}/>
                <img src={dropdown} alt="dropdown"
                     className={isOpenDropDown ? styles.dropdown : styles.dropdownUnActive} onClick={() => inputRef.current.focus()}/>
            </div>
            {isOpenDropDown &&
                <div className={styles.dropdownBlock}>
                    {findValue !== '' &&
                        <div className={styles.resultsSearchingText}>
                            <span>Searching Results:</span>
                        </div>
                    }
                    {isOptions.map((item, index) =>
                        <div className={styles.dropdownElement} key={index}
                             onClick={(e) => chooseOptionSelectHandler(e, item)}>
                            <span dangerouslySetInnerHTML={{__html: highlightFindTextOption(item)}}/>
                        </div>
                    )}
                </div>
            }
        </div>

    );
};
