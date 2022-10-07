import React, { ChangeEvent, FC } from 'react';
import styles from './Input.module.scss'

export interface InputProps {
    placeholder: string
    type: string
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    autoFocus?: boolean
}

export const Input: FC<InputProps> = ({placeholder, type, value, onChange, onKeyPress, autoFocus}) => {
    return (
        <input className={styles.input} placeholder={placeholder} type={type} value={value} onChange={onChange}
               onKeyPress={onKeyPress} autoFocus={autoFocus}/>
    );
};
