import React from 'react';
import styles from './ProjectHeader.module.scss'
import projectAvatar from "../../../assets/UI/AvatarProject.png";
import { Button } from "../../../components-ui";
import { USERS } from "../../../constants/nameRoutesConsts";
import creatorAvatar from "../../../assets/UI/AvatarUser.png";
import instagramLink from "../../../assets/UI/InstagramLink.svg";
import telegramLink from "../../../assets/UI/TelegramLink.svg";
import twitterLink from "../../../assets/UI/TwitterLink.svg";
import facebookLink from "../../../assets/UI/FacebookLink.svg";
import networkLink from "../../../assets/UI/NetworkLink.svg";
import { useNavigate } from "react-router-dom";

export const ProjectHeader = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.projectHeaderBlock}>
            <div className={styles.projectAvatar}>
                <img src={projectAvatar} alt="projectAvatar"/>
            </div>
            <div className={styles.subsBlock}>
                <span className={styles.subs}>254 subscribers</span>
                <Button buttonColor={"clearButton"}>
                    <span className={styles.btnText}>Subscribe</span>
                </Button>
            </div>
            <div className={styles.creatorProjectBlock} onClick={() => navigate(`${USERS}/st.koryk`)}>
                <div className={styles.creator}>
                    <div className={styles.creatorAvatar}>
                        <img src={creatorAvatar} alt="creatorAvatar"/>
                    </div>
                    <div className={styles.creatorName}>
                        <span className={styles.role}>Creator</span>
                        <span>Darlene Robertson</span>
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
