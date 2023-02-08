import React, { useEffect, useState } from 'react';
import styles from './User.module.scss'
import { PostLoadingSkeleton, UserPost, UserSkeletonHeader } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";
import { postAPI } from "../../services/PostService";
import { useParams } from "react-router-dom";
import { userAPI } from "../../services/UserService";
import { IPost } from "../../models/IPost";


export const User = () => {
    const {nickname} = useParams()
    const [isUserId, setUserId] = useState(0)
    const [posts, setPosts] = useState<IPost[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isFetching, setFetching] = useState(false)
    const {data: userInformation} = userAPI.useFetchGetUserByNicknameQuery(`${nickname}`)
    const {data: userPosts} = postAPI.useFetchAllUserPostsQuery({
        userId: isUserId,
        page: currentPage
    }, {skip: isUserId === 0})

    useEffect(() => {
        if (userInformation) {
            setUserId(userInformation.value.id)
        }
    }, [userInformation])

    useEffect(() => {
        if (currentPage === 1 && userPosts) {
            setPosts(userPosts.value.data)
        }
        if (userPosts && isFetching && userPosts.value.data.length > 0) {
            setPosts(userPosts.value.data)
            setCurrentPage(prevState => prevState + 1)
        }
        // eslint-disable-next-line
    }, [isFetching, userPosts])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 100) {
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
