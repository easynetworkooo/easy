import React, { FC } from 'react';
import styles from './Modal.module.scss'
import close from '../../assets/UI/close.svg'

export interface ModalProps {
    active: boolean,
    setActive: (boolean: boolean) => void
    children: React.ReactNode
}

export const Modal: FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <img src={close} alt="close" className={styles.close} onClick={() => setActive(false)}/>
                {children}
            </div>
        </div>

    );
};