import React from 'react';
import styles from './PeopleAndProjects.module.scss'
import { ButtonsSorter, InputFind, ProjectPost, UserPost } from "../../components-ui";
import avatar from '../../assets/Profile/Default-avatar.png'
import avatarProject from '../../assets/UI/AvatarProject.png'

const usersPosts = [
    {
        type: 'project',
        icon: avatarProject,
        name: 'Tingram',
        text: 'Думаю что курс крипты сейчас будет колебаться на одном уровне. Возможно примерно 20к. Время халвинга ещё не пришло и не придёт в ближайшие годы…',
    },
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
]

export const PeopleAndProject = () => {
    return (
        <div className={styles.peopleAndProjectContainer}>
            <div className={styles.headBlock}>
                <div className={styles.sortBlock}>
                    <ButtonsSorter/>
                </div>
                <div className={styles.findBlock}>
                    <InputFind/>
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