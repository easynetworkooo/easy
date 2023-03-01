import React, { FC } from 'react';
import styles from './Avatar.module.scss'
import { defaultColor } from "../../constants/colors";


export interface AvatarProps {
    img: string | null,
    color: string
    name: string
    fontSize: number
}

export const Avatar:FC<AvatarProps> = ({img, color, name, fontSize}) => {
    const formatName = (name: string) => {
        if (name) {
            if (name.includes('-')) {
                return name.split('-').reduce((prev, current) => prev + current[0], '')
            } else {
                return name.substring(0, 2)
            }
        }
    }


    return (
        <>
            {img ?
                <div className={styles.avatar}>
                    <img src={img} alt="avatar"/>
                </div>
                :
                <div className={styles.avatar} style={{backgroundImage: `linear-gradient(${color ? color : defaultColor})`}}>
                    <span style={{fontSize: `${fontSize}px`}}>{formatName(name)}</span>
                </div>
            }

        </>

    );
};
