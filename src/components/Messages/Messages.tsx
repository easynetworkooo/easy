import React, { useEffect, useState } from 'react';
import styles from './Messages.module.scss'
import { Avatar, InputSend, Text } from "../../components-ui";
import { userAPI } from "../../services/UserService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import UserDialogs from "./UserDialogs/UserDialogs";
import { notificationSlice } from "../../store/reducers/NotificationSlice";
import { IDialogValue } from "../../models/IDialog";
import { serverURL } from "../../constants/serverURL";
import { USERS } from "../../constants/nameRoutesConsts";
import { defaultColor } from "../../constants/colors";

const paginationCount = 30

export const Messages = () => {

    const location: any = useLocation()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [isMessageBlockHeight, setMessageBlockHeight] = useState(0)
    const [isOpenMessages, setOpenMessages] = useState<number | null>(null)
    const [isSendValueMessage, setSendValueMessage] = useState('')
    const [isUserIdToSend, setUserIdToSend] = useState(0)
    const [isDialogsData, setDialogsData] = useState<any>([])
    const [isOpenDialogData, setOpenDialogData] = useState<IDialogValue>({
        dateLastMessage: '',
        opponentId: 0,
        name: '',
        lastMessage: '',
        img: null,
        notification: 0,
        color: defaultColor
    })
    const [currentCountDialogs, setCurrentCountDialogs] = useState(paginationCount)
    const [currentCountMessages, setCurrentCountMessages] = useState(paginationCount)
    const [isMessagesData, setMessagesData] = useState<any[]>([])
    const [isPaginationWork, setPaginationWork] = useState(true)

    const [postImages, setPostImages] = useState<any>([])


    const {id: activeUserId} = useAppSelector(state => state.userReducer)
    const socket = useAppSelector(state => state.socketReducer.socket)
    const {setNotificationsReducer} = notificationSlice.actions

    const {
        data: dialogsData,
        refetch: dialogsDataRefetch
    } = userAPI.useFetchGetDialogsQuery({count: currentCountDialogs})

    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()
    const [fetchGetMessages] = userAPI.useFetchGetMessagesMutation()


    //auto find user after click 'Send message' in user page
    useEffect(() => {
        if (dialogsData) {
            if (location.state) {
                const activeOpenDialogIndex = dialogsData.value.findIndex(item => item.opponentId === location.state.dialog.opponentId)
                if (activeOpenDialogIndex !== -1) {
                    setDialogsData(dialogsData.value)
                    openDialogHandle(activeOpenDialogIndex, location.state.dialog.opponentId)
                    setOpenDialogData(location.state.dialog)
                    location.state = null
                    window.history.pushState(null, '')
                } else {
                    setDialogsData([{...location.state.dialog}, ...dialogsData.value])
                    openDialogHandle(0, location.state.dialog.opponentId)
                    setOpenDialogData(location.state.dialog)
                    location.state = null
                    window.history.pushState(null, '')
                }
            } else {
                setDialogsData(dialogsData.value)
            }
        }
        // eslint-disable-next-line
    }, [dialogsData])

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('message', (data: any) => {
                setMessagesData(prevState => [data.value, ...prevState])
                dialogsDataRefetch()
            })
        }
        // eslint-disable-next-line
    }, [socket])

    const sendMessageHandler = () => {
        setOpenMessages(0)
        socket.emit('message', JSON.stringify({id: isUserIdToSend, text: isSendValueMessage}))
    }

    const openDialogHandle = async (index: number, id: number) => {
        if (dialogsData) {
            setPaginationWork(true)
            setCurrentCountMessages(paginationCount)
            setOpenMessages(index)
            setOpenDialogData(isDialogsData[index])
            try {
                const messages: any = await fetchGetMessages({id: id, count: paginationCount})
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
    }

    const onScrollMessageHandler = async (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.clientHeight - (Math.abs(Math.round(e.currentTarget.scrollTop))) <= 1 && dialogsData && isPaginationWork) {
            setPaginationWork(false)
            await fetchGetMessages({id: isUserIdToSend, count: currentCountMessages + 10}).then((data: any) => {
                if (isMessagesData.length === data.data.value.length) {
                    setPaginationWork(false)
                } else {
                    setTimeout(() => {
                        setPaginationWork(true)
                        setCurrentCountMessages(prevState => prevState + 10)
                        setMessagesData(data.data.value)
                    }, 200)
                }

            })
        }
    }

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.userMessagesBlock}>
                <UserDialogs isDialogData={isDialogsData} isOpenMessages={isOpenMessages}
                             openDialogHandle={openDialogHandle} setCurrentCountDialogs={setCurrentCountDialogs}/>
            </div>
            <div className={isOpenMessages !== null ? styles.messagesBlock : styles.messagesBlockNone}>
                <div className={styles.messageUser} onClick={() => navigate(`${USERS}/${isOpenDialogData.name}`)}>
                    <div className={styles.avatarBlock}>
                        <Avatar img={isOpenDialogData.img ? `${serverURL}${isOpenDialogData.img}` : null} name={isOpenDialogData.name} color={isOpenDialogData.color} fontSize={18}/>
                    </div>
                    <span>{isOpenDialogData.name}</span>
                </div>
                <div className={styles.messages} style={{ height: `calc(100vh - 220px - ${isMessageBlockHeight}px)`}}
                     onScroll={(e) => isPaginationWork && onScrollMessageHandler(e)}>
                    {isOpenMessages !== null && isMessagesData.map((item: any, index: number) =>
                        <React.Fragment key={index}>
                            {item.fromid !== activeUserId ?
                                <div className={styles.messageBlock}>
                                    <div className={styles.borderMessage}/>
                                    <div className={styles.message}>
                                        <Avatar img={isOpenDialogData.img ? `${serverURL}${isOpenDialogData.img}` : null} name={isOpenDialogData.name} color={isOpenDialogData.color} fontSize={18}/>
                                        <Text text={item.text}/>
                                    </div>
                                </div>
                                :
                                <div className={styles.messageBlock}>
                                    <div className={item.fromid !== activeUserId ? styles.message : `${styles.message} ${styles.yourMessage}`}>
                                        <Text text={item.text}/>
                                    </div>
                                    <div className={styles.borderYourMessage}/>
                                </div>
                            }
                        </React.Fragment>
                    )}
                </div>
                <InputSend setSubtractTextarea={setMessageBlockHeight} setPostImages={setPostImages} postImages={postImages} value={isSendValueMessage}
                           setValue={setSendValueMessage} sendHandler={sendMessageHandler}
                           placeholder='Write a message'/>
            </div>
        </div>
    );
};
