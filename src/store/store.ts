import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice'
import userReducer from './reducers/UserSlice'
import notificationsReducer from './reducers/NotificationSlice'
import socketReducer from './reducers/SocketSlice'
import web3Reducer from './reducers/Web3Slice'
import walletReducer from './reducers/WalletSlice'
import { userAPI } from "../services/UserService";
import { appAPI } from "../services/AppService";
import { authAPI } from "../services/AuthService";
import { postAPI } from "../services/PostService";


const rootReducer = combineReducers({
    authReducer,
    userReducer,
    notificationsReducer,
    socketReducer,
    web3Reducer,
    walletReducer,
    [appAPI.reducerPath] : appAPI.reducer,
    [authAPI.reducerPath] : authAPI.reducer,
    [userAPI.reducerPath] : userAPI.reducer,
    [postAPI.reducerPath] : postAPI.reducer

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false}).concat(appAPI.middleware).concat(authAPI.middleware).concat(userAPI.middleware).concat(postAPI.middleware)

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
