import React, { FC, useEffect, useState } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import like from "../../../assets/UI/Likes.svg";
import likeActive from '../../../assets/UI/LikesActive.svg'
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import deleteBasket from '../../../assets/UI/DeletePostBasket.svg'
import deleteBasketHover from '../../../assets/UI/DeleteBasketHover.svg'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IOwner, IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";
import { RepostModal } from "../../RepostModal/RepostModal";
import { useAppSelector } from "../../../hooks/redux";
import { DeletePostModal } from "../../DeletePostModal/DeletePostModal";
import { convertTime } from "../../../helpers/convertTime";
import { Avatar } from "../../Avatar/Avatar";
import { defaultColor } from "../../../constants/colors";
import { ViewPhotosModal } from "../../ViewPhotosModal/ViewPhotosModal";

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
    img: null,
    color: defaultColor
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
    const [isActivePhotosModal, setActivePhotosModal] = useState(false)
    const [chosenMainPhoto, setChosenMainPhoto] = useState('')
    const [isOwner, setOwner] = useState<IOwner>(initialOwner)
    const [isShowBasket, setShowBasket] = useState(false)
    const [isHoverBasket, setHoverBasket] = useState(false)

    const [setLikeToPost] = postAPI.useSetLikeToPostMutation()
    const [removeLikeToPost] = postAPI.useRemoveLikeToPostMutation()

    const navigate = useNavigate()

    const setShowBasketHandler = () => {
        setShowBasket(state => !state)
    }


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

    const openModalViewPhotos = (mainPhoto: string) => {
        setChosenMainPhoto(mainPhoto)
        setActivePhotosModal(true)
    }

    useEffect(() => {
        if (userPost.itsrepost) {
            if (typeof userPost.originalowner !== 'number') setOwner(userPost.originalowner)
        } else {
            setOwner(userPost.owner)
        }
    }, [userPost.itsrepost, userPost.originalowner, userPost.owner])

    return (
        <div className={styles.post} onMouseEnter={setShowBasketHandler} onMouseLeave={setShowBasketHandler}>
            <div className={styles.avatarPostCreator} onClick={() => navigate(`${USERS}/${isOwner.name}`)}>
                <Avatar img={isOwner.img ? `${serverURL}${isOwner.img}` : null} name={isOwner.name}
                        color={isOwner.color} fontSize={24}/>
            </div>
            <div className={styles.mainPostInformation}>
                <div className={styles.userInformation} onClick={() => navigate(`${USERS}/${isOwner.name}`)}>
                    <span className={styles.name}>{isOwner.name}</span>
                    <span className={styles.dot}>&#183;</span>
                    <span className={styles.date}>{convertTime(userPost.date)}</span>
                </div>
                <div className={styles.postText}>
                    <p>{userPost.text}</p>
                </div>
                <div className={styles.gallery}>
                    {userPost.imgs.length > 10 && JSON.parse(userPost.imgs).map((item: string) =>
                        <div className={styles.item} key={item}>
                            <img src={`${serverURL}${item}`} alt="postImage" className={styles.image}
                                 onClick={() => openModalViewPhotos(item)}/>
                        </div>
                    )}
                </div>
                <div className={styles.actionIcons}>
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
                    {userPost.itsrepost &&
                        <div className={styles.repostInformation}>
                            <img src={reposts} alt=""/>
                            <span>You retweeted the post {isOwner.name}</span>
                        </div>
                    }
                </div>
                {isShowBasket && activeUserId === userPost.owner.id &&
                    <div className={styles.deleteBasketBlock} onMouseMove={() => setHoverBasket(true)}
                         onMouseLeave={() => setHoverBasket(false)}>
                        <img src={isHoverBasket ? deleteBasketHover : deleteBasket} alt="basket"
                             onClick={(e) => openModalDeleteHandler(e)}/>
                    </div>
                }
            </div>

            <ViewPhotosModal isActivePhotosModal={isActivePhotosModal} setMainPhoto={setChosenMainPhoto}
                             setActivePhotosModal={setActivePhotosModal} mainPhoto={chosenMainPhoto}
                             photos={userPost.imgs ? JSON.parse(userPost.imgs) : null}/>
            <RepostModal isActiveRepostModal={isActiveRepostModal} setActiveRepostModal={setActiveRepostModal}
                         postId={userPost.id}/>
            <DeletePostModal isActiveDeleteModal={isActiveDeleteModal} setActiveDeleteModal={setActiveDeleteModal}
                             postId={userPost.id}/>
        </div>
    );
};
