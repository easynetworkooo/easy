import React, { FC, useState } from 'react';
import styles from './ProjectPostContent.module.scss'
import { Indicator } from "../../Indicator/Indicator";
import { IconElement } from "../../IconElement/IconElement";
import like from "../../../assets/UI/Likes.svg";
import comments from "../../../assets/UI/Comments.svg";
import reposts from "../../../assets/UI/Repost.svg";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../../constants/nameRoutesConsts";
import { IndicatorStatus } from "../../IndicatorStatus/IndicatorStatus";
import likeActive from "../../../assets/UI/LikesActive.svg";


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

    const [isLiked, setLiked] = useState(false)
    const [isCountLikes, setCountLikes] = useState(30)

    const setLikedHandle = () => {
        if (isLiked) {
            setCountLikes(isCountLikes - 1)
        } else {
            setCountLikes(isCountLikes + 1)
        }
        setLiked(!isLiked)
    }

    return (
        <div className={styles.projectPost}>
            <div className={styles.informationProjectPostBlock} onClick={() => navigate(`${PROJECTS}/test` )}>
                <div className={styles.avatarProjectPostCreator}>
                    <img src={icon} alt="postCreator"/>
                </div>
                <div className={styles.nameBlock}>
                    <div className={styles.name}>
                        <span>{name}</span>
                        <span className={styles.projectIndicator}>Project</span>
                    </div>
                    <span className={styles.timePosted}>3 minutes ago</span>
                </div>
                <div className={styles.indicatorBlock}>
                    <IndicatorStatus type={'Sale Live'}/>
                    <Indicator currentCount={currentCount} maxCount={maxCount} type={'Sale Live'}/>
                </div>
            </div>
            <div className={styles.textProjectPostBlock}>
                <p>{text}</p>
            </div>
            <div className={styles.iconsProjectPostBlock}>
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
                <IconElement image={comments} count={20} onClick={() => setActiveModal(true)} type="normal"/>
                <IconElement image={reposts} count={10} type="normal"/>
            </div>
        </div>
    );
};
