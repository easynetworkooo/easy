import React, { useState } from 'react';
import styles from './Subscribers.module.scss'
import { InputFind, UserSub } from "../../../components-ui";
import { userAPI } from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";

export const Subscribers = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const [isPage, setPage] = useState(1)
    const {data: subscribersData} = userAPI.useFetchGetSubscribersQuery({id: id, page: isPage})



    return (
        <div className={styles.subscribersBlock}>
            <div className={styles.subscriberFind}>
                <InputFind/>
            </div>
            <div className={styles.subscribers}>
                {subscribersData && subscribersData.value.map((dataSub) =>
                    <UserSub dataSub={dataSub}/>
                )
                }
            </div>
        </div>
    );
};