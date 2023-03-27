import React, { useEffect, useState } from 'react';
import styles from './Subscribers.module.scss'
import { SubsLoading, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { paginationUsersCount } from "../../../constants/pagintaionCount";
import { IUserValue } from "../../../models/IUser";
import { notificationSlice } from "../../../store/reducers/NotificationSlice";
import spinner from "../../../assets/UI/spinner.svg";

export const Subscribers = () => {

    const dispatch = useAppDispatch()

    const [subscribers, setSubscribers] = useState<IUserValue[]>([])
    const [currentCount, setCurrentCount] = useState(paginationUsersCount)
    const [isFetching, setFetching] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(true)
    
    const {setNotificationsReducer} = notificationSlice.actions

    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscribersData, isFetching: isFetchingUsers} = userAPI.useFetchGetSubscribersQuery({id: id, count: currentCount})
    const [fetchUserNotification] = userAPI.useFetchUserNotificationMutation()


    useEffect(() => {
        if (subscribersData) {
            setSubscribers(subscribersData.value)
            fetchUserNotification('').then((data: any) => {
                dispatch(setNotificationsReducer({
                    main: data.data.value.main,
                    buttons: data.data.value.buttons,
                    bell: data.data.value.bell
                }))
            })
        }
    }, [dispatch, fetchUserNotification, setNotificationsReducer, subscribersData])

    useEffect(() => {
        if (isFetching && subscribersData && currentCount <= subscribersData.value.length) {
            setCurrentCount(prevState => prevState + paginationUsersCount)
        }
        // eslint-disable-next-line
    }, [isFetching, subscribers])

    useEffect(() => {
        if (subscribersData && !isFetchingUsers && currentCount > subscribersData.value.length) {
            setLoadingUsers(false)
        }
        // eslint-disable-next-line
    }, [isFetchingUsers])


    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 10) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }


    return (
        <div className={styles.subscribersBlock}>
            <div className={styles.subscribers} onScroll={onScrollHandler}>
                {subscribersData
                    ?
                    subscribers.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    :
                    <SubsLoading/>
                }
                {
                    loadingUsers &&
                    <div className={styles.spinnerBlock}>
                        <img src={spinner} alt="spinner"/>
                    </div>
                }
            </div>
        </div>
    );
};
