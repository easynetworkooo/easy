import React, { ChangeEvent } from 'react';
import styles from './ProfileInformation.module.scss'
import { Button, IconElement } from "../../components-ui";
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
import { userAPI } from "../../services/UserService";
import { userSlice } from "../../store/reducers/UserSlice";

export const ProfileInformation = () => {
    const {logoutReducer} = authSlice.actions
    const {setAvatarReducer} = userSlice.actions
    const {name, img, likes, reposts, views} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [logout] = authAPI.useLogoutMutation()
    const [setMainAvatar] = userAPI.useSetMainAvatarMutation()
    const [getProfile] = userAPI.useFetchUserProfileMutation()

    const logoutHandler = async () => {
        try {
            await logout('').then(() => localStorage.removeItem('auth'))
            dispatch(logoutReducer())
            navigate(AUTH)
        } catch (e) {
            console.log(e)
        }
    }

    const changeAvatarHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        if (event.target.files !== null) {
            formData.append('img', event.target.files[0])
        }

        await setMainAvatar(formData)
        await getProfile('').then((user: any) => dispatch(setAvatarReducer({img: user.data.value.img})))

    }

    return (
        <div className={styles.profileBlock}>
            <div className={styles.profile}>
                <div className={styles.profileAvatarBlock}>
                    <label htmlFor="exampleInput">
                        <div className={styles.profileAvatarHoverToUpload}>
                            <img src={changeAvatarImage} alt="avatarChange"/>
                        </div>
                    </label>
                    <img src={img ? `${serverURL}${img}` : defaultAvatar} alt="avatar"/>
                    <input type="file" id="exampleInput" style={{display: "none"}}
                           accept=".png, .jpg, .jpeg, .gif, .pjpeg, .webp" onChange={e => changeAvatarHandler(e)}/>
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
        </div>
    );
};