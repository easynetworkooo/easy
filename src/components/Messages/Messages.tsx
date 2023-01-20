import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.scss'
import { InputSend } from "../../components-ui";
import { io } from "socket.io-client";
import { userAPI } from "../../services/UserService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { serverURL } from "../../constants/serverURL";
import { useLocation } from "react-router-dom";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { paginationCount } from "../../constants/pagintaionCount";
import UserDialogs from "./UserDialogs/UserDialogs";
import { notificationSlice } from "../../store/reducers/NotificationSlice";

export const Messages = () => {

    const location: any = useLocation()

    const dispatch = useAppDispatch()

    const [isMessageBlockHeight, setMessageBlockHeight] = useState(0)
    const [isOpenMessages, setOpenMessages] = useState<number | null>(null)
    const [isSendValueMessage, setSendValueMessage] = useState('')
    const [isUserIdToSend, setUserIdToSend] = useState(0)
    const [isDialogData, setDialogsData] = useState<any>([])
    const [currentCountDialogs, setCurrentCountDialogs] = useState(paginationCount)
    const [currentCountMessages, setCurrentCountMessages] = useState(10)
    const [isMessagesData, setMessagesData] = useState<any[]>([])

    const socket = useRef<any>()

    const {id: activeUserId} = useAppSelector(state => state.userReducer)
    const {setNotificationsReducer} = notificationSlice.actions

    const {
        data: dialogsData,
        refetch: dialogsDataRefetch
    } = userAPI.useFetchGetDialogsQuery({count: currentCountDialogs})

    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()
    const [fetchGetMessages] = userAPI.useFetchGetMessagesMutation()

    useEffect(() => {
        if (dialogsData) {
            // if (isDialogData.length > 0) {
            //     if ((isDialogData.find((item: any) => item.opponentId === isUserIdToSend).opponentId) === dialogsData.value[0].opponentId) {
            //         openDialogHandle(0, dialogsData.value[0].opponentId)
            //     }
            // }

            setDialogsData(dialogsData.value)
        }
        // eslint-disable-next-line
    }, [dialogsData])

    useEffect(() => {
        if (dialogsData && location.state !== null) {
            setUserIdToSend(location.state.dialog.opponentId)
            if (dialogsData.value.find(data => data.opponentId === location.state.dialog.opponentId)) {
                setOpenMessages(dialogsData.value.findIndex(data => data.opponentId === location.state.dialog.opponentId))
                fetchGetMessages({
                    id: location.state.dialog.opponentId,
                    count: currentCountMessages
                }).then((data: any) => {
                    setMessagesData(data.data.value)
                })
            } else {
                setOpenMessages(0)
                setDialogsData((prevState: any) => [{
                    opponentId: location.state.dialog.opponentId,
                    name: location.state.dialog.name,
                    lastMessage: '',
                    img: location.state.dialog.img
                }, ...prevState])
            }
        }
        // eslint-disable-next-line
    }, [dialogsData])

    useEffect(() => {
        socket.current = io(serverURL, {
            extraHeaders: {
                "Authorization": `${localStorage.getItem('auth')}`
            }
        })

        socket.current.on('message', (data: any) => {
            setMessagesData(prevState => [data.value, ...prevState])
            dialogsDataRefetch()
        })
        // eslint-disable-next-line
    }, [])

    const sendMessageHandler = () => {
        socket.current.emit('message', JSON.stringify({id: isUserIdToSend, text: isSendValueMessage}))
        setOpenMessages(0)
    }

    const openDialogHandle = async (index: number, id: number) => {
        setOpenMessages(index)
        try {
            const messages: any = await fetchGetMessages({id: id, count: 10})
            if (messages.data.status === 200) {
                setMessagesData(messages.data.value)
                setUserIdToSend(id)
            }
            await fetchUserNotification('').then((data: any) => {
                dispatch(setNotificationsReducer(data.data.value))
            })
        } catch (e: any) {
            customErrorNotify(e, 'Error')
        }
    }

    const onScrollMessageHandler = async (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.clientHeight - (Math.abs(e.currentTarget.scrollTop)) < 1 && dialogsData) {
            await fetchGetMessages({id: isUserIdToSend, count: currentCountMessages + 10}).then((data: any) => {
                setCurrentCountMessages(prevState => prevState + 10)
                setMessagesData(data.data.value)
            })
        }
    }

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.userMessagesBlock}>
                <UserDialogs isDialogData={isDialogData} isOpenMessages={isOpenMessages}
                             openDialogHandle={openDialogHandle} setCurrentCountDialogs={setCurrentCountDialogs}/>
            </div>
            <div className={isOpenMessages !== null ? styles.messagesBlock : styles.messagesBlockNone}>
                <div className={styles.messages} style={{height: `${720 - isMessageBlockHeight}px`}}
                     onScroll={onScrollMessageHandler}>
                    {isOpenMessages !== null && isMessagesData.map((item: any, index: number) =>
                        <React.Fragment key={index}>
                            {(item.fromid === isUserIdToSend || item.fromid === activeUserId) &&
                                <div
                                    className={item.fromid !== activeUserId ? styles.message : `${styles.message} ${styles.yourMessage}`}>
                                    <p className={styles.text}>{item.text}</p>
                                    <span className={styles.timeSend}>{item.regdate}</span>
                                </div>
                            }
                        </React.Fragment>
                    )}
                </div>
                <InputSend setSubtractTextarea={setMessageBlockHeight} value={isSendValueMessage}
                           setValue={setSendValueMessage} sendHandler={sendMessageHandler}/>
            </div>
        </div>
    );
};
