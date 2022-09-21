import React from 'react';
import styles from './Subscriptions.module.scss'
import { ButtonsSorter, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from "../../assets/UI/AvatarProject.png";
import avatar from "../../assets/Profile/Default-avatar.png";


const usersPosts = [
    {
        type: 'project',
        icon: avatarProject,
        name: 'Tingram',
        text: 'Project test',
    },
    {
        icon: avatar,
        name: 'Sub test',
        text: 'Всем привет',
    },
    {
        icon: avatar,
        name: 'Teo Subert',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы… тестим функционал' +
            'Криптовалюты не будут падать я так считаю',
    },
]

export const Subscriptions = () => {
    return (
        <div className={styles.subscriptionsContainer}>
            <div className={styles.headBlock}>
                <div className={styles.sortBlock}>
                    <ButtonsSorter/>
                </div>
            </div>
            <div className={styles.postsBlock}>
                {usersPosts.map((item) =>
                    <>
                        {item.type === 'project'
                            ?
                            <ProjectPost icon={item.icon} name={item.name} text={item.text}/>
                            : <UserPost icon={item.icon} name={item.name} text={item.text}/>
                        }
                    </>
                )}
            </div>
        </div>
    );
};