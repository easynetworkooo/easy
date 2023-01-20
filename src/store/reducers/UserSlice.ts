import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile, IUserProfileContinueAuth } from "../../models/IUserProfile";


const initialState: IUserProfile = {
    id: 0,
    email: '',
    name: '',
    regdate: '',
    country: '',
    city: '',
    interests: [],
    img: '',
    subscribers: 0,
    subscriptions: 0,
    bellstatus: 0
}

export const userSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserReducer(state, action: PayloadAction<IUserProfile>) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.name = action.payload.name
            state.regdate = action.payload.regdate
            state.country = action.payload.country
            state.city = action.payload.city
            state.interests = action.payload.interests
            state.img = action.payload.img
            state.subscribers = action.payload.subscribers
            state.subscriptions = action.payload.subscriptions
            state.bellstatus = action.payload.bellstatus
        },
        setUserAfterAuthContinue(state, action: PayloadAction<IUserProfileContinueAuth>) {
            state.name = action.payload.name
            state.country = action.payload.country
            state.city = action.payload.city
            state.interests = action.payload.interests
        },
        setAvatarReducer(state, action: PayloadAction<{ img: string }>) {
            state.img = action.payload.img
        },
        setViewBellReducer(state, action: PayloadAction<number>) {
            state.bellstatus = action.payload
        },
    }
})

export default userSlice.reducer;
