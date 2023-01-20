import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
    socket: {}
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketReducer(state, action: PayloadAction<any>) {
            state.socket = action.payload
        }
    }
})

export default socketSlice.reducer;
