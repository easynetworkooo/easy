import React, { FC, useState } from 'react';
import styles from './WalletConnected.module.scss'
import { IWallet } from "../../../models/IWallet";
import { useCreateToken } from "../../../hooks/useCreateToken";
import { Button, Input } from "../../../components-ui";
import { useCreateLaunchpadFactory } from "../../../hooks/useCreateLaunchpadFactory";
import { walletAPI } from "../../../services/WalletService";
import { ILaunchpad } from "../../../models/ILaunchpad";
import { Contract, ethers } from "ethers";
import { launchpadABI } from "../../../constants/launchpadABI";
import { ERC20ABI } from "../../../constants/ERC20ABI";

export interface WalletConnectedProps {
    wallet: IWallet
}

export const WalletConnected: FC<WalletConnectedProps> = ({wallet}) => {
    const {createToken} = useCreateToken()
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
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        let launchpad: ILaunchpad = await createLaunchpad()
        const launchpadResponse: any = await signature(launchpad)
        launchpad = launchpadResponse.data

        const tokenLaunchpadFactoryInstance = new Contract('0xF96392924e7101aCfdA60E7C215e099D163F1cfC', launchpadABI, signer);

        const erc20Instance = new Contract(launchpad.tokenAddress, ERC20ABI, signer);
        const tokenInstanceAddress = await tokenLaunchpadFactoryInstance.getAddress()

        await erc20Instance.approve(tokenInstanceAddress, launchpad.depositTokenAmount)

        const txContract = await tokenLaunchpadFactoryInstance.createTokenLaunchpad(launchpad, {gasLimit: 3000000})

        const tx = await txContract.wait()

        console.log(tx.logs[5].args[0])
    }

    return (
        <div className={styles.walletProjectSection}>
            <h1>Wallet connect: {wallet.isWalletConnected.toString()}</h1>
            <h1>account Address: {wallet.address}</h1>
            <h1>account network type: {wallet.networkType}</h1>
            <h1>account balance: {wallet.balance.toString()}</h1>
            <h1>account network id: {wallet.networkId.toString()}</h1>
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
