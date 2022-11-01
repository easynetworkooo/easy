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
    likes: null,
    views: null,
    reposts: null
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
            state.likes = action.payload.likes
            state.views = action.payload.views
            state.reposts = action.payload.reposts
        },
        setUserAfterAuthContinue(state, action: PayloadAction<IUserProfileContinueAuth>) {
            state.name = action.payload.name
            state.country = action.payload.country
            state.city = action.payload.city
            state.interests = action.payload.interests
        }
    }
})

export default userSlice.reducer;