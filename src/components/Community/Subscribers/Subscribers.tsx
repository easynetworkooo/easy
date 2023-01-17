import React, { useEffect, useState } from 'react';
import styles from './Subscribers.module.scss'
import { FilterItems, SubsLoading, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";
import { paginationCount } from "../../../constants/pagintaionCount";
import { IUserValue } from "../../../models/IUser";

export const Subscribers = () => {

    const [subscribers, setSubscribers] = useState<IUserValue[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)

    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscribersData} = userAPI.useFetchGetSubscribersQuery({id: id, count: currentCount})


    useEffect(() => {
        if (subscribersData) {
            setSubscribers(subscribersData.value)
        }
    }, [subscribersData])

    useEffect(() => {
        if (isFetching && subscribersData && currentCount <= subscribersData.value.length) {
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, subscribers])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 10) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }


    return (
        <div className={styles.subscribersBlock}>
            <div className={styles.subscriberFind}>
                <FilterItems/>
            </div>
            <div className={styles.subscribers} onScroll={onScrollHandler}>
                {subscribersData
                    ?
                    subscribers.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    :
                    <SubsLoading/>
                }
            </div>
        </div>
    );
};
