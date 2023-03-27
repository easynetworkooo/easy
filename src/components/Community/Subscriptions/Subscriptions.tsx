import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss'
import { SubsLoading, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";
import { IUserValue } from "../../../models/IUser";
import { paginationUsersCount } from "../../../constants/pagintaionCount";
import spinner from "../../../assets/UI/spinner.svg";


export const Subscriptions = () => {

    const [subscriptions, setSubscriptions] = useState<IUserValue[]>([])
    const [currentCount, setCurrentCount] = useState(paginationUsersCount)
    const [isFetching, setFetching] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(true)

    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscriptionsData, isFetching: isFetchingUsers} = userAPI.useFetchGetSubscriptionsQuery({id: id, count: currentCount})

    useEffect(() => {
        if (subscriptionsData) {
            setSubscriptions(subscriptionsData.value)
        }
    }, [subscriptionsData])

    useEffect(() => {
        if (isFetching && subscriptionsData && currentCount <= subscriptionsData.value.length) {
            setCurrentCount(prevState => prevState + paginationUsersCount)
        }
        // eslint-disable-next-line
    }, [isFetching, subscriptions])

    useEffect(() => {
        if (subscriptionsData && !isFetchingUsers && currentCount > subscriptionsData.value.length) {
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
        <div className={styles.subscriptionsBlock}>
            <div className={styles.subscriptions} onScroll={onScrollHandler}>
                {subscriptionsData
                    ? subscriptions.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    : <SubsLoading/>
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
