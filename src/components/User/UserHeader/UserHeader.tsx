import React from 'react';
import styles from './UserHeader.module.scss'
import avatar from "../../../assets/UI/AvatarUser.png";
import { Button, ButtonBack, IconElement } from "../../../components-ui";
import likes from "../../../assets/Profile/Like.svg";
import reposts from "../../../assets/Profile/Repost.svg";
import views from "../../../assets/Profile/View.svg";

export const UserHeader = () => {
    return (
        <div className={styles.headerBlock}>
            <div className={styles.avatarBlock}>
                <ButtonBack/>
                <img src={avatar} className={styles.avatar} alt="userProfile"/>
            </div>
            <div className={styles.actionsBlock}>
                <div className={styles.name}>
                    <span>Darlene Robertson</span>
                </div>
                <div className={styles.subsBlock}>
                    <span>254 subscribers</span>
                    <span>31 subscribers</span>
                </div>
                <div className={styles.actionsButtonBlock}>
                    <div className={styles.actionBlock}>
                        <Button buttonColor={'clearButton'}>
                            <span className={styles.btnText}>Subscribe</span>
                        </Button>
                    </div>
                    <div className={styles.actionBlock}>
                        <Button buttonColor={'clearButton'}>
                            <span className={styles.btnText}>Message</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.userInformationBlock}>
                <div className={styles.actionsList}>
                    <IconElement image={likes} count={22} type={'textLight'}/>
                    <IconElement image={reposts} count={22} type={'textLight'}/>
                    <IconElement image={views} count={22} type={'textLight'}/>
                </div>
                <div className={styles.userCountryBlock}>
                    <span>Belarus</span>
                    <span>Minsk</span>
                </div>
                <div className={styles.interestBlock}>
                    <div className={styles.interest}>
                        <span>DeFi Enthusiast</span>
                    </div>
                    <div className={styles.interest}>
                        <span>Tiktok Crypto Blogger</span>
                    </div>
                    <div className={styles.interest}>
                        <span>Telegram Crypto Blogger</span>
                    </div>
                </div>
            </div>
        </div>
    );
};