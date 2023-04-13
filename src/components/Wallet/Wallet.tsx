import React, { useEffect, useState } from 'react';
import styles from './Wallet.module.scss'
import { WalletConnect } from "./WalletConnect/WalletConnect";
import { WalletConnected } from "./WalletConnected/WalletConnected";
import { useWalletConnect } from "../../hooks/useWalletConnect";
import { useAppSelector } from "../../hooks/redux";




export const Wallet = () => {
    const wallet = useAppSelector(state => state.walletReducer)

    const {walletConnectHandler} = useWalletConnect()
    return (
        <div className={styles.walletContainer}>
            {wallet.isWalletConnected
                ?
                <WalletConnected wallet={wallet}/>
                :
                <WalletConnect connectWallet={walletConnectHandler}/>
            }
        </div>
    );
};
