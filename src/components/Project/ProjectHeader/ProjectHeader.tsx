import React from 'react';
import styles from './ProjectHeader.module.scss'
import projectAvatar from "../../../assets/UI/AvatarProject.png";
import { Button, ButtonBack, IconElement } from "../../../components-ui";
import { USERS } from "../../../constants/nameRoutesConsts";
import creatorAvatar from "../../../assets/UI/AvatarUser.png";
import instagramLink from "../../../assets/UI/InstagramLink.svg";
import telegramLink from "../../../assets/UI/TelegramLink.svg";
import twitterLink from "../../../assets/UI/TwitterLink.svg";
import facebookLink from "../../../assets/UI/FacebookLink.svg";
import networkLink from "../../../assets/UI/NetworkLink.svg";
import { useNavigate } from "react-router-dom";
import likes from "../../../assets/Profile/Like.svg";
import reposts from "../../../assets/Profile/Repost.svg";
import views from "../../../assets/Profile/View.svg";

export const ProjectHeader = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.projectHeaderBlock}>
            <div className={styles.projectAvatarBlock}>
                <ButtonBack/>
                <img src={projectAvatar} className={styles.projectAvatar} alt="projectAvatar"/>
            </div>
            <div className={styles.subsBlock}>
                <div className={styles.nameBlock}>
                    <span className={styles.name}>Tingram</span>
                    <div className={styles.projectBlock}>
                        <span>Project</span>
                    </div>
                </div>
                <span className={styles.subs}>254 subscribers</span>
                <Button buttonColor={"clearButton"}>
                    <span className={styles.btnText}>Subscribe</span>
                </Button>
            </div>
            <div className={styles.creatorProjectBlock} onClick={() => navigate(`${USERS}/st.koryk`)}>
                <div className={styles.creator}>
                    <div className={styles.actionsAndCreatorBlock}>
                        <div className={styles.actionsList}>
                            <IconElement image={likes} count={22} type={'textLight'}/>
                            <IconElement image={reposts} count={22} type={'textLight'}/>
                            <IconElement image={views} count={22} type={'textLight'}/>
                        </div>
                        <div className={styles.creatorAvatar}>
                            <img src={creatorAvatar} alt="creatorAvatar"/>
                            <div className={styles.creatorName}>
                                <span className={styles.role}>Creator</span>
                                <span>Darlene Robertson</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.projectSocialLinksBlock}>
                <a className={styles.projectSocialLink} href={'https://www.instagram.com/'} target={'_blank'} rel="noreferrer">
                    <img src={instagramLink} alt="instagram"/>
                </a>
                <a className={styles.projectSocialLink} href={'https://www.instagram.com/'} target={'_blank'} rel="noreferrer">
                    <img src={telegramLink} alt="telegram"/>
                </a>
                <a className={styles.projectSocialLink} href={'https://www.instagram.com/'} target={'_blank'} rel="noreferrer">
                    <img src={twitterLink} alt="twitter"/>
                </a>
                <a className={styles.projectSocialLink} href={'https://www.instagram.com/'} target={'_blank'} rel="noreferrer">
                    <img src={facebookLink} alt="facebook"/>
                </a>
                <a className={styles.projectSocialLink} href={'https://www.instagram.com/'} target={'_blank'} rel="noreferrer">
                    <img src={networkLink} alt="network"/>
                </a>
            </div>
        </div>
    );
};
