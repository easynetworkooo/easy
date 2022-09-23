import React from 'react';
import styles from './User.module.scss'
import avatar from "../../assets/UI/AvatarUser.png";
import { UserPost } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";

const usersPosts = [
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'Всем привет',
    },
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал',
    },
]

export const User = () => {
    return (
        <div className={styles.userContainer}>
            <UserHeader/>
            <div className={styles.postsBlock}>
                {usersPosts.map((item) =>
                    <>
                        <UserPost icon={item.icon} name={item.name} text={item.text}/>
                    </>
                )}
            </div>
        </div>
    );
};
