import React, { FC, useState } from 'react';
import styles from './UserPost.module.scss'
import { UserPostContent } from "./UserPostContent/UserPostContent";
import { Modal } from "../Modal/Modal";
import { CommentsPost } from "../CommentsPost/CommentsPost";
import { InputSend } from "../InputSend/InputSend";
import { IPost } from "../../models/IPost";
import { postAPI } from "../../services/PostService";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { CommentsModal } from "./CommentsModal/CommentsModal";


export interface UserPostProps {
    userPost: IPost
}

export const UserPost: FC<UserPostProps> = ({userPost}) => {

    const [isActiveModal, setActiveModal] = useState(false)
    const [isLiked, setLiked] = useState(userPost.liked)
    const [isCountLikes, setCountLikes] = useState<any>(userPost.likes)

    return (
        <>
            <UserPostContent setActiveModalComments={setActiveModal} userPost={userPost} isLiked={isLiked}
                             setLiked={setLiked} isCountLikes={isCountLikes} setCountLikes={setCountLikes}/>
            <CommentsModal setActiveModal={setActiveModal} isActiveModal={isActiveModal} userPost={userPost}
                           UserPostContent={<UserPostContent setActiveModalComments={setActiveModal}
                                                             userPost={userPost} isLiked={isLiked}
                                                             setLiked={setLiked} isCountLikes={isCountLikes}
                                                             setCountLikes={setCountLikes}/>}/>
        </>
    );
};
