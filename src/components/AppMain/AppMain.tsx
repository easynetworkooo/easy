import React, { FC } from 'react';
import { Outlet } from "react-router-dom";
import styles from './AppMain.module.scss'
import { Container, Navigation } from "../../components-ui";

export interface AppMainProps {
    children?: React.ReactNode
}

export const AppMain: FC<AppMainProps> = ({children}) => {

    return (
        <Container width={'1440px'}>
            <div className={styles.appMain}>
                <Navigation/>
                <div className={styles.appContainer}>
                    <div className={styles.profileInformationBlock}>

                    </div>
                    <main className={styles.contentBlock}>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </Container>
    );
};
