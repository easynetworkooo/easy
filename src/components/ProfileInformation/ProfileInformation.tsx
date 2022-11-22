import React, { useState } from 'react';
import styles from './ProfileInformation.module.scss'
import { AvatarChangeModal, Button, IconElement } from "../../components-ui";
import { MenuItem } from "./MenuItem/MenuItem";
import { AUTH, COMMUNITY, CREATE_PROJECT, MESSAGES, WALLET } from "../../constants/nameRoutesConsts";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/AuthService";
import { authSlice } from "../../store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import defaultAvatar from '../../assets/Profile/Default-avatar.svg'
import changeAvatarImage from '../../assets/Profile/ChangeAvatar.svg'
import like from '../../assets/Profile/Like.svg'
import repost from '../../assets/Profile/Repost.svg'
import view from '../../assets/Profile/View.svg'
import messages from '../../assets/Profile/Messages.svg'
import activeMessages from '../../assets/Profile/ActiveMessages.svg'
import community from '../../assets/Profile/Community.svg'
import activeCommunity from '../../assets/Profile/ActiveCommunity.svg'
import wallet from '../../assets/Profile/Wallet.svg'
import activeWallet from '../../assets/Profile/ActiveWallet.svg'
import { serverURL } from "../../constants/serverURL";

export const ProfileInformation = () => {

    const [isActiveModalChangeAvatar, setActiveModalChangeAvatar] = useState(false)

    const {logoutReducer} = authSlice.actions
    const {name, img, likes, reposts, views} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [logout] = authAPI.useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logout('').then(() => localStorage.removeItem('auth'))
            dispatch(logoutReducer())
            navigate(AUTH)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.profileBlock}>
            <div className={styles.profile}>
                <div className={styles.profileAvatarBlock} onClick={() => setActiveModalChangeAvatar(true)}>
                    <div className={styles.profileAvatarHoverToUpload} style={isActiveModalChangeAvatar ? {opacity: '0.7'} : undefined}>
                        <img src={changeAvatarImage} alt="avatarChange"/>
                    </div>
                    <img src={img ? `${serverURL}${img}` : defaultAvatar} alt="avatar"/>
                </div>
                <div className={styles.profileName}>
                    <h2>{name}</h2>
                </div>
                <div className={styles.profileElements}>
                    <IconElement image={like} count={likes} type={'light'}/>
                    <IconElement image={repost} count={reposts} type={'light'}/>
                    <IconElement image={view} count={views} type={'light'}/>
                </div>
            </div>
            <div className={styles.menuLinksProfile}>
                <MenuItem image={messages} countNotification={100} menuText={'Messages'} to={MESSAGES}
                          activeImage={activeMessages}/>
                <MenuItem image={community} countNotification={2} menuText={'My Community'} to={COMMUNITY}
                          activeImage={activeCommunity}/>
                <MenuItem image={wallet} menuText={'Wallet'} to={WALLET} activeImage={activeWallet}/>
            </div>
            <div className={styles.buttonCreateProject}>
                <Button onClick={() => navigate(CREATE_PROJECT)}>
                    <span>Create Project</span>
                </Button>
            </div>
            <div className={styles.walletConnection}>
                <span>Wallet not connected</span>
            </div>
            <div className={styles.logout} onClick={logoutHandler}>
                <span>Logout</span>
            </div>
            <AvatarChangeModal isActiveModalChange={isActiveModalChangeAvatar}
                               setActiveModalChange={setActiveModalChangeAvatar}/>
        </div>
    );
};
