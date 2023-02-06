import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from './Navigation.module.scss'
import navigationLogo from '../../assets/Navigation/NavigationLogo.svg'
import notifications from '../../assets/UI/Notifications.svg'
import notificationsActive from '../../assets/UI/NotificationsActive.svg'
import { CONTENT, MY_BLOG, SUBSCRIPTIONS } from "../../constants/nameRoutesConsts";
import { Modal } from "../Modal/Modal";
import { Notifications } from "./Notifications/Notifications";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import { userSlice } from "../../store/reducers/UserSlice";
import { notificationSlice } from "../../store/reducers/NotificationSlice";

export const Navigation = () => {

    const checkActiveLink = ({isActive}: any) => isActive ? styles.linkActive : styles.link
    const bellNotification = useAppSelector(state => state.userReducer.bellstatus)
    const socket = useAppSelector(state => state.socketReducer.socket)

    const [isModalNotifications, setModalNotifications] = useState(false)

    const {setViewBellReducer} = userSlice.actions
    const {setNotificationsReducer} = notificationSlice.actions
    const dispatch = useAppDispatch()
    const [setViewBell] = userAPI.useSetViewBellMutation()
    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('bellSocket', async () => {
                dispatch(setViewBellReducer(1))
                await fetchUserNotification('').then((data: any) => {
                    dispatch(setNotificationsReducer(data.data.value))
                })
            })
        }
        // eslint-disable-next-line
    }, [socket])

    const setViewBellHandler = () => {
        if (bellNotification === 1) {
            setViewBell('').then(() => dispatch(setViewBellReducer(0)))
        }
        setModalNotifications(true)
    }

    return (
        <nav className={styles.navigationBlock}>
            <div className={styles.logoNavigationBlock}>
                <NavLink to={CONTENT}><img src={navigationLogo} alt="logo"/></NavLink>
            </div>
            <div className={styles.itemsNavigationBlock}>
                <div className={styles.itemNavigation}>
                    <NavLink to={CONTENT} className={checkActiveLink}>New content</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={SUBSCRIPTIONS} className={checkActiveLink}>Subscription content</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={MY_BLOG} className={checkActiveLink}>My Blog</NavLink>
                </div>
            </div>
            <div className={styles.notificationsBlock}>
                <img src={bellNotification ? notificationsActive : notifications} alt="notifications"
                     onClick={setViewBellHandler}/>
            </div>
            <Modal active={isModalNotifications} setActive={setModalNotifications}>
                <Notifications bellNotification={bellNotification} setActiveModalNotification={setModalNotifications}/>
            </Modal>
        </nav>
    );
};
