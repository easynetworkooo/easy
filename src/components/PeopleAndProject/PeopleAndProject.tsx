import React, { useEffect, useState } from 'react';
import styles from './PeopleAndProjects.module.scss'
import { ButtonsSorter, InputFind, ProjectPost, UserPost } from "../../components-ui";
import avatarProject from '../../assets/UI/AvatarProject.png'
import { postAPI } from "../../services/PostService";
import { IPost } from "../../models/IPost";

const usersPosts = [
    {
        type: 'project',
        id: 27,
        text: "ggfhgf",
        owner: {
            id: 14,
            email: "test",
            name: "342",
            img: null
        },
        date: "2022-11-01 20:25:12",
        likes: null,
        comments: null,
        reposts: null
    },
    {
        id: 26,
        type: 'user',
        text: "ggfhgf",
        owner: {
            id: 14,
            email: "test",
            name: "342",
            img: null
        },
        date: "2022-11-01 20:25:12",
        likes: null,
        comments: null,
        reposts: null
    },
    {
        id: 27,
        type: 'user',
        text: "ggfhgf",
        owner: {
            id: 14,
            email: "test",
            name: "342",
            img: null
        },
        date: "2022-11-01 20:25:12",
        likes: null,
        comments: null,
        reposts: null
    },
]

export const PeopleAndProject = () => {

    const {data: usersPosts, isLoading: usersPostLoading} = postAPI.useFetchAllUserPostsQuery('1')
    const [isViewItems, setViewItems] = useState<IPost[]>([])

    useEffect(() => {
        if (usersPostLoading === false && usersPosts) {
            setViewItems(usersPosts.value.data)
        }
    }, [usersPostLoading, usersPosts])


    if (usersPostLoading) {
        return <div>Skeleton</div>
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