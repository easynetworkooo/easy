import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWallet } from "../../models/IWallet";


const initialState: IWallet = {
    isWalletConnected: false,
    addresses: [],
    address: '',
    networkId: 0,
    networkType: '',
    chainId: 0,
    balance: 0
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet(state, action: PayloadAction<IWallet>) {
            state.isWalletConnected = action.payload.isWalletConnected
            state.addresses = action.payload.addresses
            state.address = action.payload.address
            state.networkId = action.payload.networkId
            state.networkType = action.payload.networkType
            state.chainId = action.payload.chainId
            state.balance = action.payload.balance
        }
    }
})

export default walletSlice.reducer;
