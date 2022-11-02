import React from 'react';
import styles from './User.module.scss'
import { UserPost } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";
import { postAPI } from "../../services/PostService";
import { useParams } from "react-router-dom";


export const User = () => {
    const {userId} = useParams()
    const {data: userPosts} = postAPI.useFetchAllUserPostsQuery(`${userId}`)

    return (
        <div className={styles.userContainer}>
            <UserHeader/>
            <div className={styles.postsBlock}>
                {userPosts && userPosts.value.data.map((item, index) =>
                    <div key={index}>
                        <UserPost userPost={item}/>
                    </div>
                )}
            </div>
        </div>
    );
};
