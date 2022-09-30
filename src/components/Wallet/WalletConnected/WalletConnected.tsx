import React from 'react';
import styles from './WalletConnected.module.scss'
import { WalletProject } from "./WalletProject/WalletProject";

export const WalletConnected = () => {

    return (
        <div className={styles.walletProjectSection}>
            <WalletProject currentCount={100} maxCount={200} typeIndicator={'Sale Live'}/>
            <WalletProject currentCount={0} maxCount={200} typeIndicator={'Canceled'}/>
            <WalletProject currentCount={200} maxCount={200} typeIndicator={'Sale Ended'}/>
            <WalletProject currentCount={0} maxCount={200} typeIndicator={'Upcoming'}/>
        </div>
    );
};