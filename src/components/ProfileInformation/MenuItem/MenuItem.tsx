import React, { FC } from 'react';
import styles from './MenuItem.module.scss'
import { Link, useMatch } from "react-router-dom";

export interface MenuItemProps {
    Image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    to: string
    menuText: string
    countNotification?: number
}

export const MenuItem: FC<MenuItemProps> = ({Image, to, menuText, countNotification = 0}) => {
    const match = useMatch(to)

    return (
        <Link to={to}>
            <div className={`${styles.menuItem} ${match && styles.menuItemActive}`}>
                <div className={styles.menuImage}>
                    {match ?
                        <Image className={styles.activeImage} stroke='current'/>
                        :
                        <Image className={styles.image}/>
                    }
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
