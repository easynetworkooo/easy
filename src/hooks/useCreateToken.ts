import { useAppSelector } from "./redux";
import baseToken from '../constants/BaseToken.json'
import { ProviderRpcError } from "../models/IWallet";
import { customErrorNotify } from "../helpers/customErrorNotify";

export const useCreateToken = () => {
    const web3Instance = useAppSelector(state => state.web3Reducer.web3Instance)
    const {address} = useAppSelector(state => state.walletReducer)

    const createToken = async (name: string, symbol: string, supplyCount: string, decimals: number) => {
        if (web3Instance) {
            const recipient = '0x9a6e945a134DD8aB85355D8f647823e72D9bAc7B'
            const fee = web3Instance.utils.toWei("0.1", 'ether')
            const supply = web3Instance.utils.toWei(supplyCount, 'ether')
            const args = [name, symbol, supply, recipient, fee, decimals]
            const encodedParams = web3Instance.eth.abi.encodeParameters(["string", "string", "uint256", "address", "uint256", "uint8"], args);
            const bytecode = baseToken.bytecode + encodedParams.substring(2);

            const transaction = {
                from: address,
                data: bytecode,
                gas: 2000000,
                value: web3Instance.utils.toWei("0.1", "ether"),
                gasPrice: 30000000000,
            }

            await web3Instance.eth.sendTransaction(transaction).then(console.log).catch((error: ProviderRpcError) => customErrorNotify(`${error.code} ${error.message}`, 'Error'))
        }
    }

    return {
        createToken
    }
}
