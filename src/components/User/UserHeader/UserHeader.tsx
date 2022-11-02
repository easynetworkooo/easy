import React, { useEffect, useState } from 'react';
import styles from './UserHeader.module.scss'
import defaultAvatar from "../../../assets/Profile/Default-avatar.svg";
import { Button, ButtonBack, IconElement } from "../../../components-ui";
import likes from "../../../assets/Profile/Like.svg";
import reposts from "../../../assets/Profile/Repost.svg";
import views from "../../../assets/Profile/View.svg";
import { useNavigate, useParams } from "react-router-dom";
import { MESSAGES } from "../../../constants/nameRoutesConsts";
import { userAPI } from "../../../services/UserService";
import { IUserValue } from "../../../models/IUser";
import { useAppSelector } from "../../../hooks/redux";


const initialUserData: IUserValue = {
    name: '',
    city: '',
    country: '',
    id: 1,
    img: '',
    interests: '',
    email: '',
    likes: null,
    reposts: null,
    regdate: '',
    subscribeStatus: false,
    subscriptions: 0,
    subscribers: 0,
    views: null
}

export const UserHeader = () => {

    const navigate = useNavigate()
    const {userId} = useParams()
    const {id} = useAppSelector(state => state.userReducer)

    const {data: userData, isLoading: isUserDataLoading} = userAPI.useFetchGetUserQuery(`${userId}`)
    const [subscribeToUser] = userAPI.useSubscribeToUserMutation()
    const [unSubscribeToUser] = userAPI.useUnSubscribeToUserMutation()

    const [isSubscribe, setSubscribe] = useState<boolean>(false)
    const [isUserData, setUserData] = useState<IUserValue>(initialUserData)

    useEffect(() => {
        if (isUserDataLoading === false && userData) {
            setSubscribe(userData.value.subscribeStatus)
            setUserData(userData.value)
        }
    }, [isUserDataLoading, userData])

    const subscribeHandle = async () => {
        await subscribeToUser({id: isUserData.id}).then((data: any) => {
            if (data.data.status === 200) {
                setSubscribe(true)
            }
        })
    }

    const unSubscribeHandle = async () => {
        await unSubscribeToUser({id: isUserData.id}).then((data: any) => {
            if (data.data.status === 200) {
                setSubscribe(false)
            }
        })
    }

    if (isUserDataLoading) {
        return <div>Skeleton</div>
    }

    return (
        <div className={styles.headerBlock}>
            <div className={styles.avatarBlock}>
                <ButtonBack/>
                <img src={isUserData.img ? isUserData.img : defaultAvatar} className={styles.avatar}
                     alt="userProfile"/>
            </div>
            <div className={styles.actionsBlock}>
                <div className={styles.name}>
                    <span>{isUserData.name}</span>
                </div>
                <div className={styles.subsBlock}>
                    <span>{isUserData.subscribers} Subscribers</span>
                    <span>{isUserData.subscriptions} Subscriptions</span>
                </div>
                {
                    userId !== id.toString() &&
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
                            <Button buttonColor={'clearButton'} onClick={() => navigate(MESSAGES)}>
                                <span className={styles.btnText}>Message</span>
                            </Button>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.userInformationBlock}>
                <div className={styles.actionsList}>
                    <IconElement image={likes} count={isUserData.likes} type={'light'}/>
                    <IconElement image={reposts} count={isUserData.reposts} type={'light'}/>
                    <IconElement image={views} count={isUserData.views} type={'light'}/>
                </div>
                <div className={styles.userCountryBlock}>
                    <span>{isUserData.country}</span>
                    <span>{isUserData.city}</span>
                </div>
                <div className={styles.interestBlock}>
                    {isUserData.interests && JSON.parse(isUserData.interests.toString()).map((item: string, index: number) =>
                        <div className={styles.interest} key={index}>
                            <span>{item}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};