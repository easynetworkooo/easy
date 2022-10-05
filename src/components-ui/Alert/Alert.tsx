import React, { FC } from 'react';
import styles from './Alert.module.scss'
import warningClose from '../../assets/Alert/WarningClose.svg'

export interface AlertProps {
    children: React.ReactNode
    isShow: boolean
    setShow: (showed: boolean) => void
}

export const Alert:FC<AlertProps> = ({children, isShow, setShow}) => {
    return (
        <div className={isShow ? styles.alertBlock : styles.hide}>
            <div className={styles.alertText}>
                {children}
            </div>
            <div className={styles.alertClose} onClick={() => setShow(false)}>
                <img src={warningClose} alt="close"/>
            </div>
        </div>
    );
};
