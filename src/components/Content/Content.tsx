import React, { useEffect, useState } from 'react';
import styles from './Content.module.scss'
import { FilterItems, PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from '../../assets/UI/AvatarProject.png'
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";
import { paginationCount } from "../../constants/pagintaionCount";



export const Content = () => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)
    const {data: usersPosts, isLoading: usersPostLoading} = postAPI.useFetchAllFreshPostsQuery({
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
        <div className={styles.peopleAndProjectContainer}>
            <FilterItems/>
            <div className={styles.postsBlock} onScroll={onScrollHandler}>
                {/*<ProjectPost icon={avatarProject} name={'Project'} text={'project test'}/>*/}
                {posts.map((item, index) =>
                    <div key={index}>
                        {item.type === 'project'
                            ?
                            <ProjectPost icon={avatarProject} name={'Project'} text={'project test'}/>
                            : <UserPost userPost={item}/>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};
