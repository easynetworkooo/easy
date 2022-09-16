import React, { FC } from 'react';
import styles from './IconElement.module.scss'


export interface IconElementProps {
    image: string
    count: number
}

export const IconElement: FC<IconElementProps> = ({image, count}) => {
    return (
        <div className={styles.element}>
            <img src={image} alt={`${image}`}/>
            <span>{count}</span>
        </div>
    );
};
