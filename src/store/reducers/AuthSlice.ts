import { IAuth } from "../../models/IAuth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuth = {
    isAuth: false,
    continueAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer(state, action: PayloadAction<IAuth>) {
            state.isAuth = action.payload.isAuth
            state.continueAuth = action.payload.continueAuth
        },
        logoutReducer(state) {
            state.isAuth = false
        }
    }
})

export default authSlice.reducer;