import React, { FC, useEffect, useState } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import { Text } from "../../Text/Text";
import { createPhotos } from "../../../helpers/photos";
import PhotoAlbum, { Photo } from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { DeletePostModal } from "../../DeletePostModal/DeletePostModal";
import { Avatar } from "../../Avatar/Avatar";
import { RepostModal } from "../../RepostModal/RepostModal";
import like from "../../../assets/UI/Likes.svg";
import likeActive from '../../../assets/UI/LikesActive.svg'
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import deleteBasket from '../../../assets/UI/DeletePostBasket.svg'
import deleteBasketHover from '../../../assets/UI/DeleteBasketHover.svg'
import { Link, useLocation } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";
import { IOwner, IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { serverURL } from "../../../constants/serverURL";
import { useAppSelector } from "../../../hooks/redux";
import { convertTime } from "../../../helpers/convertTime";
import { defaultColor } from "../../../constants/colors";

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
                                                              setCountLikes,
                                                          }) => {

    const activeUserId = useAppSelector(state => state.userReducer.id)

    const [isActiveRepostModal, setActiveRepostModal] = useState(false)
    const [isActiveDeleteModal, setActiveDeleteModal] = useState(false)
    const [isOwner, setOwner] = useState<IOwner>(initialOwner)
    const [isShowBasket, setShowBasket] = useState(false)
    const [isHoverBasket, setHoverBasket] = useState(false)

    const [photos, setPhotos] = useState<Photo[]>([])
    const [slides, setSlides] = useState<Slide[]>([])
    const [slideIndex, setSlideIndex] = useState(-1)

    const [setLikeToPost] = postAPI.useSetLikeToPostMutation()
    const [removeLikeToPost] = postAPI.useRemoveLikeToPostMutation()

    const location = useLocation()

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
    useEffect(() => {
        if (userPost.itsrepost) {
            if (typeof userPost.originalowner !== 'number') setOwner(userPost.originalowner)
        } else {
            setOwner(userPost.owner)
        }
    }, [userPost.itsrepost, userPost.originalowner, userPost.owner])


    useEffect(() => {
        setPhotos([])
        if (userPost.imgs.length > 10) {
            const imagesUrls = JSON.parse(userPost.imgs).map((url: string) => `${serverURL}/${url}`)
            createPhotos(imagesUrls).then((photos: Photo[]) => {
                setPhotos(photos)
                setSlides(photos.map(item => ({
                    ...item,
                    description: `${userPost.owner.name} - ${convertTime(userPost.date)}`
                })))
            })
        }
    }, [userPost])

    return (
        <div className={styles.post} onMouseEnter={setShowBasketHandler} onMouseLeave={setShowBasketHandler}>
            {
                location.pathname !== `${USERS}/${isOwner.name}`
                    ?
                    <Link className={styles.avatarPostCreatorLink} to={`${USERS}/${isOwner.name}`} target="_blank"
                          rel="noopener noreferrer">
                        <Avatar img={isOwner.img ? `${serverURL}${isOwner.img}` : null} name={isOwner.name}
                                color={isOwner.color} fontSize={24}/>
                    </Link>
                    :
                    <div className={styles.avatarPostCreator}>
                        <Avatar img={isOwner.img ? `${serverURL}${isOwner.img}` : null} name={isOwner.name}
                                color={isOwner.color} fontSize={24}/>
                    </div>
            }

            <div className={styles.mainPostInformation}>
                <div className={styles.userInformation}>
                    {
                        location.pathname !== `${USERS}/${isOwner.name}`
                            ?
                            <Link to={`${USERS}/${isOwner.name}`} target="_blank" rel="noopener noreferrer"
                                  className={styles.nameLink}>{isOwner.name}</Link>
                            :
                            <span className={styles.name}>{isOwner.name}</span>
                    }

                    <span className={styles.dot}>&#183;</span>
                    <span className={styles.date}>{convertTime(userPost.date)}</span>
                </div>
                <div className={styles.postText}>
                    <Text text={userPost.text}/>
                </div>
                {userPost.imgs.length > 10 &&
                    <div className={styles.gallery}>
                        <PhotoAlbum layout='rows' photos={photos} targetRowHeight={200}
                                    onClick={({index}) => setSlideIndex(index)}
                                    componentsProps={{imageProps: {style: {borderRadius: '10px'}}}}/>
                        <Lightbox
                            styles={{captionsDescription: {fontSize: '24px'}}}
                            slides={slides}
                            open={slideIndex >= 0}
                            index={slideIndex}
                            plugins={[Counter, Thumbnails, Captions]}
                            captions={{showToggle: true, descriptionTextAlign: 'center', descriptionMaxLines: 3}}
                            close={() => setSlideIndex(-1)}
                        />
                    </div>
                }
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
                            {userPost.owner.id === activeUserId ?
                                <span>You retweeted the post {isOwner.name}</span>
                                :
                                <span>Retweeted the post {isOwner.name}</span>
                            }
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

            <RepostModal isActiveRepostModal={isActiveRepostModal} setActiveRepostModal={setActiveRepostModal}
                         postId={userPost.id}/>
            <DeletePostModal isActiveDeleteModal={isActiveDeleteModal} setActiveDeleteModal={setActiveDeleteModal}
                             postId={userPost.id}/>
        </div>
    );
};
