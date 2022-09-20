import React, { FC } from 'react';
import styles from './IconElement.module.scss'


export interface IconElementProps {
    image: string
    count?: number
    type?: string
    onClick?: () => void
}

export const IconElement: FC<IconElementProps> = ({image, count, type, onClick}) => {
    return (
        <div className={type ? styles.element : `${styles.element} ${styles.pointer}`} onClick={onClick}>
            <img src={image} alt={`${image}`}/>
            {count && <span className={type && styles.textLight}>{count}</span>}
        </div>
    );
};
