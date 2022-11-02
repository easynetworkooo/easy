import React, { FC } from 'react';
import styles from './IconElement.module.scss'


export interface IconElementProps {
    image: string
    count?: number | null
    type?: string
    onClick?: () => void
}

export const IconElement: FC<IconElementProps> = ({image, count, type, onClick}) => {
    return (
        <>
            {
                type === 'light' &&
                <div className={styles.element} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                    <span className={styles.textLight}>{count ? count : 0}</span>
                </div>
            }
            {
                type === 'normal' &&
                <div className={`${styles.element} ${styles.pointer}`} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                    <span>{count ? count : 0}</span>
                </div>
            }
            {
                !type &&
                <div className={type ? styles.element : `${styles.element} ${styles.pointer}`} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                </div>
            }

        </>

    );
};
