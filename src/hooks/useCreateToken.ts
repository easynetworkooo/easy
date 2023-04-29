import { useAppSelector } from "./redux";
import baseToken from '../constants/BaseToken.json'
import { customErrorNotify } from "../helpers/customErrorNotify";
import { ethers, AbiCoder } from "ethers";

export const useCreateToken = () => {
    const {address} = useAppSelector(state => state.walletReducer)

    const createToken = async (name: string, symbol: string, supplyCount: string, decimals: number) => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
                const recipient = '0x9a6e945a134DD8aB85355D8f647823e72D9bAc7B'
                const fee = ethers.parseEther("0.1")
                const supply = ethers.parseEther(supplyCount)
                const args = [name, symbol, supply, recipient, fee, decimals]
                const encodedParams = new AbiCoder().encode(["string", "string", "uint256", "address", "uint256", "uint8"], args)
                const bytecode = baseToken.bytecode + encodedParams.substring(2);

                const transaction = {
                    from: address,
                    data: bytecode,
                    gas: 2000000,
                    value: ethers.parseEther("0.1"),
                    gasPrice: 30000000000,
                }

                const tx = await signer.sendTransaction(transaction)

                const receipt = await provider.getTransactionReceipt(tx.hash)

                console.log(receipt)

            } catch (e: any) {
                customErrorNotify(e.error, 'Error')
            }
        }
    }

    return {
        createToken
    }
}
