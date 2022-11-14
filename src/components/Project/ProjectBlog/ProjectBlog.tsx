import React from 'react';
import styles from './ProjectBlog.module.scss'
import { UserPost } from "../../../components-ui";
import { postAPI } from "../../../services/PostService";


export const ProjectBlog = () => {

    const {data: userPosts} = postAPI.useFetchAllUserPostsQuery({userId: 1, page: 1})

    return (
        <div className={styles.projectPosts}>
            {userPosts && userPosts.value.data.map((item, index) =>
                <div key={index}>
                    <UserPost userPost={item}/>
                </div>
            )}
        </div>
    );
};