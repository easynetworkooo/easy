import React, { FC } from 'react';
import styles from './UserSub.module.scss'
import defaultAvatar from '../../assets/Profile/Default-avatar.svg'
import { useNavigate } from "react-router-dom";
import { USERS } from "../../constants/nameRoutesConsts";
import { IUserValue } from "../../models/IUser";

export interface UserSubProps {
    dataSub: IUserValue
}

export const UserSub:FC<UserSubProps> = ({dataSub}) => {

    const navigate = useNavigate()

    return (
        <div className={styles.userSubBlock} onClick={() => navigate(`${USERS}/${dataSub.id}`)}>
            <div className={styles.avatar}>
                <img src={dataSub.img ? dataSub.img : defaultAvatar} alt="avatar"/>
            </div>
            <div className={styles.nameBlock}>
                <span className={styles.name}>{dataSub.name}</span>
                <span className={styles.lastActivity}>{dataSub.regdate}</span>
            </div>
        </div>
    );
};