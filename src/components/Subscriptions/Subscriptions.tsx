import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss'
import { PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from "../../assets/UI/AvatarProject.png";
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";


export const Subscriptions = () => {

    const {data: usersPosts, isLoading: usersPostLoading} = postAPI.useFetchAllUserPostsQuery({userId: 1, page: 1})
    const [isViewItems, setViewItems] = useState<IPost[]>([])

    useEffect(() => {
        if (usersPostLoading === false && usersPosts) {
            setViewItems(usersPosts.value.data)
        }
    }, [usersPostLoading, usersPosts])

    if (usersPostLoading) {
        return (
            <>
                <PostLoadingSkeleton/>
                <PostLoadingSkeleton/>
            </>
        )
    }

    return (
        <div className={styles.subscriptionsContainer}>
            {/*<div className={styles.headBlock}>*/}
            {/*    <div className={styles.sortBlock}>*/}
            {/*        <ButtonsSorter usersItems={usersPosts} setViewItems={setViewItems}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.postsBlock}>
                {isViewItems.map((item, index) =>
                    <div key={index}>
                        {item.type === 'project'
                            ?
                            <ProjectPost icon={avatarProject} name={'project'} text={item.text}/>
                            : <UserPost userPost={item}/>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};