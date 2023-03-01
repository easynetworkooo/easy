import React, { FC } from 'react';
import styles from './UserSub.module.scss'
import { Link } from "react-router-dom";
import { USERS } from "../../constants/nameRoutesConsts";
import { IUserValue } from "../../models/IUser";
import { serverURL } from "../../constants/serverURL";
import { Avatar } from "../Avatar/Avatar";

export interface UserSubProps {
    dataSub: IUserValue
}

export const UserSub: FC<UserSubProps> = ({dataSub}) => {

    return (
        <Link to={`${USERS}/${dataSub.name}`} className={styles.userSubBlock} target='_blank'>
            <div className={styles.avatar}>
                <Avatar fontSize={24} color={dataSub.color} name={dataSub.name}
                        img={dataSub.img ? `${serverURL}/${dataSub.img}` : null}/>
            </div>
            <div className={styles.nameBlock}>
                <span className={styles.name}>{dataSub.name}</span>
                <span className={styles.country}>{dataSub.country}, {dataSub.city}</span>
            </div>
            <div className={styles.skillsBlock}>
                {JSON.parse(dataSub.interests).map((item: string) => <span className={styles.skill} key={item}>{item}</span>)}
            </div>
        </Link>
    );
};
