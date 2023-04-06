import React, { useState } from 'react';
import styles from './Wallet.module.scss'
import { WalletConnect } from "./WalletConnect/WalletConnect";
import { WalletConnected } from "./WalletConnected/WalletConnected";
import Web3 from "web3";
import { customErrorNotify } from "../../helpers/customErrorNotify";




export const Wallet = () => {

    const [account, setAccount] = useState('')
    const [isWalletAuth, setWalletAuth] = useState<boolean>(false)

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum)
            await window.ethereum.request( {method: 'eth_requestAccounts'})
                .then(() => customErrorNotify('Wallet connected', 'Success'))
                .catch((e: {message: string, code: number}) => customErrorNotify(`${e.code} ${e.message}`, 'Error'))
            const accounts = await web3Instance.eth.getAccounts()
            setWalletAuth(true)
            setAccount(accounts[0])
        } else {
            customErrorNotify('Please download metamask', 'Error')
        }


    }

    return (
        <div className={styles.walletContainer}>
            {isWalletAuth
                ?
                <WalletConnected account={account}/>
                :
                <WalletConnect connectWallet={connectWallet}/>
            }
        </div>
    );
};
