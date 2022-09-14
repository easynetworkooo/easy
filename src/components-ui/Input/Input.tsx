import React, { ChangeEvent, FC } from 'react';
import styles from './Input.module.scss'

export interface InputProps {
    placeholder: string
    type: string
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({placeholder, type, value, onChange}) => {
    return (
        <input className={styles.input} placeholder={placeholder} type={type} value={value} onChange={onChange}/>
    );
};
