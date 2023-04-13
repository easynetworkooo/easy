import React, { FC, useState } from 'react';
import styles from './WalletConnected.module.scss'
import { IWallet } from "../../../models/IWallet";
import { useCreateToken } from "../../../hooks/useCreateToken";
import { Button, Input } from "../../../components-ui";

export interface WalletConnectedProps {
    wallet: IWallet
}

export const WalletConnected:FC<WalletConnectedProps> = ({wallet}) => {

    const {createToken} = useCreateToken()

    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [supply, setSupply] = useState('')
    const [decimals, setDecimals] = useState('')

    return (
        <div className={styles.walletProjectSection}>
            <h1>Wallet connect: {wallet.isWalletConnected.toString()}</h1>
            <h1>account Addresses: {wallet.addresses}</h1>
            <h1>account Address: {wallet.address}</h1>
            <h1>account balance: {wallet.balance}</h1>
            <h1>account network id: {wallet.networkId}</h1>
            <h1>account network type: {wallet.networkType}</h1>
            <h1>account chain Id: {wallet.chainId}</h1>
            <Input type='text' placeholder={'name'} value={name} onChange={(e) => setName(e.target.value)}/>
            <Input type='text' placeholder={'symbol'} value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
            <Input type='text' placeholder={'supply'} value={supply} onChange={(e) => setSupply(e.target.value)}/>
            <Input type='number' placeholder={'decimals'} value={decimals} onChange={(e) => setDecimals(e.target.value)}/>
            <Button onClick={() => createToken(name, symbol, supply, +decimals)}>
                <span>Create Token</span>
            </Button>
        </div>
    );
};
