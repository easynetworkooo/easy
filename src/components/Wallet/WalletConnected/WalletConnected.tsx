import React, { FC } from 'react';
import styles from './WalletConnected.module.scss'

export interface WalletConnectedProps {
    account: string
}

export const WalletConnected:FC<WalletConnectedProps> = ({account}) => {

    return (
        <div className={styles.walletProjectSection}>
            <h1>Wallet connect: true</h1>
            <h1>account Address: {account}</h1>
            {/*<WalletProject currentCount={100} maxCount={200} typeIndicator={'Sale Live'}/>*/}
            {/*<WalletProject currentCount={0} maxCount={200} typeIndicator={'Canceled'}/>*/}
            {/*<WalletProject currentCount={200} maxCount={200} typeIndicator={'Sale Ended'}/>*/}
            {/*<WalletProject currentCount={0} maxCount={200} typeIndicator={'Upcoming'}/>*/}
        </div>
    );
};
