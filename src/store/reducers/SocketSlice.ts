import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
    socket: {}
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketReducer(state, action: PayloadAction<{ socket: any }>) {
            state.socket = action.payload.socket
        }
    }
})

export default socketSlice.reducer;
