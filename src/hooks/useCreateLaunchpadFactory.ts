import { useAppSelector } from "./redux";
import { ILaunchpad, ITimeFrames } from "../models/ILaunchpad";
import { ethers } from "ethers";


export const useCreateLaunchpadFactory = (timeFrames: ITimeFrames) => {
    const {address} = useAppSelector(state => state.walletReducer)

    const createLaunchpad = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const launchpad: ILaunchpad = {
            owner: address,
            tokenAddress: '0xA59Ca7Dfd15b95d482c0C7De17d465718D714352',
            fundsPaymentToken: '0x0000000000000000000000000000000000000000',
            depositTokenAmount: '100000000000000000000',
            lockingTokenAmount: 0,
            nonce: 0,
            timeFrames: timeFrames,
            easyFee: 250,
            vestingPercent: 100,
            vestingTGE: 140,
        }

        launchpad.nonce = await provider.getTransactionCount(address)

        return launchpad
    }

    return createLaunchpad
}
