import React, { FC } from 'react';
import styles from './UserDialog.module.scss'
import defaultAvatar from '../../../assets/Profile/Default-avatar.svg'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IDialogValue } from "../../../models/IDialog";
import { serverURL } from "../../../constants/serverURL";

export interface UserMessageProps {
    dialogData: IDialogValue
    index: number,
    isOpenMessages: number | null,
    openDialogHandler: (index: number, id: number) => void
}

export const UserDialog: FC<UserMessageProps> = ({dialogData, index, isOpenMessages, openDialogHandler}) => {

    const navigate = useNavigate()

    const navigateToUser = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        navigate(`${USERS}/${dialogData.opponentId}`)
    }


    return (
        <div
            className={index === isOpenMessages ? `${styles.userMessageBlock} ${styles.active}` : styles.userMessageBlock}
            onClick={() => openDialogHandler(index, dialogData.opponentId)}>
            <div className={styles.avatar}>
                <img src={dialogData.img ? `${serverURL}${dialogData.img}` : defaultAvatar} alt="avatar"
                     onClick={(e) => navigateToUser(e)}/>
            </div>
            <div className={styles.shortLastMessageBlock}>
                <div className={styles.timeLastMessageBlock}>
                    <span className={styles.name} onClick={(e) => navigateToUser(e)}>{dialogData.name}</span>
                    <span className={styles.timeLastMessage}>3 minutes ago</span>
                </div>
                <div className={styles.shortLastMessage}>
                    <p>{dialogData.lastMessage}</p>
                </div>
            </div>
        </div>
    );
};