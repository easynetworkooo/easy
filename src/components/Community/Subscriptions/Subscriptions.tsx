import React, { useState } from 'react';
import styles from './Subscriptions.module.scss'
import { InputFind,  UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";


export const Subscriptions = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const [isPage, setPage] = useState(1)
    const {data: subscriptionsData} = userAPI.useFetchGetSubscriptionsQuery({id: id, page: isPage})

    return (
        <div className={styles.subscriptionsBlock}>
            <div className={styles.subscriptionsSortAndFind}>
                {/*<ButtonsSorter usersItems={subs} setViewItems={setViewItems}/>*/}
                <InputFind/>
            </div>
            <div className={styles.subscriptions}>
                {subscriptionsData && subscriptionsData.value.map((dataSub) =>
                    <UserSub dataSub={dataSub} key={dataSub.id}/>
                )}
            </div>
        </div>
    );
};