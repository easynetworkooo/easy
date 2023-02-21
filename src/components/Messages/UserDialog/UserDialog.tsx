import React, { FC, useEffect, useState } from 'react';
import styles from './UserDialog.module.scss'
import defaultAvatar from '../../../assets/Profile/Default-avatar.svg'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IDialogValue } from "../../../models/IDialog";
import { serverURL } from "../../../constants/serverURL";
import { convertTime } from "../../../helpers/convertTime";

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
        navigate(`${USERS}/${dialogData.name}`)
    }

    const [countNotification, setCountNotification] = useState(0)

    const openDialog = () => {
        openDialogHandler(index, dialogData.opponentId)
        setCountNotification(0)
    }

    useEffect(() => {
        setCountNotification(dialogData.notification)
    }, [dialogData.notification])

    return (
        <div
            className={index === isOpenMessages ? `${styles.userMessageBlock} ${styles.active}` : styles.userMessageBlock}
            onClick={openDialog}>
            <div className={styles.avatar}>
                <img src={dialogData.img ? `${serverURL}${dialogData.img}` : defaultAvatar} alt="avatar"
                     onClick={(e) => navigateToUser(e)}/>
            </div>
            <div className={styles.shortLastMessageBlock}>
                <div className={styles.timeLastMessageBlock}>
                    <span className={styles.name} onClick={(e) => navigateToUser(e)}>{dialogData.name}</span>
                    <span className={styles.timeLastMessage}>{convertTime(dialogData.dateLastMessage)}</span>
                </div>
                <div className={styles.shortLastMessage}>
                    <p>{dialogData.lastMessage}</p>
                    {countNotification > 0 &&
                        <div className={styles.countNotifications}>
                            <span>{countNotification}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
