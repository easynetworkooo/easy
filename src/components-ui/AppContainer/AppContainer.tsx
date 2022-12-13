import React, { FC } from 'react';
import styles from './AppContainer.module.scss'
import { ErrorHandler } from "../ErrorHandler/ErrorHandler";


export interface AppContainerProps {
    children: React.ReactNode
}

export const AppContainer: FC<AppContainerProps> = ({children}) => {
    return (
        <div className={styles.AppContainer}>
            {children}
            <ErrorHandler/>
        </div>
    );
};

