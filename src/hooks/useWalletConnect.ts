import { ethers } from "ethers";
import { customErrorNotify } from "../helpers/customErrorNotify";
import { useAppDispatch } from "./redux";
import { walletSlice } from "../store/reducers/WalletSlice";
import { useEffect } from "react";
import { IWallet } from "../models/IWallet";

export const useWalletConnect = () => {
    const {setWallet} = walletSlice.actions
    const dispatch = useAppDispatch()


    const walletConnect = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const address = signer.address
            const network = await provider.getNetwork()
            const networkId = network.chainId
            const networkType = network.name
            const balance = await provider.getBalance(address)
            if (signer) {
                const walletInformation: IWallet = {
                    isWalletConnected: true,
                    address,
                    networkType,
                    networkId,
                    balance
                }
                localStorage.setItem('wallet', 'true')
                dispatch(setWallet(walletInformation))
            } else {
                customErrorNotify('error connect', 'Error')
            }
        } else {
            customErrorNotify('install ethereum wallet', 'Error')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('wallet')) {
            walletConnect()
        }
        // eslint-disable-next-line
    }, [])


    return {
        walletConnectHandler: walletConnect
    }
}
