import React, { FC } from 'react';
import styles from "./UserPostContent.module.scss";
import { IconElement } from "../../IconElement/IconElement";
import like from "../../../assets/UI/Likes.svg";
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import share from "../../../assets/UI/Share.svg";

export interface UserPostContentProps {
    icon: string
    name: string
    text: string
    setActiveModal: (boolean: boolean) => void
}

export const UserPostContent:FC<UserPostContentProps> = ({icon, text, name, setActiveModal}) => {
    return (
        <div className={styles.post}>
            <div className={styles.informationPostBlock}>
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
                <IconElement image={like} count={20}/>
                <IconElement image={comments} count={10} onClick={() => setActiveModal(true)}/>
                <IconElement image={reposts} count={2}/>
                <IconElement image={share}/>
            </div>
        </div>
    );
};