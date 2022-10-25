import { IAuth } from "../../models/IAuth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuth = {
    isAuth: false,
    continueAuth: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer(state, action: PayloadAction<IAuth>) {
            state.isAuth = action.payload.isAuth
        }
    }
})

export default authSlice.reducer;