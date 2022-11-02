import React, { FC, useState } from 'react';
import styles from './UserPost.module.scss'
import { UserPostContent } from "./UserPostContent/UserPostContent";
import { Modal } from "../Modal/Modal";
import { CommentsPost } from "../CommentsPost/CommentsPost";
import { InputSend } from "../InputSend/InputSend";
import { IPost } from "../../models/IPost";
import { postAPI } from "../../services/PostService";


export interface UserPostProps {
    userPost: IPost
}

export const UserPost: FC<UserPostProps> = ({userPost}) => {

    const [isActiveModal, setActiveModal] = useState(false)
    const [isSubtractTextarea, setSubtractTextarea] = useState(0)
    const [isValueSend, setValueSend] = useState<string>('')
    const [isLiked, setLiked] = useState(userPost.liked)
    const [isCountLikes, setCountLikes] = useState<any>(userPost.likes)

    const [setCommentToPost] = postAPI.useSetCommentToPostMutation()

    const setCommentHandler = async () => {
        await setCommentToPost({postid: userPost.id, text: isValueSend}).then((data:any) => {
            if (data.data.status === 200) {
                setValueSend('')
            }
        })
    }

    return (
        <>
            <UserPostContent setActiveModal={setActiveModal} userPost={userPost} isLiked={isLiked} setLiked={setLiked} isCountLikes={isCountLikes} setCountLikes={setCountLikes}/>
            <Modal active={isActiveModal} setActive={setActiveModal}>
                <div className={styles.modalContent}>
                    <UserPostContent setActiveModal={setActiveModal} userPost={userPost} isLiked={isLiked} setLiked={setLiked} isCountLikes={isCountLikes} setCountLikes={setCountLikes}/>
                    <div className={styles.comments}>
                        <CommentsPost isSubtractTextarea={isSubtractTextarea}/>
                    </div>
                    <div className={styles.sendBlock}>
                        <InputSend setSubtractTextarea={setSubtractTextarea} value={isValueSend}
                                   onChange={e => setValueSend(e.target.value)} sendHandler={setCommentHandler}/>
                    </div>
                </div>
            </Modal>
        </>
    );
};