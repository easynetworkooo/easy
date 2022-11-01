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
                <div className={type ? styles.element : `${styles.element} ${styles.pointer}`} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                    <span className={styles.textLight}>{count ? count : 0}</span>
                </div>
            }
            {
                type === 'likes' &&
                <div className={`${styles.element} ${styles.pointer}`} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                    {count && <span className={styles.textPurple}>{count}</span>}
                </div>
            }
            {
                !type &&
                <div className={type ? styles.element : `${styles.element} ${styles.pointer}`} onClick={onClick}>
                    <img src={image} alt={`${image}`}/>
                    {count && <span className={type && styles.textLight}>{count}</span>}
                </div>
            }

        </>

    );
};
