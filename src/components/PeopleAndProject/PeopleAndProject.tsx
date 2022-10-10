import React, { useState } from 'react';
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
        type: 'user',
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'Hello there',
    },
    {
        type: 'user',
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
]

export const PeopleAndProject = () => {

    const [isViewItems, setViewItems] = useState(usersPosts)

    return (
        <div className={styles.peopleAndProjectContainer}>
            <div className={styles.headBlock}>
                <div className={styles.sortBlock}>
                    <ButtonsSorter setViewItems={setViewItems} usersItems={usersPosts}/>
                </div>
                <div className={styles.findBlock}>
                    <InputFind/>
                </div>
            </div>
            <div className={styles.postsBlock}>
                {isViewItems.map((item, index) =>
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