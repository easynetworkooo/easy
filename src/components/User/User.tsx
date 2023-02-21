import React, { useEffect, useState } from 'react';
import styles from './User.module.scss'
import { PostLoadingSkeleton, UserPost, UserSkeletonHeader } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";
import { postAPI } from "../../services/PostService";
import { useParams } from "react-router-dom";
import { userAPI } from "../../services/UserService";
import { IPost } from "../../models/IPost";
import { paginationCount } from "../../constants/pagintaionCount";


export const User = () => {
    const {nickname} = useParams()
    const [isUserId, setUserId] = useState(0)
    const [posts, setPosts] = useState<IPost[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)
    const {data: userInformation} = userAPI.useFetchGetUserByNicknameQuery(`${nickname}`)
    const {data: userPosts} = postAPI.useFetchAllUserPostsQuery({
        userId: isUserId,
        count: currentCount

    }, {skip: isUserId === 0})

    useEffect(() => {
        if (userInformation) {
            setUserId(userInformation.value.id)
        }
    }, [userInformation])


    useEffect(() => {
        if (userPosts) {
            setPosts(userPosts.value.data)
        }
    }, [userPosts])

    useEffect(() => {
        if (isFetching && userPosts && currentCount <= userPosts.value.data.length) {
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, posts])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 10) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }


    return (
        <div className={styles.userContainer}>
            {userInformation
                ?
                <UserHeader isUserData={userInformation.value}/>
                :
                <UserSkeletonHeader/>
            }
            <div className={styles.postsBlock} onScroll={onScrollHandler}>
                {userPosts
                    ? posts.length > 0
                        ? posts.map((item, index) =>
                            <div key={index}>
                                <UserPost userPost={item}/>
                            </div>)
                        : <span className={styles.emptyPosts}>The user has not yet written posts</span>
                    :
                    <PostLoadingSkeleton/>
                }
            </div>
        </div>
    );
};
