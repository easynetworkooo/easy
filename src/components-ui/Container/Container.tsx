import React, { FC } from 'react';
import styles from './Container.module.scss'


export interface ContainerProps {
    children: React.ReactNode
    width?: string
}

export const Container: FC<ContainerProps> = ({children, width}) => {

    const checkWidth = () => {
        if (width === '1440px') {
            return styles.container1440px
        } else {
            return styles.container
        }
    }

    return (
        <div className={checkWidth()}>
            {children}
        </div>
    );
};
