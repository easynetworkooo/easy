import { useCallback } from "react";
import { customErrorNotify } from "../helpers/customErrorNotify";
import { authAPI } from "../services/AuthService";
import { userAPI } from "../services/UserService";
import { useAppDispatch } from "./redux";
import { authSlice } from "../store/reducers/AuthSlice";
import { userSlice } from "../store/reducers/UserSlice";
import { notificationSlice } from "../store/reducers/NotificationSlice";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../constants/nameRoutesConsts";

export const useCheckAuthorization = () => {

    const navigate = useNavigate()

    const [checkAuthorization] = authAPI.useCheckAuthorizationMutation()
    const [fetchUserProfile] = userAPI.useFetchUserProfileMutation()
    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()
    const dispatch = useAppDispatch()

    const {loginReducer} = authSlice.actions
    const {setUserReducer} = userSlice.actions
    const {setNotificationsReducer} = notificationSlice.actions

    const checkAuthorizationCallback = useCallback(
        async () => {
            if (localStorage.getItem('auth') !== null) {
                const isAuthUser: any = await checkAuthorization('')
                try {
                    if (isAuthUser?.data?.value) {
                        const dataUser: any = await fetchUserProfile('')
                        const dataNotifications: any = await fetchUserNotification('')
                        const isContinueAuth = dataUser.data.value.interests === null
                        dispatch(loginReducer({isAuth: true, continueAuth: isContinueAuth}))
                        dispatch(setUserReducer({...dataUser.data.value}))
                        dispatch(setNotificationsReducer({
                            main: dataNotifications.data.value.main,
                            buttons: dataNotifications.data.value.buttons,
                            bell: dataNotifications.data.value.bell
                        }))
                    } else {
                        if (isAuthUser.error.status === 409) {
                            localStorage.removeItem('auth')
                        }
                        customErrorNotify(isAuthUser.error.data.value.toString(), 'Error')
                        navigate(AUTH)
                    }
                } catch (e:any) {
                    customErrorNotify(e, 'Error')
                }
            }
        },

        // eslint-disable-next-line
        []
    )

    return checkAuthorizationCallback
}
