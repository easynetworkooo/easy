import React from 'react';
import styles from './Comment.module.scss'
import avatar from '../../../assets/UI/AvatarProject.png'
import likes from '../../../assets/UI/Likes.svg'
import { IconElement } from "../../IconElement/IconElement";

export const Comment = () => {
    return (
        <div className={styles.commentBlock}>
            <div className={styles.headerInformation}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="commentImage"/>
                </div>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>Robert Fox</span>
                    <span className={styles.timeCreated}>3 minutes ago</span>
                </div>
            </div>
            <div className={styles.commentText}>
                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt
                    mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
                    voluptate aute id deserunt nisi.</p>
            </div>
            <div className={styles.actionComment}>
                <IconElement image={likes} count={10}/>
            </div>
        </div>
    );
};