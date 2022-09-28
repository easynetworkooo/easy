import React from 'react';
import styles from './Subscribers.module.scss'
import { InputFind, UserSub } from "../../../components-ui";

export const Subscribers = () => {
    return (
        <div className={styles.subscribersBlock}>
            <InputFind/>
            <div className={styles.subscribers}>
                <UserSub/>
                <UserSub/>
                <UserSub/>
                <UserSub/>
                <UserSub/>
                <UserSub/>
            </div>
        </div>
    );
};