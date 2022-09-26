import React from 'react';
import styles from './ProjectBlog.module.scss'
import { UserPost } from "../../../components-ui";
import avatar from "../../../assets/Profile/Default-avatar.png";

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

export const ProjectBlog = () => {
    return (
        <div className={styles.projectPosts}>
            {usersPosts.map((item, index) =>
                <div key={index}>
                    <UserPost icon={item.icon} name={item.name} text={item.text}/>
                </div>
            )}
        </div>
    );
};