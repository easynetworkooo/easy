import React, { useState } from 'react';
import styles from './MyBlog.module.scss'
import { InputSend, UserPost } from "../../components-ui";
import { postAPI } from "../../services/PostService";
import { useAppSelector } from "../../hooks/redux";



export const MyBlog = () => {
    const {id} = useAppSelector(state => state.userReducer)
    const [createBlogPost] = postAPI.useCreateBlogPostMutation()
    const {data: userPosts, isLoading: isLoadingUserPosts} = postAPI.useFetchAllUserPostsQuery(id.toString())

    const [isSubtractTextarea, setSubtractTextarea] = useState(0)
    const [isSendValue, setSendValue] = useState<string>('')

    const sendHandler = async () => {
        const dataCreatePost : any = await createBlogPost({text: isSendValue})
        if (dataCreatePost.data.status === 200) {
            setSendValue('')
        } else {
            console.log(dataCreatePost.error)
        }
    }

    if (isLoadingUserPosts) {
        return <div>Skeleton</div>
    }

    return (
        <div className={styles.myBlogContainer}>
            <div className={styles.myPostsBlock} style={{height: `${712 - isSubtractTextarea}px`}}>
                {userPosts && userPosts.value.data.map((item, index) =>
                    <div key={index}>
                        <UserPost userPost={item}/>
                    </div>
                )}
            </div>
            <div className={styles.sendBlock}>
                <InputSend setSubtractTextarea={setSubtractTextarea} sendHandler={sendHandler} value={isSendValue} onChange={e => setSendValue(e.target.value)}/>
            </div>
        </div>
    );
};
