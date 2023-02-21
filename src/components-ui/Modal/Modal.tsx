import React, { FC, useState } from 'react';
import styles from './Modal.module.scss'
import close from '../../assets/UI/close.svg'
import closeHover from '../../assets/UI/closeHover.svg'

export interface ModalProps {
    active: boolean,
    setActive: (boolean: boolean) => void
    children: React.ReactNode
}

export const Modal: FC<ModalProps> = ({active, setActive, children}) => {

    const [isHoverClose, setHoverClose] = useState(false)

    const setHoverCloseHandler = () => {
        setHoverClose(state => !state)
    }

    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <img src={isHoverClose ? closeHover : close} alt="close" className={styles.close}
                     onClick={() => setActive(false)}
                     onMouseEnter={setHoverCloseHandler}
                     onMouseLeave={setHoverCloseHandler}
                />
                {children}
            </div>
        </div>

    );
};
