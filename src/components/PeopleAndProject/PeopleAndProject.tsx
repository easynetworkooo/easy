import React, { useEffect, useState } from 'react';
import styles from './PeopleAndProjects.module.scss'
import { FilterItems, PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from '../../assets/UI/AvatarProject.png'
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";


export const PeopleAndProject = () => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isFetching, setFetching] = useState(false)
    const {data: usersPosts, isLoading: usersPostLoading} = postAPI.useFetchAllUserPostsQuery({userId: 1, page: currentPage})


    useEffect(() => {
        if (currentPage === 1 && usersPosts) {
            setPosts(usersPosts.value.data)
        }
        if (usersPosts && isFetching && usersPosts.value.data.length > 0) {
            setPosts((prevState) => [...prevState, ...usersPosts.value.data])
            setCurrentPage(prevState => prevState + 1)
        }
        // eslint-disable-next-line
    }, [isFetching, usersPosts])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 100) {
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
