import React from 'react';
import styles from './User.module.scss'
import avatar from "../../assets/UI/AvatarUser.png";
import { UserPost } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";

const usersPosts = [
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'Hello all',
    },
    {
        icon: avatar,
        name: 'Darlene Robertson',
        text: 'I think that the rate of the crypt will now fluctuate at the same level. Maybe around 20k. The time for halving has not yet come and will not come in the coming years…',
    },
]

export const User = () => {
    return (
        <div className={styles.userContainer}>
            <UserHeader/>
            <div className={styles.postsBlock}>
                {usersPosts.map((item, index) =>
                    <div key={index}>
                        <UserPost icon={item.icon} name={item.name} text={item.text}/>
                    </div>
                )}
            </div>
        </div>
    );
};
