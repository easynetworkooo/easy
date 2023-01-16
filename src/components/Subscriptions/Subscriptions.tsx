import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss'
import { FilterItems, PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from "../../assets/UI/AvatarProject.png";
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";
import { paginationCount } from "../../constants/pagintaionCount";


export const Subscriptions = () => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)
    const {data: usersPosts, isLoading: usersPostLoading} = postAPI.useFetchAllUserPostsQuery({
        userId: 1,
        count: currentCount
    })


    useEffect(() => {
        if (usersPosts) {
            setPosts(usersPosts.value.data)
        }
    }, [usersPosts])

    useEffect(() => {
        if (isFetching && usersPosts && currentCount <= usersPosts.value.data.length) {
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, posts])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) === 1) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }

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
            <FilterItems/>
            <div className={styles.postsBlock} onScroll={onScrollHandler}>
                {posts.map((item, index) =>
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
