import React, { FC } from 'react';
import styles from './UserMessage.module.scss'
import avatar from '../../../assets/UI/AvatarUser.png'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";

export interface UserMessageProps {
    name: string,
    text: string,
    index: number,
    isOpenMessages: number | null,
    setOpenMessages: any
}

export const UserMessage: FC<UserMessageProps> = ({name, text, index, isOpenMessages, setOpenMessages}) => {

    const navigate = useNavigate()

    const navigateToUser = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        navigate(`${USERS}/st.koryk`)
    }

    return (
        <div className={index === isOpenMessages ? `${styles.userMessageBlock} ${styles.active}`: styles.userMessageBlock} onClick={() => setOpenMessages(index)}>
            <div className={styles.avatar}>
                <img src={avatar} alt="avatar" onClick={(e) => navigateToUser(e)}/>
            </div>
            <div className={styles.shortLastMessageBlock}>
                <div className={styles.timeLastMessageBlock}>
                    <span className={styles.name} onClick={(e) => navigateToUser(e)}>{name}</span>
                    <span className={styles.timeLastMessage}>3 minutes ago</span>
                </div>
                <div className={styles.shortLastMessage}>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};