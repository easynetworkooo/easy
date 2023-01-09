import React, { useEffect, useState } from 'react';
import styles from './MyBlog.module.scss'
import { InputSend, PostLoadingSkeleton, UserPost } from "../../components-ui";
import { postAPI } from "../../services/PostService";
import { useAppSelector } from "../../hooks/redux";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { IPost } from "../../models/IPost";


export const MyBlog = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const [createBlogPost] = postAPI.useCreateBlogPostMutation()
    const [posts, setPosts] = useState<IPost[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isFetching, setFetching] = useState(false)
    const {data: userPosts, isLoading: isLoadingUserPosts} = postAPI.useFetchAllUserPostsQuery({
        userId: id,
        page: currentPage
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
        if (currentPage === 1 && userPosts) {
            setPosts(userPosts.value.data)
        }
        if (userPosts && isFetching && userPosts.value.data.length > 0) {
            setPosts((prevState) => [...prevState, ...userPosts.value.data])
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
