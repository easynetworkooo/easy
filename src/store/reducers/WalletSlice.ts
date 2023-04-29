import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWallet } from "../../models/IWallet";
import { toBigInt } from "ethers";


const initialState: IWallet = {
    isWalletConnected: false,
    address: '',
    networkId: toBigInt(0),
    networkType: '',
    balance: toBigInt(0)
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet(state, action: PayloadAction<IWallet>) {
            state.isWalletConnected = action.payload.isWalletConnected
            state.address = action.payload.address
            state.networkId = action.payload.networkId
            state.networkType = action.payload.networkType
            state.balance = action.payload.balance
        }
    }
})

export default walletSlice.reducer;
