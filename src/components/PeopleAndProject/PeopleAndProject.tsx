import React from 'react';
import styles from './PeopleAndProjects.module.scss'
import { ButtonsSorter, InputFind, ProjectPost, UserPost } from "../../components-ui";
import avatar from '../../assets/UI/AvatarUser.png'
import avatarProject from '../../assets/UI/AvatarProject.png'

const usersPosts = [
    {
        type: 'project',
        icon: avatarProject,
        name: 'Test',
        text: 'Project test'
    },
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'Hello there',
    },
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
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
                {usersPosts.map((item, index) =>
                    <div key={index}>
                        {item.type === 'project'
                            ?
                            <ProjectPost icon={item.icon} name={item.name} text={item.text}/>
                            : <UserPost icon={item.icon} name={item.name} text={item.text}/>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};