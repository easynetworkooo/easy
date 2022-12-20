import React, { useEffect, useRef, useState } from 'react';
import styles from './ProfileInformation.module.scss'
import { AvatarChangeModal, Button, IconElement } from "../../components-ui";
import { MenuItem } from "./MenuItem/MenuItem";
import { AUTH, COMMUNITY, CREATE_PROJECT, MESSAGES, MY_PROJECTS, WALLET } from "../../constants/nameRoutesConsts";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/AuthService";
import { authSlice } from "../../store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import defaultAvatar from '../../assets/Profile/Default-avatar.svg'
import changeAvatarImage from '../../assets/Profile/ChangeAvatar.svg'
import like from '../../assets/Profile/Like.svg'
import repost from '../../assets/Profile/Repost.svg'
import view from '../../assets/Profile/View.svg'
import messagesImg from '../../assets/Profile/Messages.svg'
import activeMessages from '../../assets/Profile/ActiveMessages.svg'
import community from '../../assets/Profile/Community.svg'
import activeCommunity from '../../assets/Profile/ActiveCommunity.svg'
import wallet from '../../assets/Profile/Wallet.svg'
import activeWallet from '../../assets/Profile/ActiveWallet.svg'
import myProject from '../../assets/Profile/MyProjects.svg'
import myProjectActive from '../../assets/Profile/MyProjectsActive.svg'
import { serverURL } from "../../constants/serverURL";
import { io } from "socket.io-client";

export const ProfileInformation = () => {

    const [isActiveModalChangeAvatar, setActiveModalChangeAvatar] = useState(false)

    const {logoutReducer} = authSlice.actions
    const {name, img} = useAppSelector(state => state.userReducer)
    const {likes, reposts, views} = useAppSelector(state => state.notificationsReducer.main)
    const {messages, subscribers} = useAppSelector(state => state.notificationsReducer.buttons)
    const [isLikes, setLikes] = useState(likes)
    const [isReposts, setReposts] = useState(reposts)
    const [isViews, setViews] = useState(views)
    const dispatch = useAppDispatch()

    const socket = useRef<any>()
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

    useEffect(() => {
        socket.current = io(serverURL, {
            extraHeaders: {
                "Authorization": `${localStorage.getItem('auth')}`
            }
        })

        socket.current.on('mainNotification', (data: any) => {
            console.log(data.type)
            if (data.type === 'addMainLike') {
                setLikes(prev => prev ? prev + 1 : 1)
            }
            if (data.type === 'removeMainLike') {
                setLikes(prev => prev ? prev - 1 : null)
            }
            if (data.type === 'addView') {
                setViews(prev => prev ? prev + 1 : 1)
            }
            if (data.type === 'addRepost') {
                setReposts(prev => prev ? prev + 1 : 1)
            }
        })
    }, [])

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
                    <IconElement image={like} count={isLikes} type={'light'}/>
                    <IconElement image={repost} count={isReposts} type={'light'}/>
                    <IconElement image={view} count={isViews} type={'light'}/>
                </div>
            </div>
            <div className={styles.menuLinksProfile}>
                <MenuItem image={messagesImg} countNotification={messages} menuText={'Messages'} to={MESSAGES}
                          activeImage={activeMessages}/>
                <MenuItem image={community} countNotification={subscribers} menuText={'My Community'} to={COMMUNITY}
                          activeImage={activeCommunity}/>
                <MenuItem image={wallet} menuText={'Wallet'} to={WALLET} activeImage={activeWallet}/>
                <MenuItem image={myProject} menuText={'My Projects'} to={MY_PROJECTS} activeImage={myProjectActive}/>
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
