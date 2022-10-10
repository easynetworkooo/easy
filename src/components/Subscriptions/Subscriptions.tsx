import React, { useState } from 'react';
import styles from './Subscriptions.module.scss'
import { ButtonsSorter, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from "../../assets/UI/AvatarProject.png";
import avatar from "../../assets/Profile/Default-avatar.png";


const usersPosts = [
    {
        type: 'project',
        icon: avatarProject,
        name: 'Test',
        text: 'Project test',
    },
    {
        type: 'user',
        icon: avatar,
        name: 'Sub test',
        text: 'Hello All',
    },
    {
        type: 'user',
        icon: avatar,
        name: 'Teo Subert',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
]

export const Subscriptions = () => {

    const [isViewItems, setViewItems] = useState(usersPosts)

    return (
        <div className={styles.subscriptionsContainer}>
            <div className={styles.headBlock}>
                <div className={styles.sortBlock}>
                    <ButtonsSorter usersItems={usersPosts} setViewItems={setViewItems}/>
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