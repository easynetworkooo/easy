import React, { useEffect, useState } from 'react';
import styles from './MyBlog.module.scss'
import { InputSend, PostLoadingSkeleton, UserPost } from "../../components-ui";
import { postAPI } from "../../services/PostService";
import { useAppSelector } from "../../hooks/redux";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { IPost } from "../../models/IPost";
import { paginationCount } from "../../constants/pagintaionCount";


export const MyBlog = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const [createBlogPost] = postAPI.useCreateBlogPostMutation()
    const [posts, setPosts] = useState<IPost[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)
    const {data: userPosts, isLoading: isLoadingUserPosts} = postAPI.useFetchAllUserPostsQuery({
        userId: id,
        count: currentCount
    })

    const [isSubtractTextarea, setSubtractTextarea] = useState(0)
    const [isSendValue, setSendValue] = useState<string>('')

    const sendHandler = async () => {
        const dataCreatePost: any = await createBlogPost({text: isSendValue})
        if (dataCreatePost.data.status === 200) {
            setSendValue('')
            customErrorNotify('Post successfully created', 'Success')
        } else {
            customErrorNotify(dataCreatePost.error.data.value, 'Error')
        }
    }

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
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) === 1) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }

    if (isLoadingUserPosts) {
        return (
            <>
                <PostLoadingSkeleton/>
                <PostLoadingSkeleton/>
            </>
        )
    }

    return (
        <div className={styles.myBlogContainer}>
            <div className={styles.myPostsBlock} style={{height: `${712 - isSubtractTextarea}px`}}
                 onScroll={onScrollHandler}>
                {posts.map((item, index) =>
                    <div key={index}>
                        <UserPost userPost={item}/>
                    </div>
                )}
            </div>
            <div className={styles.sendBlock}>
                <InputSend setSubtractTextarea={setSubtractTextarea} setValue={setSendValue} sendHandler={sendHandler}
                           value={isSendValue}/>
            </div>
        </div>
    );
};
