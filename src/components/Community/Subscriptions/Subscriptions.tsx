import React from 'react';
import styles from './Subscriptions.module.scss'
import { ButtonsSorter, InputFind, ProjectSub, UserSub } from "../../../components-ui";

export const Subscriptions = () => {
    return (
        <div className={styles.subscriptionsBlock}>
            <div className={styles.subscriptionsSortAndFind}>
                <ButtonsSorter/>
                <InputFind/>
            </div>
            <div className={styles.subscriptions}>
                <ProjectSub/>
                <UserSub/>
                <UserSub/>
                <UserSub/>
                <ProjectSub/>
            </div>
        </div>
    );
};