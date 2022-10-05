import React, { useState } from 'react';
import styles from './Wallet.module.scss'
import { WalletConnect } from "./WalletConnect/WalletConnect";
import { WalletConnected } from "./WalletConnected/WalletConnected";

export const Wallet = () => {

    const [isWalletAuth, setWalletAuth] = useState(false)

    return (
        <div className={styles.walletContainer}>
            {isWalletAuth
                ?
                <WalletConnected/>
                :
                <WalletConnect setWalletAuth={setWalletAuth}/>
            }
        </div>
    );
};