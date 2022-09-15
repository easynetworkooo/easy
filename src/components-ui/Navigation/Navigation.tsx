import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Navigation.module.scss'
import navigationLogo from '../../assets/Navigation/NavigationLogo.png'
import { MY_BLOG, PEOPLE_AND_PROJECTS, SUBSCRIPTIONS } from "../../constants/nameRoutesConsts";

export const Navigation = () => {

    const checkActiveLink = ({isActive} : any) => isActive ? styles.linkActive : styles.link

    return (
        <nav className={styles.navigationBlock}>
            <div className={styles.logoNavigationBlock}>
                <img src={navigationLogo} alt="logo"/>
            </div>
            <div className={styles.itemsNavigationBlock}>
                <div className={styles.itemNavigation}>
                    <NavLink to={PEOPLE_AND_PROJECTS} className={checkActiveLink}>People and Projects</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={SUBSCRIPTIONS} className={checkActiveLink}>Subscriptions</NavLink>
                </div>
                <div className={styles.itemNavigation}>
                    <NavLink to={MY_BLOG} className={checkActiveLink}>My Blog</NavLink>
                </div>
            </div>
        </nav>
    );
};