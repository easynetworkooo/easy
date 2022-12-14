import React from 'react';
import styles from './Subscribers.module.scss'
import { FilterItems, SubsLoading, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";

export const Subscribers = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscribersData} = userAPI.useFetchGetSubscribersQuery({id: id, page: 1})


    return (
        <div className={styles.subscribersBlock}>
            <div className={styles.subscriberFind}>
                <FilterItems/>
            </div>
            <div className={styles.subscribers}>
                {subscribersData
                    ?
                    subscribersData.value.map((dataSub) => <UserSub dataSub={dataSub} key={dataSub.id}/>)
                    :
                    <SubsLoading/>
                }
            </div>
        </div>
    );
};
