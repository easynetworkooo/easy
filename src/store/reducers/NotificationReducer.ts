import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotificationsValue } from "../../models/INotifications";


const initialState: INotificationsValue = {
    main: {
        likes: null,
        views: null,
        reposts: null
    },
    buttons: {
        messages: 0,
        subscribers: 0
    },
    bell: []
}

export const notificationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setNotificationsReducer(state, action: PayloadAction<INotificationsValue>) {
            state.main = action.payload.main
            state.buttons = action.payload.buttons
            state.bell = action.payload.bell
        }
    }
})

export default notificationSlice.reducer;
