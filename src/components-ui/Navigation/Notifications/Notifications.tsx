import React, { FC } from 'react';
import styles from './Notifications.module.scss'
import notifications from '../../../assets/UI/Notifications.svg'
import notificationsActive from '../../../assets/UI/NotificationsActive.svg'
import avatar from '../../../assets/Profile/Default-avatar.svg'
import { useAppSelector } from "../../../hooks/redux";
import { IBellItem } from "../../../models/INotifications";
import { serverURL } from "../../../constants/serverURL";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";


export interface NotificationsProps {
    activeNotifications: boolean
    setActiveModalNotification: (active: boolean) => void
}

const notificationsArr = [
    {
        date: '25 January',
        data: [
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Left you a comment'
            },
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Subscribed to you'
            },
        ]

    },
    {
        date: '24 January',
        data: [
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Left you a comment'
            },
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Subscribed to you'
            },
        ]

    },
    {
        date: '23 January',
        data: [
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Left you a comment'
            },
            {
                avatar: avatar,
                name: 'Jane Cooper',
                action: 'Subscribed to you'
            },
        ]

    },
]

export const Notifications: FC<NotificationsProps> = ({activeNotifications, setActiveModalNotification}) => {

    const navigate = useNavigate()

    const notificationsData = useAppSelector(state => state.notificationsReducer.bell)

    const navigateToUserProfileHandler = (name: string) => {
        setActiveModalNotification(false)
        navigate(`${USERS}/${name}`)
    }

    return (
        <div className={styles.notificationContainer}>
            <div className={styles.headerNotifications}>
                <img src={activeNotifications ? notificationsActive : notifications} alt="notifications"/>
                <span>Notifications</span>
            </div>
            <div className={styles.allNotificationsBlock}>
                {notificationsData.map((notificationsData: IBellItem, key) =>
                    <div className={styles.notificationsBlock} key={key}>
                        <div className={styles.notificationsDate}>
                            <span>20 December</span>
                        </div>
                        <div className={styles.notifications}>
                            <div className={styles.notification} key={key}>
                                <div className={styles.notificationAvatar}>
                                    <img src={notificationsData.userData.img ? `${serverURL}${notificationsData.userData.img}` : avatar} alt="avatar"/>
                                </div>
                                <div className={styles.name}>
                                    <span onClick={() => navigateToUserProfileHandler(notificationsData.userData.name)}>{notificationsData.userData.name}</span>
                                </div>
                                <div className={styles.action}>
                                    <span>{notificationsData.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
