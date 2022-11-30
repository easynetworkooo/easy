import React from 'react';
import styles from './Subscriptions.module.scss'
import { FilterItems, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";


export const Subscriptions = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const {data: subscriptionsData} = userAPI.useFetchGetSubscriptionsQuery({id: id, page: 1})

    return (
        <div className={styles.subscriptionsBlock}>
            <div className={styles.subscriptionsSortAndFind}>
               <FilterItems/>
            </div>
            <div className={styles.subscriptions}>
                {subscriptionsData && subscriptionsData.value.map((dataSub) =>
                    <UserSub dataSub={dataSub} key={dataSub.id}/>
                )}
            </div>
        </div>
    );
};
