import React, { FC } from 'react';
import styles from './Notifications.module.scss'
import notifications from '../../../assets/UI/Notifications.svg'
import notificationsActive from '../../../assets/UI/NotificationsActive.svg'
import avatar from '../../../assets/Profile/Default-avatar.svg'


export interface NotificationsProps {
    activeNotifications : boolean
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

export const Notifications: FC<NotificationsProps> = ({activeNotifications}) => {
    return (
        <div className={styles.notificationContainer}>
            <div className={styles.headerNotifications}>
                <img src={activeNotifications ? notificationsActive : notifications} alt="notifications"/>
                <span>Notifications</span>
            </div>
            <div className={styles.allNotificationsBlock}>
                {notificationsArr.map((item, key) =>
                    <div className={styles.notificationsBlock} key={key}>
                        <div className={styles.notificationsDate}>
                            <span>{item.date}</span>
                        </div>
                        <div className={styles.notifications}>
                            {item.data.map((data, key) =>
                                <div className={styles.notification} key={key}>
                                    <div className={styles.notificationAvatar}>
                                        <img src={data.avatar} alt="avatar"/>
                                    </div>
                                    <div className={styles.name}>
                                        <span>{data.name}</span>
                                    </div>
                                    <div className={styles.action}>
                                        <span>{data.action}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};