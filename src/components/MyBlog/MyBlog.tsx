import React, { useState } from 'react';
import styles from './MyBlog.module.scss'
import { InputSend, UserPost } from "../../components-ui";
import avatar from "../../assets/Profile/Default-avatar.png";


const usersPosts = [
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Всем привет',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал',
    },
]

export const MyBlog = () => {

    const [isSubtractTextarea, setSubtractTextarea] = useState(0)

    return (
        <div className={styles.myBlogContainer}>
            <div className={styles.myPostsBlock} style={{height: `${712 - isSubtractTextarea}px`}}>
                {usersPosts.map((item) =>
                    <>
                        <UserPost icon={item.icon} name={item.name} text={item.text}/>
                    </>
                )}
            </div>
            <div className={styles.sendBlock}>
                <InputSend setSubtractTextarea={setSubtractTextarea}/>
            </div>
        </div>
    );
};
