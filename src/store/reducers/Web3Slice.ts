import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";


const initialState: {web3Instance: Web3 | null} = {
    web3Instance: null
}

export const web3Slice = createSlice({
    name: 'web3Instance',
    initialState,
    reducers: {
        setWeb3Instance(state, action: PayloadAction<{ web3Instance: Web3 }>) {
            state.web3Instance = action.payload.web3Instance
        }
    }
})

export default web3Slice.reducer;
