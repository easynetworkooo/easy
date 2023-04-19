import React, { FC, useState } from 'react';
import styles from './WalletConnected.module.scss'
import { IWallet, ProviderRpcError } from "../../../models/IWallet";
import { useCreateToken } from "../../../hooks/useCreateToken";
import { Button, Input } from "../../../components-ui";
import { useCreateLaunchpadFactory } from "../../../hooks/useCreateLaunchpadFactory";
import { walletAPI } from "../../../services/WalletService";
import { ILaunchpad } from "../../../models/ILaunchpad";
import { useAppSelector } from "../../../hooks/redux";
import { launchpadABI } from "../../../constants/launchpadABI";

export interface WalletConnectedProps {
    wallet: IWallet
}

export const WalletConnected: FC<WalletConnectedProps> = ({wallet}) => {
    const {createToken} = useCreateToken()
    const web3Instance = useAppSelector(state => state.web3Reducer.web3Instance)
    const address = useAppSelector(state => state.walletReducer.address)
    const createLaunchpad = useCreateLaunchpadFactory({
        earlyPhaseStart: 1640380800,
        earlyPhaseEnd: 1641907199,
        vestingStart: 1642281600,
        vestingDuration: 2592000,
        tokenLockDeadline: 1645123199,
    })

    const [signature] = walletAPI.useSignatureMutation()


    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [supply, setSupply] = useState('')
    const [decimals, setDecimals] = useState('')


    const getSignatureHandler = async () => {
        if (web3Instance) {
            const launchpad: ILaunchpad = await createLaunchpad()
            const gotSignature: any = await signature(launchpad)

            const contractInstance = new web3Instance.eth.Contract(launchpadABI, "0xF96392924e7101aCfdA60E7C215e099D163F1cfC")

            const contractOptions = {
                from: address,
                nonce: gotSignature.data.value.nonce,
                gas: 2000000,
                gasPrice: 30000000000,
            }
            await contractInstance.methods.createTokenLaunchpad(gotSignature.data.value).send(contractOptions).then(console.log).catch(console.log)

            // const transaction = {
            //     from: address,
            //     nonce: gotSignature.data.value.nonce,
            //     value: web3Instance.utils.toWei("0.00000001", "ether"),
            //     gas: 2000000,
            //     gasPrice: 30000000000,
            // }
            //
            // await web3Instance.eth.sendTransaction(transaction).then(console.log).catch((error: ProviderRpcError) => customErrorNotify(`${error.code} ${error.message}`, 'Error'))
        }

    }

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
            <Input type='number' placeholder={'decimals'} value={decimals}
                   onChange={(e) => setDecimals(e.target.value)}/>
            <Button onClick={() => createToken(name, symbol, supply, +decimals)}>
                <span>Create Token</span>
            </Button>

            <div className={styles.createLaunchpad}>
                <Button onClick={getSignatureHandler}>Get signature</Button>
            </div>
        </div>
    );
};
