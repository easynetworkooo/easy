import { useAppSelector } from "./redux";
import { ILaunchpad, ITimeFrames } from "../models/ILaunchpad";


export const useCreateLaunchpadFactory = (timeFrames: ITimeFrames) => {
    const {address} = useAppSelector(state => state.walletReducer)
    const web3Instance = useAppSelector(state => state.web3Reducer.web3Instance)

    const createLaunchpad = async () => {
        const launchpad: ILaunchpad = {
            owner: address,
            tokenAddress: '0x1c81a4EfD0b744CF5bB3f2cE4c3d2bC9B959DD49',
            fundsPaymentToken: '0x0000000000000000000000000000000000000000',
            depositTokenAmount: 1000000000,
            lockingTokenAmount: 0,
            nonce: 0,
            timeFrames: timeFrames,
            easyFee: 250,
            vestingPercent: 100,
            vestingTGE: 140,
        }

        if (web3Instance) {
            launchpad.nonce = await web3Instance.eth.getTransactionCount(address)
        }

        return launchpad
    }

    return createLaunchpad
}
