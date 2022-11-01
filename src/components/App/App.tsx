import React, { FC, useCallback, useEffect, useState } from 'react';
import { AppContainer } from "../../components-ui";
import { AppRouter } from "../AppRouter/AppRouter";
import { authAPI } from "../../services/AuthService";
import { userAPI } from "../../services/UserService";
import { authSlice } from "../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";

export const App: FC = () => {
    const {loginReducer} = authSlice.actions
    const {setUserReducer} = userSlice.actions
    const dispatch = useAppDispatch()

    const [checkAuthorization] = authAPI.useCheckAuthorizationMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()

    const [isLoadingAuth, setLoadingAuth] = useState(true)

    const checkAuthorizationCallback = useCallback(
        async () => {
            if (localStorage.getItem('auth') !== null) {
                const isAuthUser: any = await checkAuthorization('')
                try {
                    if (isAuthUser?.data?.value) {
                        const dataUser: any = await fetchUserProfile('')
                        const isContinueAuth = dataUser.data.value.interests === null
                        dispatch(loginReducer({isAuth: true, continueAuth: isContinueAuth}))
                        dispatch(setUserReducer({...dataUser.data.value}))
                    } else {
                        console.log(isAuthUser.error)
                    }
                } catch (e) {
                    console.log(e)
                }
            }


        },
        [checkAuthorization, dispatch, fetchUserProfile, loginReducer, setUserReducer]
    )

    useEffect(() => {
        checkAuthorizationCallback().then(() => setLoadingAuth(false))
    }, [checkAuthorizationCallback])

    if (isLoadingAuth) return <div></div>

    return (
        <AppContainer>
            <AppRouter/>
        </AppContainer>
    );
};