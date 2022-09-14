import React, { FC } from 'react';
import styles from './Container.module.scss'


export interface ContainerProps {
    children: React.ReactNode
}

export const Container: FC<ContainerProps> = ({children}) => {
    return (
        <main className={styles.container}>
            {children}
        </main>
    );
};
