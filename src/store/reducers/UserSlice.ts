import { IUser } from "../../models/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: IUser,
    isAuth: boolean
}

const initialState: UserState = {
    user: {name: '', continueAuth: false},
    isAuth: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload
            state.isAuth = true
        },
        endAuth(state) {
            state.user.continueAuth = false
        }
    }
})

export default userSlice.reducer;