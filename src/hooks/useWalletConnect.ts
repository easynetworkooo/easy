import Web3 from "web3";
import { customErrorNotify } from "../helpers/customErrorNotify";
import { web3Slice } from "../store/reducers/Web3Slice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect } from "react";
import { IWallet, ProviderRpcError } from "../models/IWallet";
import { walletSlice } from "../store/reducers/WalletSlice";

export const useWalletConnect = () => {
    const {setWeb3Instance} = web3Slice.actions
    const {setWallet} = walletSlice.actions
    const web3Instance = useAppSelector(state => state.web3Reducer.web3Instance)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum)
            dispatch(setWeb3Instance({web3Instance}))
        }
    }, [])

    useEffect(() => {
        if (web3Instance) {
            web3Instance.givenProvider.on('accountsChanged', () => {
                walletConnect().catch(e => console.log(e))

            })
            web3Instance.givenProvider.on('chainChanged', () => {
                walletConnect().catch(e => console.log(e))
            })
        }
    }, [web3Instance])

    useEffect(() => {
        if (localStorage.getItem('wallet')) {
            walletConnect()
        }
    }, [web3Instance])

    const walletConnect = async () => {
        if (web3Instance) {
            let walletConnect = false
            await web3Instance.givenProvider.request({method: 'eth_requestAccounts'})
                .then(() => walletConnect = true)
                .catch((e: ProviderRpcError) => customErrorNotify(`${e.code} ${e.message}`, 'Error'))
            const addresses = await web3Instance.eth.getAccounts()
            const address = addresses[0]
            const balance = await web3Instance.eth.getBalance(address)
            const networkId = await web3Instance.eth.net.getId();
            const networkType = await web3Instance.eth.net.getNetworkType();
            const chainId = await web3Instance.eth.getChainId()
            const walletData: IWallet = {
                addresses,
                address,
                balance: +balance,
                networkId,
                networkType,
                chainId,
                isWalletConnected: walletConnect
            }
            localStorage.setItem('wallet', 'Metamask')
            dispatch(setWallet(walletData))
        }
        if (!window.ethereum) {
            customErrorNotify('Please install metamask', 'Error')
        }
    }

    return {
        walletConnectHandler: walletConnect
    }
}
