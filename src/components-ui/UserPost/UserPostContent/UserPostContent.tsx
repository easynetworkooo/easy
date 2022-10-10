import React, { FC, useState } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import like from "../../../assets/UI/Likes.svg";
import likeActive from '../../../assets/UI/LikesActive.svg'
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import share from "../../../assets/UI/Share.svg";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";

export interface UserPostContentProps {
    icon: string
    name: string
    text: string
    setActiveModal: (boolean: boolean) => void
}

export const UserPostContent:FC<UserPostContentProps> = ({icon, text, name, setActiveModal}) => {

    const navigate = useNavigate()

    const [isLiked, setLiked] = useState(false)
    const [isCountLikes, setCountLikes] = useState(20)

    const setLikedHandle = () => {
        if (isLiked) {
            setCountLikes(isCountLikes - 1)
        } else {
            setCountLikes(isCountLikes + 1)
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.post}>
            <div className={styles.informationPostBlock} onClick={() => navigate(`${USERS}/st.koryk`)}>
                <div className={styles.avatarPostCreator}>
                    <img src={icon} alt="postCreator"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.timePosted}>3 minutes ago</span>
                </div>
            </div>
            <div className={styles.textPostBlock}>
                <p>{text}</p>
            </div>
            <div className={styles.iconsPostBlock}>
                {
                    isLiked ?
                        <div onClick={setLikedHandle}>
                            <IconElement image={likeActive} count={isCountLikes} type={'likes'}/>
                        </div>
                        :
                        <div onClick={setLikedHandle}>
                            <IconElement image={like} count={isCountLikes}/>
                        </div>

                }
                <IconElement image={comments} count={10} onClick={() => setActiveModal(true)}/>
                <IconElement image={reposts} count={2}/>
                <IconElement image={share}/>
            </div>
        </div>
    );
};