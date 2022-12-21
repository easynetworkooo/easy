import React, { FC } from 'react';
import styles from './AppContainer.module.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";


export interface AppContainerProps {
    children: React.ReactNode
}

export const AppContainer: FC<AppContainerProps> = ({children}) => {
    return (
        <div className={styles.AppContainer}>
            {children}
            <ToastContainer/>
        </div>
    );
};

