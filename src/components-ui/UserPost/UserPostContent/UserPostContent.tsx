import React, { FC } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import defaultAvatar from "../../../assets/Profile/Default-avatar.svg";
import like from "../../../assets/UI/Likes.svg";
import likeActive from '../../../assets/UI/LikesActive.svg'
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import share from "../../../assets/UI/Share.svg";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";

export interface UserPostContentProps {
    userPost: IPost
    setActiveModalComments: (active: boolean) => void
    isLiked: boolean,
    setLiked: (liked: boolean) => void
    isCountLikes: number
    setCountLikes: (countLikes: number) => void
}

export const UserPostContent:FC<UserPostContentProps> = ({setActiveModalComments, userPost, isLiked, setLiked, isCountLikes, setCountLikes}) => {

    const [setLikeToPost] = postAPI.useSetLikeToPostMutation()
    const [removeLikeToPost] = postAPI.useRemoveLikeToPostMutation()

    const navigate = useNavigate()

    const setLikedHandle = async () => {
        const isLikesNull = isCountLikes ? isCountLikes : 0
        if (isLiked) {
            await removeLikeToPost({postid: userPost.id}).then((data: any) => {
                if (data.data.status === 200) setCountLikes(isLikesNull - 1)
            })
        } else {
            await setLikeToPost({postid: userPost.id}).then((data: any) => {
                if (data.data.status === 200) setCountLikes(isLikesNull + 1)
            })
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.post}>
            <div className={styles.informationPostBlock} onClick={() => navigate(`${USERS}/${userPost.owner.id}`)}>
                <div className={styles.avatarPostCreator}>
                    <img src={userPost.owner.img ? `${serverURL}${userPost.owner.img}` : defaultAvatar} alt="postCreator"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>{userPost.owner.name}</span>
                    <span className={styles.timePosted}>{userPost.date}</span>
                </div>
            </div>
            <div className={styles.textPostBlock}>
                <p>{userPost.text}</p>
            </div>
            <div className={styles.iconsPostBlock}>
                {
                    isLiked ?
                        <div onClick={setLikedHandle}>
                            <IconElement image={likeActive} count={isCountLikes} type={'normal'}/>
                        </div>
                        :
                        <div onClick={setLikedHandle}>
                            <IconElement image={like} count={isCountLikes} type={'normal'}/>
                        </div>

                }
                <IconElement image={comments} count={userPost.comments} type="normal" onClick={() => setActiveModalComments(false)}/>
                <IconElement image={reposts} count={userPost.reposts} type="normal"/>
                <IconElement image={share}/>
            </div>
        </div>
    );
};