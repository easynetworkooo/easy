import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss'
import { FilterItems, SubsLoading, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";
import { IUserValue } from "../../../models/IUser";
import { paginationCount } from "../../../constants/pagintaionCount";


export const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<IUserValue[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)

    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscriptionsData} = userAPI.useFetchGetSubscriptionsQuery({id: id, count: currentCount})

    useEffect(() => {
        if (subscriptionsData) {
            setSubscriptions(subscriptionsData.value)
        }
    }, [subscriptionsData])

    useEffect(() => {
        if (isFetching && subscriptionsData && currentCount <= subscriptionsData.value.length) {
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, subscriptions])

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
                {subscriptionsData
                    ? subscriptions.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    : <SubsLoading/>
                }
                {subscriptionsData
                    ? subscriptions.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    : <SubsLoading/>
                }
            </div>
        </div>
    );
};
