import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.scss'
import { UserDialog } from "./UserDialog/UserDialog";
import { InputSend } from "../../components-ui";
import { io } from "socket.io-client";
import { userAPI } from "../../services/UserService";
import { useAppSelector } from "../../hooks/redux";
import { serverURL } from "../../constants/serverURL";
import { useLocation } from "react-router-dom";


export const Messages = () => {

    const location: any = useLocation()

    const [isMessageBlockHeight, setMessageBlockHeight] = useState(0)
    const [isOpenMessages, setOpenMessages] = useState<number | null>(null)
    const [isSendValueMessage, setSendValueMessage] = useState('')
    const [isUserIdToSend, setUserIdToSend] = useState(1)
    const [isDialogData, setDialogsData] = useState<any>([])
    const [isMessagesData, setMessagesData] = useState<any[]>([])

    const socket = useRef<any>()

    const {id: activeUserId} = useAppSelector(state => state.userReducer)
    const {data: dialogsData} = userAPI.useFetchGetDialogsQuery({page: 1})
    const [fetchGetMessages] = userAPI.useFetchGetMessagesMutation()

    useEffect(() => {
        if (dialogsData) {
            setDialogsData(dialogsData.value)
        }
    }, [dialogsData])

    useEffect(() => {
        if (dialogsData && location.state !== null) {
            setUserIdToSend(location.state.dialog.opponentId)
            if (dialogsData.value.find(data => data.opponentId === location.state.dialog.opponentId)) {
                setOpenMessages(dialogsData.value.findIndex(data => data.opponentId === location.state.dialog.opponentId))
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
            console.log(data)
            setMessagesData(prevState => [data.value, ...prevState])
        })
    }, [])

    const sendMessageHandler = () => {
        socket.current.emit('message', JSON.stringify({id: isUserIdToSend, text: isSendValueMessage}))
        setSendValueMessage('')
    }

    const openDialogHandle = async (index: number, id: number) => {
        setOpenMessages(index)
        try {
            const messages: any = await fetchGetMessages({id: id, page: 1})
            if (messages.data.status === 200) {
                setMessagesData(messages.data.value)
                setUserIdToSend(messages.data.value[0].toid)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.userMessagesBlock}>
                <div className={styles.userMessages}>
                    {isDialogData && isDialogData.map((item: any, index: number) =>
                        <UserDialog key={index} dialogData={item} index={index}
                                    isOpenMessages={isOpenMessages} openDialogHandler={openDialogHandle}/>
                    )}
                </div>
            </div>
            <div className={isOpenMessages !== null ? styles.messagesBlock : styles.messagesBlockNone}>
                <div className={styles.messages} style={{height: `${720 - isMessageBlockHeight}px`}}>
                    {isOpenMessages !== null && isMessagesData.map((item: any, index) =>
                        <div
                            className={item.fromid !== activeUserId ? styles.message : `${styles.message} ${styles.yourMessage}`}
                            key={index}>
                            <p className={styles.text}>{item.text}</p>
                            <span className={styles.timeSend}>{item.regdate}</span>
                        </div>
                    )}
                </div>
                <InputSend setSubtractTextarea={setMessageBlockHeight} value={isSendValueMessage}
                           onChange={e => setSendValueMessage(e.target.value)} sendHandler={sendMessageHandler}/>
            </div>
        </div>
    );
};