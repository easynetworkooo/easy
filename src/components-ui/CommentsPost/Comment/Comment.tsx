import React, { useState } from 'react';
import styles from './Comment.module.scss'
import avatar from '../../../assets/UI/AvatarProject.png'
import likeActive from "../../../assets/UI/LikesActive.svg";
import like from "../../../assets/UI/Likes.svg";
import { IconElement } from "../../IconElement/IconElement";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../../constants/nameRoutesConsts";

export const Comment = () => {

    const navigate = useNavigate()

    const [isLiked, setLiked] = useState(false)
    const [isCountLikes, setCountLikes] = useState(2)

    const setLikedHandle = () => {
        if (isLiked) {
            setCountLikes(isCountLikes - 1)
        } else {
            setCountLikes(isCountLikes + 1)
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.commentBlock}>
            <div className={styles.headerInformation} onClick={() => navigate(`${USERS}/st.koryk`)}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="commentImage"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>Robert Fox</span>
                    <span className={styles.timeCreated}>3 minutes ago</span>
                </div>
            </div>
            <div className={styles.commentText}>
                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
            </div>
            <div className={styles.actionComment}>
                {
                    isLiked ?
                        <div onClick={setLikedHandle}>
                            <IconElement image={likeActive} count={isCountLikes} type="normal"/>
                        </div>
                        :
                        <div onClick={setLikedHandle}>
                            <IconElement image={like} count={isCountLikes} type="normal"/>
                        </div>

                }
            </div>
        </div>
    );
};