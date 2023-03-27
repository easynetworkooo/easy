import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss'
import { FilterItems, PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from "../../assets/UI/AvatarProject.png";
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";
import { paginationCount } from "../../constants/pagintaionCount";
import spinner from "../../assets/UI/spinner.svg";


export const Subscriptions = () => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [isFetching, setFetching] = useState(false)
    const {data: usersPosts, isLoading: usersPostLoading, isFetching: isFetchingPosts} = postAPI.useFetchSubsPostsQuery({
        count: currentCount
    })


    useEffect(() => {
        if (usersPosts) {
            setPosts(usersPosts.value)
        }
    }, [usersPosts])

    useEffect(() => {
        if (isFetching && usersPosts && currentCount <= usersPosts.value.length) {
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, posts])

    useEffect(() => {
        if (usersPosts && !isFetchingPosts && currentCount > usersPosts.value.length) {
            setLoadingPosts(false)
        }
        // eslint-disable-next-line
    }, [isFetchingPosts])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 10) {
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
                {
                    loadingPosts &&
                    <div className={styles.spinnerBlock}>
                        <img src={spinner} alt="spinner"/>
                    </div>
                }
            </div>
        </div>
    );
};
