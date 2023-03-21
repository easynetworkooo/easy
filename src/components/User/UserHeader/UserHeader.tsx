import React, { FC, useEffect, useState } from 'react';
import styles from './UserHeader.module.scss'
import { Avatar, Button, ButtonBack, IconElement, ViewPhotosModal } from "../../../components-ui";
import likes from "../../../assets/Profile/Like.svg";
import reposts from "../../../assets/Profile/Repost.svg";
import views from "../../../assets/Profile/View.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { MESSAGES } from "../../../constants/nameRoutesConsts";
import { userAPI } from "../../../services/UserService";
import { IUserValue } from "../../../models/IUser";
import { useAppSelector } from "../../../hooks/redux";
import { serverURL } from "../../../constants/serverURL";


export interface UserHeaderProps {
    isUserData: IUserValue
}

export const UserHeader: FC<UserHeaderProps> = ({isUserData}) => {

    const navigate = useNavigate()

    const {id} = useAppSelector(state => state.userReducer)

    const [isActivePhotoModal, setActivePhotoModal] = useState(false)
    const [mainPhoto, setMainPhoto] = useState('')

    const [subscribeToUser] = userAPI.useSubscribeToUserMutation()
    const [unSubscribeToUser] = userAPI.useUnSubscribeToUserMutation()

    const [isSubscribe, setSubscribe] = useState<boolean>(false)

    useEffect(() => {
        setSubscribe(isUserData.subscribeStatus)
        // eslint-disable-next-line
    }, [])

    const subscribeHandle = async () => {
        await subscribeToUser({id: isUserData.id}).then((data: any) => {
            if (data.data.status === 200) {
                setSubscribe(true)
            }
        })
    }

    const viewAvatarHandler = (photo: string) => {
        if (photo) {
            setMainPhoto(photo)
            setActivePhotoModal(true)
        }
    }

    const unSubscribeHandle = async () => {
        await unSubscribeToUser({id: isUserData.id}).then((data: any) => {
            if (data.data.status === 200) {
                setSubscribe(false)
            }
        })
    }

    const navigateToSendMessages = () => {
        navigate(`${MESSAGES}`, {
            state: {
                dialog: {
                    opponentId: isUserData.id,
                    name: isUserData.name,
                    img: isUserData.img,
                }
            }
        })
    }


    return (
        <div className={styles.headerBlock}>
            {
                window.history.length > 1 &&
                <div>
                    <ButtonBack/>
                </div>
            }
            <div className={styles.avatarBlock} onClick={() => viewAvatarHandler(isUserData.img)}>
                <Avatar img={isUserData.img ? `${serverURL}${isUserData.img}` : null} name={isUserData.name}
                        color={isUserData.color} fontSize={48}/>
            </div>
            <div className={styles.header}>
                <div className={styles.headerInformation}>
                    <div className={styles.actionsBlock}>
                        <div className={styles.name}>
                            <span>{isUserData.name}</span>
                        </div>
                        <div className={styles.userCountryBlock}>
                            <span>{isUserData.country}, {isUserData.city}</span>
                        </div>
                        <div className={styles.subsBlock}>
                              <span>
                                <span className={styles.count}>{isUserData.subscribers}</span>
                                Subscribers
                            </span>
                            <span>
                                <span className={styles.count}>{isUserData.subscriptions}</span>
                                Subscriptions
                            </span>
                        </div>
                    </div>
                    <div className={styles.userInformationBlock}>
                        {
                            isUserData.id !== id &&
                            <div className={styles.actionsButtonBlock}>
                                <div className={styles.actionBlock}>
                                    {isSubscribe
                                        ?
                                        <Button onClick={unSubscribeHandle}>
                                            <span>Subscribed</span>
                                        </Button>
                                        :
                                        <Button buttonColor={'clearButton'} onClick={subscribeHandle}>
                                            <span className={styles.btnText}>Subscribe</span>
                                        </Button>
                                    }
                                </div>
                                <div className={styles.actionBlock}>
                                    <Button buttonColor={'clearButton'} onClick={navigateToSendMessages}>
                                        <span className={styles.btnText}>Send message</span>
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className={styles.actionsList}>
                            <IconElement image={likes} count={isUserData.likes} type={'light'}/>
                            <IconElement image={reposts} count={isUserData.reposts} type={'light'}/>
                            <IconElement image={views} count={isUserData.views} type={'light'}/>
                        </div>
                    </div>
                </div>
                <div className={styles.interestBlock}>
                    {isUserData.interests && JSON.parse(isUserData.interests.toString()).map((item: string, index: number) =>
                        <div className={styles.interest} key={index}>
                            <span>{item}</span>
                        </div>
                    )}
                </div>
            </div>
            <ViewPhotosModal isActivePhotosModal={isActivePhotoModal} setActivePhotosModal={setActivePhotoModal}
                             photos={null} mainPhoto={mainPhoto} setMainPhoto={setMainPhoto}/>
        </div>
    );
};
