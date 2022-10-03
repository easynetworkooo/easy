import React, { FC } from 'react';
import styles from './Button.module.scss'

export interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void
    buttonColor?: string
}

export const Button: FC<ButtonProps> = ({children, onClick, buttonColor}) => {

    const chooseStyleButton = () => {
        if (buttonColor === 'clearButton') {
            return `${styles.button} ${styles.clearButton}`
        } else if (buttonColor === 'grayButton') {
            return `${styles.button} ${styles.grayButton}`
        } else {
            return styles.button
        }
    }

    return (
        <button className={chooseStyleButton()} onClick={onClick}>
            {children}
        </button>
    );
};