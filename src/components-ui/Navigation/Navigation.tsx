import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from './Navigation.module.scss'
import navigationLogo from '../../assets/Navigation/NavigationLogo.svg'
import notifications from '../../assets/UI/Notifications.svg'
import notificationsActive from '../../assets/UI/NotificationsActive.svg'
import { MY_BLOG, PEOPLE_AND_PROJECTS, SUBSCRIPTIONS } from "../../constants/nameRoutesConsts";
import { Modal } from "../Modal/Modal";
import { Notifications } from "./Notifications/Notifications";

export const Navigation = () => {

    const checkActiveLink = ({isActive}: any) => isActive ? styles.linkActive : styles.link

    const [isActiveNotifications, setActiveNotifications] = useState(true)
    const [isModalNotifications, setModalNotifications] = useState(false)

    return (
        <nav className={styles.navigationBlock}>
            <div className={styles.logoNavigationBlock}>
                <img src={navigationLogo} alt="logo"/>
            </div>
            <div className={styles.itemsNavigationBlock}>
                <div className={styles.itemNavigation}>
                    <NavLink to={PEOPLE_AND_PROJECTS} className={checkActiveLink}>People and Projects</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={SUBSCRIPTIONS} className={checkActiveLink}>Subscriptions</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={MY_BLOG} className={checkActiveLink}>My Blog</NavLink>
                </div>
            </div>
            <div className={styles.notificationsBlock}>
                <img src={isActiveNotifications ? notificationsActive : notifications} alt="notifications"
                     onClick={() => {
                         setActiveNotifications(false)
                         setModalNotifications(true)
                     }}/>
            </div>
            <Modal active={isModalNotifications} setActive={setModalNotifications}>
                <Notifications activeNotifications={isActiveNotifications}/>
            </Modal>
        </nav>
    );
};