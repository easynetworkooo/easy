import React, { FC, useState } from 'react';
import styles from './MenuItem.module.scss'
import { Link, useMatch } from "react-router-dom";

export interface MenuItemProps {
    image: string
    activeImage: string
    to: string
    menuText: string
    countNotification?: number
}

export const MenuItem: FC<MenuItemProps> = ({image, activeImage, to, menuText, countNotification = 0}) => {
    const match = useMatch(to)

    const [isHoverImage, setHoverImage] = useState(false)

    const onActiveImageHover = () => {
        setHoverImage(state => !state)
    }


    return (
        <Link to={to}>
            <div className={`${styles.menuItem} ${match && styles.menuItemActive}`} onMouseEnter={onActiveImageHover} onMouseLeave={onActiveImageHover}>
                <div className={styles.menuImage}>
                    <img src={match || isHoverImage ? activeImage : image} alt={`${image}`}/>
                </div>
                <div className={match ? styles.menuTextActive : styles.menuText}>
                    <span>{menuText}</span>
                </div>
                {countNotification !== 0 &&
                    <div className={styles.menuCountNotifications}>
                        <span>{countNotification}</span>
                    </div>
                }
            </div>
        </Link>
    );
};
