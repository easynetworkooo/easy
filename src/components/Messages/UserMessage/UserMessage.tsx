import React, { FC } from 'react';
import styles from './UserMessage.module.scss'
import avatar from '../../../assets/UI/AvatarUser.png'

export interface UserMessageProps {
    name: string,
    text: string,
    index: number,
    isOpenMessages: number | null,
    setOpenMessages: any
}

export const UserMessage: FC<UserMessageProps> = ({name, text, index, isOpenMessages, setOpenMessages}) => {

    return (
        <div className={index === isOpenMessages ? `${styles.userMessageBlock} ${styles.active}`: styles.userMessageBlock} onClick={() => setOpenMessages(index)}>
            <div className={styles.avatar}>
                <img src={avatar} alt="avatar"/>
            </div>
            <div className={styles.shortLastMessageBlock}>
                <div className={styles.timeLastMessageBlock}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.timeLastMessage}>3 minutes ago</span>
                </div>
                <div className={styles.shortLastMessage}>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};