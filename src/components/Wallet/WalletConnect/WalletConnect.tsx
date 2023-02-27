import React, { FC } from 'react';
import styles from './WalletConnect.module.scss'
import metaMask from '../../../assets/Wallet/Metamask.svg'
import ethereum from '../../../assets/Wallet/Ethereum.svg'
import solana from '../../../assets/Wallet/Solana.svg'
import trust from '../../../assets/Wallet/Trust.svg'

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
                        <img src={trust} alt="wallet"/>
                        <span>Trust Wallet</span>
                    </div>
                </div>
                <div className={styles.blockchainSelection}>
                    <span>Blockchain Selection</span>
                    <div className={styles.selection} onClick={() => setWalletAuth(true)}>
                        <img src={ethereum} alt="wallet"/>
                        <span>Etherium</span>
                    </div>
                    <div className={`${styles.selection} ${styles.unActiveSelection}`}>
                        <img src={solana} alt="wallet"/>
                        <span>Solana</span>
                        <span className={styles.progressDeveloping}>In developing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
