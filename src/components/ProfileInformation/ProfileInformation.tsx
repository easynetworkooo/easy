import React from 'react';
import styles from './ProfileInformation.module.scss'
import { Button, IconElement } from "../../components-ui";
import defaultAvatar from '../../assets/Profile/Default-avatar.png'
import like from '../../assets/Profile/Like.svg'
import repost from '../../assets/Profile/Repost.svg'
import view from '../../assets/Profile/View.svg'
import messages from '../../assets/Profile/Messages.svg'
import activeMessages from '../../assets/Profile/ActiveMessages.svg'
import community from '../../assets/Profile/Community.svg'
import activeCommunity from '../../assets/Profile/ActiveCommunity.svg'
import wallet from '../../assets/Profile/Wallet.svg'
import activeWallet from '../../assets/Profile/ActiveWallet.svg'
import { MenuItem } from "./MenuItem/MenuItem";
import { COMMUNITY, CREATE_PROJECT, MESSAGES, WALLET } from "../../constants/nameRoutesConsts";
import { useNavigate } from "react-router-dom";

export const ProfileInformation = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.profileBlock}>
            <div className={styles.profile}>
                <div className={styles.profileAvatar}>
                    <img src={defaultAvatar} alt="avatar"/>
                </div>
                <div className={styles.profileName}>
                    <h2>Black Jack</h2>
                </div>
                <div className={styles.profileElements}>
                    <IconElement image={like} count={25} type={'light'}/>
                    <IconElement image={repost} count={31} type={'light'}/>
                    <IconElement image={view} count={12} type={'light'}/>
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
        </div>
    );
};