import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss'
import dropdown from '../../assets/Select/dropdown.svg'
import clear from '../../assets/UI/close.svg'


export interface SelectProps {
    options: string[],
    placeholder: string,
    disabled?: boolean
    isActiveSelect: string,
    setActiveSelect: (item: string) => void
}

export const Select: FC<SelectProps> = ({
                                            options,
                                            disabled,
                                            placeholder,
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
            setOptions(options)
            setOpenDropdown(prevState => !prevState)
        }
    }

    const highlightFindTextOption = (option: string) => {
        const optionHighlight = option.slice(0, findValue.toLowerCase().length)
        const arr: { highlight: boolean; text: string }[] = [
            {
                text: optionHighlight,
                highlight: true
            }
            ,
            {
                text: option.slice(findValue.toLowerCase().length),
                highlight: false
            }
        ]

        return arr
    }

    const chooseOptionSelectHandler = (e: React.MouseEvent<HTMLDivElement>, option: string) => {
        setTimeout(() => {
            setOpenDropdown(false)
            setFindValue(option)
            setActiveSelect(option)
        }, 0)
    }

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFindValue(e.currentTarget.value)
        if (!isOpenDropDown) {
            setOpenDropdown(true)
        }

    }

    useEffect(() => {
        if (findValue === '') {
            setOptions(options)
        } else {
            setOptions(options.filter(item => item.toLowerCase().indexOf(findValue.toLowerCase()) === 0))

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
                       onChange={onChangeInputHandler} ref={inputRef}/>
                {findValue && <img src={clear} alt="clear" className={styles.clearFilter} onClick={() => setFindValue('')}/>}
                <img src={dropdown} alt="dropdown"
                     className={isOpenDropDown ? styles.dropdown : styles.dropdownUnActive}
                     onClick={() => inputRef.current.focus()}/>
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
                            {highlightFindTextOption(item).map((item, key) =>
                                <span className={item.highlight ? styles.dropdownElementHighlight : styles.dropdownElementText} key={key}>
                                    {item.text}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            }
        </div>

    );
};
