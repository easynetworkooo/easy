import React, { useEffect, useState } from 'react';
import styles from './PeopleAndProjects.module.scss'
import { PostLoadingSkeleton, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from '../../assets/UI/AvatarProject.png'
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";


export const PeopleAndProject = () => {

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
        <div className={styles.peopleAndProjectContainer}>
            {/*<div className={styles.headBlock}>*/}
            {/*    <div className={styles.sortBlock}>*/}
            {/*        <ButtonsSorter setViewItems={setViewItems} usersItems={isViewItems}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles.findBlock}>*/}
            {/*        <InputFind/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.postsBlock}>
                <ProjectPost icon={avatarProject} name={'Project'} text={'project test'}/>
                {isViewItems && isViewItems.map((item, index) =>
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