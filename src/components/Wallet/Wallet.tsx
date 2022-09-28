import React from 'react';
import styles from './Wallet.module.scss'
import { WalletConnect } from "./WalletConnect/WalletConnect";

export const Wallet = () => {
    return (
        <div className={styles.walletContainer}>
            <WalletConnect/>
        </div>
    );
};