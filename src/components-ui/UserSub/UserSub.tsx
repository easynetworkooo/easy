import React, { FC } from 'react';
import styles from './UserSub.module.scss'
import { Link } from "react-router-dom";
import { USERS } from "../../constants/nameRoutesConsts";
import { IUserValue } from "../../models/IUser";
import { serverURL } from "../../constants/serverURL";
import { Avatar } from "../Avatar/Avatar";
import { defaultSearchParams } from "../FilterItems/FilterItems";

export interface UserSubProps {
    dataSub: IUserValue
    searchParams?: defaultSearchParams
}

export const UserSub: FC<UserSubProps> = ({dataSub, searchParams}) => {

    const highlightFindTextOption = (option: any, findItem: string) => {
        const regex = new RegExp(findItem, 'gi');
        return option.replace(regex, '<span>$&</span>');
    }


    return (
        <Link to={`${USERS}/${dataSub.name}`} className={styles.userSubBlock} target='_blank'>
            <div className={styles.avatar}>
                <Avatar fontSize={24} color={dataSub.color} name={dataSub.name}
                        img={dataSub.img ? `${serverURL}/${dataSub.img}` : null}/>
            </div>
            <div className={styles.nameBlock}>
                {searchParams?.text ?
                    <span className={styles.nameHighlight} dangerouslySetInnerHTML={{__html: highlightFindTextOption(dataSub.name, searchParams.text)}}/>
                    :
                    <span className={styles.name}>{dataSub.name}</span>
                }
                <span className={styles.countryBlock}>
                    {searchParams?.country ?
                        <span className={styles.countryHighlight} dangerouslySetInnerHTML={{__html: highlightFindTextOption(dataSub.country, searchParams.country)}}/>
                        :
                        <span className={styles.country}>{dataSub.country}</span>
                    }
                    <span>, </span>
                    {searchParams?.city ?
                        <span className={styles.countryHighlight} dangerouslySetInnerHTML={{__html: highlightFindTextOption(dataSub.city, searchParams.city)}}/>
                        :
                        <span className={styles.country}>{dataSub.city}</span>
                    }

                </span>
            </div>
            <div className={styles.skillsBlock}>
                {JSON.parse(dataSub.interests).map((item: string, key: number) =>
                    <>
                        {searchParams?.interest === item ?
                            <span className={`${styles.skill} ${styles.highlightSkill}`} key={key} dangerouslySetInnerHTML={{__html: highlightFindTextOption(item, searchParams.interest)}}/>
                            :
                            <span className={styles.skill} key={key}>{item}</span>
                        }

                    </>

                    )}
            </div>
        </Link>
    );
};
