import React, { useState } from 'react';
import styles from './Community.module.scss'
import { Subscribers } from "./Subscribers/Subscribers";
import { Subscriptions } from "./Subscriptions/Subscriptions";

export const Community = () => {

    const [isTab, setTab] = useState('Subscribers')

    const checkTabs = () => {
        if (isTab === 'Subscribers') {
            return <Subscribers/>
        } else if (isTab === 'Subscriptions') {
            return <Subscriptions/>
        }
    }

    return (
        <div className={styles.communityContainer}>
            <div className={styles.tabsBlock}>
                <span className={isTab === 'Subscribers' ? `${styles.tab} ${styles.active}` : styles.tab}
                      onClick={() => setTab('Subscribers')}>Subscribers</span>
                <span className={isTab === 'Subscriptions' ? `${styles.tab} ${styles.active}` : styles.tab}
                      onClick={() => setTab('Subscriptions')}>Subscriptions</span>
            </div>
            {checkTabs()}
        </div>
    );
};
