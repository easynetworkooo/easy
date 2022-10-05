import React, { FC } from 'react';
import styles from './WalletConnect.module.scss'
import metaMask from '../../../assets/Wallet/MetaMask.png'

export interface WalletConnectProps {
    setWalletAuth: (auth: boolean) => void
}

export const WalletConnect:FC<WalletConnectProps> = ({setWalletAuth}) => {
    return (
        <div className={styles.walletConnectBlock}>
            <h1 className={styles.header}>Connect Wallet</h1>
            <div className={styles.selections}>
                <div className={styles.walletSelection}>
                    <span>Wallet Selection</span>
                    <div className={styles.selection} onClick={() => setWalletAuth(true)}>
                        <img src={metaMask} alt="wallet"/>
                        <span>MetaMask</span>
                    </div>
                    <div className={styles.selection} onClick={() => setWalletAuth(true)}>
                        <img src={metaMask} alt="wallet"/>
                        <span>Trust Wallet</span>
                    </div>
                </div>
                <div className={styles.blockchainSelection}>
                    <span>Blockchain Selection</span>
                    <div className={styles.selection} onClick={() => setWalletAuth(true)}>
                        <img src={metaMask} alt="wallet"/>
                        <span>Etherium</span>
                    </div>
                    <div className={`${styles.selection} ${styles.unActiveSelection}`}>
                        <img src={metaMask} alt="wallet"/>
                        <span>Solana</span>
                        <span className={styles.progressDeveloping}>In developing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};