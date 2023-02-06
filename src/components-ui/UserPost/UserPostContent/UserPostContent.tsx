import React, { FC, useEffect, useState } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import defaultAvatar from "../../../assets/Profile/Default-avatar.svg";
import like from "../../../assets/UI/Likes.svg";
import likeActive from '../../../assets/UI/LikesActive.svg'
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import deleteBasket from '../../../assets/UI/DeletePostBasket.png'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IOwner, IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";
import { RepostModal } from "../../RepostModal/RepostModal";
import { useAppSelector } from "../../../hooks/redux";
import { DeletePostModal } from "../../DeletePostModal/DeletePostModal";

export interface UserPostContentProps {
    userPost: IPost
    setActiveModalComments: any
    isLiked: boolean,
    setLiked: (liked: boolean) => void
    isCountLikes: number
    setCountLikes: (countLikes: number) => void
}

const initialOwner: IOwner = {
    id: 0,
    email: "",
    name: "",
    img: null
}

export const UserPostContent: FC<UserPostContentProps> = ({
                                                              setActiveModalComments,
                                                              userPost,
                                                              isLiked,
                                                              setLiked,
                                                              isCountLikes,
                                                              setCountLikes
                                                          }) => {

    const activeUserId = useAppSelector(state => state.userReducer.id)

    const [isActiveRepostModal, setActiveRepostModal] = useState(false)
    const [isActiveDeleteModal, setActiveDeleteModal] = useState(false)
    const [isOwner, setOwner] = useState<IOwner>(initialOwner)

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

    const openModalDeleteHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setActiveDeleteModal(true)
    }

    useEffect(() => {
        if (userPost.itsrepost) {
            if (typeof userPost.originalowner !== 'number') setOwner(userPost.originalowner)
        } else {
           setOwner(userPost.owner)
        }
    }, [userPost.itsrepost, userPost.originalowner, userPost.owner])


    return (
        <div className={styles.post}>
            <div className={styles.informationPostBlock} onClick={() => navigate(`${USERS}/${isOwner.name}`)}>
                <div className={styles.avatarPostCreator}>
                    <img src={isOwner.img ? `${serverURL}${isOwner.img}` : defaultAvatar}
                         alt="postCreator"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>{isOwner.name}</span>
                    <span className={styles.timePosted}>{userPost.date}</span>
                </div>
                {activeUserId === userPost.owner.id &&
                    <div className={styles.deleteBasketBlock}>
                        <img src={deleteBasket} alt="basket" onClick={(e) => openModalDeleteHandler(e)}/>
                    </div>
                }
            </div>
            <div className={styles.textPostBlock}>
                <p>{userPost.text}</p>
            </div>
            <div className={styles.iconsPostBlock}>
                {userPost.itsrepost &&
                    <div className={styles.repostInformation}>
                        <img src={reposts} alt=""/>
                        <span>You retweeted the post {isOwner.name}</span>
                    </div>
                }
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
                <IconElement image={comments} count={userPost.comments} type="normal"
                             onClick={() => setActiveModalComments((prevState: any) => !prevState)}/>
                <IconElement image={reposts} count={userPost.reposts} type="normal"
                             onClick={() => {
                                 if (activeUserId !== userPost.owner.id) setActiveRepostModal(prevState => !prevState)
                             }}/>
            </div>
            <RepostModal isActiveRepostModal={isActiveRepostModal} setActiveRepostModal={setActiveRepostModal}
                         postId={userPost.id}/>
            <DeletePostModal isActiveDeleteModal={isActiveDeleteModal} setActiveDeleteModal={setActiveDeleteModal}
                             postId={userPost.id}/>
        </div>
    );
};
