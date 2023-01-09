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

interface groupsNotifications {
    date: string
    items: IBellItem[]
}

export const Notifications: FC<NotificationsProps> = ({activeNotifications, setActiveModalNotification}) => {

    const navigate = useNavigate()

    const notificationsData = useAppSelector(state => state.notificationsReducer.bell)

    const groups = notificationsData.reduce((groups: any, item: IBellItem) => {
        const date = item.regdate.split(' ')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(item);
        return groups;
    }, {});

    const groupsNotifications:groupsNotifications[] = Object.keys(groups).map((date) => {
        return {
            date,
            items: groups[date]
        };
    });


    const navigateToUserProfileHandler = (name: string) => {
        setActiveModalNotification(false)
        navigate(`${USERS}/${name}`)
    }

    const setTypeNotification = (typeNotification: string) => {
        if (typeNotification === 'postLike') {
            return 'put a like'
        } else if (typeNotification === 'commentLike') {
            return 'put a like on your comment'
        } else if (typeNotification === 'message') {
            return 'sent you a message'
        } else if (typeNotification === 'subscribe') {
            return 'subscribed to you'
        }
    }

    return (
        <div className={styles.notificationContainer}>
            <div className={styles.headerNotifications}>
                <img src={activeNotifications ? notificationsActive : notifications} alt="notifications"/>
                <span>Notifications</span>
            </div>
            <div className={styles.allNotificationsBlock}>
                {groupsNotifications.map((notifications, key) =>
                    <div className={styles.notificationsBlock} key={key}>
                        <div className={styles.notificationsDate}>
                            <span>{notifications.date}</span>
                        </div>
                        {notifications.items.map((notificationItem, key) =>
                            <div className={styles.notifications} key={key}>
                                <div className={styles.notification}>
                                    <div className={styles.notificationAvatar}>
                                        <img
                                            src={notificationItem.userData.img ? `${serverURL}${notificationItem.userData.img}` : avatar}
                                            alt="avatar"/>
                                    </div>
                                    <div className={styles.name}>
                                    <span
                                        onClick={() => navigateToUserProfileHandler(notificationItem.userData.name)}>{notificationItem.userData.name}</span>
                                    </div>
                                    <div className={styles.action}>
                                        <span>{setTypeNotification(notificationItem.type)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
