import React from 'react';
import styles from './UserSub.module.scss'
import avatar from '../../assets/UI/AvatarUser.png'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../constants/nameRoutesConsts";

export const UserSub = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.userSubBlock} onClick={() => navigate(`${USERS}/st.koryk`)}>
            <div className={styles.avatar}>
                <img src={avatar} alt="avatar"/>
            </div>
            <div className={styles.nameBlock}>
                <span className={styles.name}>Darlene Robertson</span>
                <span className={styles.lastActivity}>3 minutes ago</span>
            </div>
        </div>
    );
};