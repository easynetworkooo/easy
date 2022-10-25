import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice'
import { userAPI } from "../services/UserService";
import { appAPI } from "../services/AppService";
import { authAPI } from "../services/AuthService";

const rootReducer = combineReducers({
    authReducer,
    [appAPI.reducerPath] : appAPI.reducer,
    [authAPI.reducerPath] : authAPI.reducer,
    [userAPI.reducerPath] : userAPI.reducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(appAPI.middleware).concat(authAPI.middleware).concat(userAPI.middleware)

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']