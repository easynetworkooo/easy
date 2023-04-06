import React, { useEffect, useState } from 'react';
import styles from './ProfileInformation.module.scss'
import { Avatar, AvatarChangeModal, Button, IconElement } from "../../components-ui";
import { MenuItem } from "./MenuItem/MenuItem";
import {
    AUTH,
    COMMUNITY, CONTENT,
    CREATE_PROJECT,
    MESSAGES,
    MY_BLOG,
    MY_PROJECTS, USERS,
    WALLET
} from "../../constants/nameRoutesConsts";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/AuthService";
import { authSlice } from "../../store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import changeAvatarImage from '../../assets/Profile/ChangeAvatar.svg'
import like from '../../assets/Profile/Like.svg'
import repost from '../../assets/Profile/Repost.svg'
import view from '../../assets/Profile/View.svg'
import { serverURL } from "../../constants/serverURL";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { ReactComponent as MessagesSvg} from '../../assets/Profile/Messages.svg'
import { ReactComponent as CommunitySvg} from '../../assets/Profile/Community.svg'
import { ReactComponent as MyProjectSvg} from '../../assets/Profile/MyProjects.svg'
import { ReactComponent as BlogSvg } from "../../assets/Profile/Blog.svg";
import { ReactComponent as HomeSvg } from "../../assets/Profile/Home.svg";

export const ProfileInformation = () => {

    const [isActiveModalChangeAvatar, setActiveModalChangeAvatar] = useState(false)

    const {logoutReducer} = authSlice.actions

    const {name, img, color} = useAppSelector(state => state.userReducer)
    const {likes, reposts, views} = useAppSelector(state => state.notificationsReducer.main)
    const {messages, subscribers} = useAppSelector(state => state.notificationsReducer.buttons)
    const socket = useAppSelector(state => state.socketReducer.socket)

    const [isLikes, setLikes] = useState(likes)
    const [isReposts, setReposts] = useState(reposts)
    const [isViews, setViews] = useState(views)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [logout] = authAPI.useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logout('').then(() => {
                localStorage.removeItem('auth')
                dispatch(logoutReducer())
                navigate(AUTH)
                customErrorNotify('You have logged out of your account', 'Success')
            })
        } catch (e: any) {
            customErrorNotify(e, 'Error')
        }
    }

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('mainNotification', (data: any) => {
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
        }

        // eslint-disable-next-line
    }, [socket])

    return (
        <div className={styles.profileBlock}>
            <div className={styles.profile}>
                <div className={styles.profileAvatarBlock}>
                    <div className={styles.profileAvatarHoverToUpload}
                         onClick={() => setActiveModalChangeAvatar(true)}
                         style={isActiveModalChangeAvatar ? {opacity: '1'} : undefined}>
                        <img src={changeAvatarImage} alt="avatarChange"/>
                    </div>
                    <div className={styles.avatarBlock}>
                        <Avatar img={img ? `${serverURL}${img}` : null} name={name} color={color} fontSize={48}/>
                    </div>
                </div>
                <div className={styles.profileName}>
                    <h2 onClick={() => navigate(`${USERS}/${name}`)}>{name}</h2>
                </div>
                <div className={styles.profileElements}>
                    <IconElement image={like} count={isLikes} type={'light'}/>
                    <IconElement image={repost} count={isReposts} type={'light'}/>
                    <IconElement image={view} count={isViews} type={'light'}/>
                </div>
            </div>
            <div className={styles.menuLinksProfile}>
                <MenuItem Image={HomeSvg} menuText={'Main'} to={CONTENT}/>
                <MenuItem Image={BlogSvg} menuText={'My Blog'} to={MY_BLOG}/>
                <MenuItem Image={MessagesSvg} countNotification={messages} menuText={'Messages'} to={MESSAGES}/>
                <MenuItem Image={CommunitySvg} countNotification={subscribers} menuText={'Subscribers'} to={COMMUNITY}/>
                <MenuItem Image={MyProjectSvg} menuText={'Projects'} to={MY_PROJECTS}/>
            </div>
            <div className={styles.buttonCreateProject}>
                <Button onClick={() => navigate(CREATE_PROJECT)}>
                    <span>Create Project</span>
                </Button>
            </div>
            <div className={styles.buttonCreateProject}>
                <Button onClick={() => navigate(WALLET)}>
                    <span>Connect wallet</span>
                </Button>
            </div>
            <div className={styles.logout}>
                <Button buttonColor='clearButton' onClick={logoutHandler}>
                    <span>Logout</span>
                </Button>
            </div>
            <AvatarChangeModal isActiveModalChange={isActiveModalChangeAvatar}
                               setActiveModalChange={setActiveModalChangeAvatar}/>
        </div>
    );
};
