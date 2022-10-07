import React, { useState } from 'react';
import styles from './MyBlog.module.scss'
import { InputSend, UserPost } from "../../components-ui";
import avatar from "../../assets/Profile/Default-avatar.png";


const usersPosts = [
    {
        icon: avatar,
        name: 'Jane Cooper',
        text: 'Hello there',
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

export const MyBlog = () => {

    const [isSubtractTextarea, setSubtractTextarea] = useState(0)

    return (
        <div className={styles.myBlogContainer}>
            <div className={styles.myPostsBlock} style={{height: `${712 - isSubtractTextarea}px`}}>
                {usersPosts.map((item, index) =>
                    <div key={index}>
                        <UserPost icon={item.icon} name={item.name} text={item.text}/>
                    </div>
                )}
            </div>
            <div className={styles.sendBlock}>
                <InputSend setSubtractTextarea={setSubtractTextarea}/>
            </div>
        </div>
    );
};
