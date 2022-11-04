import React, { FC, useState } from 'react';
import styles from './Comment.module.scss'
import defaultAvatar from '../../../assets/Profile/Default-avatar.svg'
import likeActive from "../../../assets/UI/LikesActive.svg";
import like from "../../../assets/UI/Likes.svg";
import { IconElement } from "../../IconElement/IconElement";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IComment } from "../../../models/IComment";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";

export interface CommentProps {
    comment: IComment
    fetchPostCommentsHandler: () => void
}

export const Comment:FC<CommentProps> = ({comment, fetchPostCommentsHandler}) => {

    const navigate = useNavigate()
    const [setLikeToComment] = postAPI.useSetLikeToCommentMutation()
    const [removeLikeToComment] = postAPI.useRemoveLikeToCommentMutation()
    const [isLiked, setLiked] = useState<boolean>(comment.liked)

    const setLikedHandle = async () => {
        if (isLiked) {
            await removeLikeToComment({commentid: comment.id})
            await fetchPostCommentsHandler()
        } else {
            await setLikeToComment({commentid: comment.id})
            await fetchPostCommentsHandler()
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.commentBlock}>
            <div className={styles.headerInformation} onClick={() => navigate(`${USERS}/${comment.owner.id}`)}>
                <div className={styles.avatar}>
                    <img src={comment.owner.img ? `${serverURL}${comment.owner.img}` : defaultAvatar} alt="commentImage"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>{comment.owner.name}</span>
                    <span className={styles.timeCreated}>{comment.date}</span>
                </div>
            </div>
            <div className={styles.commentText}>
                <p>{comment.text}</p>
            </div>
            <div className={styles.actionComment}>
                {
                    isLiked ?
                        <div onClick={setLikedHandle}>
                            <IconElement image={likeActive} count={comment.likes} type="normal"/>
                        </div>
                        :
                        <div onClick={setLikedHandle}>
                            <IconElement image={like} count={comment.likes} type="normal"/>
                        </div>

                }
            </div>
        </div>
    );
};