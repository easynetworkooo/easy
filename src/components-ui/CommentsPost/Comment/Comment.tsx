import React, { FC, useState } from 'react';
import styles from './Comment.module.scss'
import likeActive from "../../../assets/UI/LikesActive.svg";
import like from "../../../assets/UI/Likes.svg";
import { IconElement } from "../../IconElement/IconElement";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IComment } from "../../../models/IComment";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";
import { convertTime } from "../../../helpers/convertTime";
import { Avatar } from "../../Avatar/Avatar";

export interface CommentProps {
    comment: IComment
}

export const Comment:FC<CommentProps> = ({comment}) => {

    const navigate = useNavigate()
    const [setLikeToComment] = postAPI.useSetLikeToCommentMutation()
    const [removeLikeToComment] = postAPI.useRemoveLikeToCommentMutation()
    const [isLiked, setLiked] = useState<boolean>(comment.liked)

    const setLikedHandle = async () => {
        if (isLiked) {
            await removeLikeToComment({commentid: comment.id})
        } else {
            await setLikeToComment({commentid: comment.id})
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.commentBlock}>
            <div className={styles.avatar}>
                <Avatar img={comment.owner.img ? `${serverURL}${comment.owner.img}` : null} name={comment.owner.name} color={comment.owner.color} fontSize={18}/>
            </div>
            <div className={styles.mainCommentsInformation}>
                <div className={styles.headerInformation} onClick={() => navigate(`${USERS}/${comment.owner.name}`)}>
                    <span className={styles.name}>{comment.owner.name}</span>
                    <span className={styles.dot}>&#183;</span>
                    <span className={styles.date}>{convertTime(comment.date)}</span>
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
        </div>
    );
};
