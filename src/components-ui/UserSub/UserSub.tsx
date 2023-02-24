import React, { FC } from 'react';
import styles from './UserSub.module.scss'
import defaultAvatar from '../../assets/Profile/Default-avatar.svg'
import { Link } from "react-router-dom";
import { USERS } from "../../constants/nameRoutesConsts";
import { IUserValue } from "../../models/IUser";
import { serverURL } from "../../constants/serverURL";

export interface UserSubProps {
    dataSub: IUserValue
}

export const UserSub: FC<UserSubProps> = ({dataSub}) => {


    return (
        <Link to={`${USERS}/${dataSub.name}`} className={styles.userSubBlock} target='_blank'>
            <div className={styles.avatar}>
                <img src={dataSub.img ? `${serverURL}${dataSub.img}` : defaultAvatar} alt="avatar"/>
            </div>
            <div className={styles.nameBlock}>
                <span className={styles.name}>{dataSub.name}</span>
                <span className={styles.country}>{dataSub.country}, {dataSub.city}</span>
            </div>
            <div className={styles.skillsBlock}>
                {JSON.parse(dataSub.interests).map((item: string) => <span className={styles.skill}>{item}</span>)}
            </div>
        </Link>
    );
};
