import React, { FC } from 'react';
import styles from './ProjectPostContent.module.scss'
import { Indicator } from "../../Indicator/Indicator";
import { IconElement } from "../../IconElement/IconElement";
import like from "../../../assets/UI/Likes.svg";
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import share from "../../../assets/UI/Share.svg";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../../constants/nameRoutesConsts";


export interface ProjectPostContentProps {
    icon: string
    name: string
    text: string
    currentCount: number
    maxCount: number
    setActiveModal: (boolean: boolean) => void
}

export const ProjectPostContent: FC<ProjectPostContentProps> = ({icon, name, text, setActiveModal, currentCount, maxCount}) => {

    const navigate = useNavigate()

    return (
        <div className={styles.projectPost}>
            <div className={styles.informationProjectPostBlock}>
                <div className={styles.avatarProjectPostCreator}>
                    <img src={icon} alt="postCreator"/>
                </div>
                <div className={styles.nameBlock}>
                    <div className={styles.name} onClick={() => navigate(`${PROJECTS}/tingram` )}>
                        <span>{name}</span>
                        <span className={styles.projectIndicator}>Project</span>
                    </div>
                    <span className={styles.timePosted}>3 minutes ago</span>
                </div>
                <div className={styles.indicatorBlock}>
                    <div
                        className={currentCount !== maxCount ? styles.statusIndicator : `${styles.statusIndicator} ${styles.statusIndicatorEnded}`}>
                        <span>{currentCount === maxCount ? 'Sale Ended' : 'Sale Live'}</span>
                    </div>
                    <Indicator currentCount={currentCount} maxCount={maxCount}/>
                </div>
            </div>
            <div className={styles.textProjectPostBlock}>
                <p>{text}</p>
            </div>
            <div className={styles.iconsProjectPostBlock}>
                <IconElement image={like} count={30}/>
                <IconElement image={comments} count={20} onClick={() => setActiveModal(true)}/>
                <IconElement image={reposts} count={10}/>
                <IconElement image={share}/>
            </div>
        </div>
    );
};
