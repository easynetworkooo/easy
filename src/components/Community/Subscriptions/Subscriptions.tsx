import React, { useState } from 'react';
import styles from './Subscriptions.module.scss'
import { ButtonsSorter, InputFind, ProjectSub, UserSub } from "../../../components-ui";
import avatarProject from "../../../assets/UI/AvatarProject.png";
import avatar from "../../../assets/UI/AvatarUser.png";


const subs = [
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

export const Subscriptions = () => {

    const [isViewItems, setViewItems] = useState(subs)

    return (
        <div className={styles.subscriptionsBlock}>
            <div className={styles.subscriptionsSortAndFind}>
                <ButtonsSorter usersItems={subs} setViewItems={setViewItems}/>
                <InputFind/>
            </div>
            <div className={styles.subscriptions}>
                {isViewItems.map((item, index) =>
                    <div key={index}>
                        {item.type === 'project'
                            ?
                            <ProjectSub/>
                            :
                            <UserSub/>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};