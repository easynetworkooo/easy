import React from 'react';
import styles from './ProjectBlog.module.scss'
import { UserPost } from "../../../components-ui";
import avatar from "../../../assets/Profile/Default-avatar.png";

const usersPosts = [
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Hello all',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
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