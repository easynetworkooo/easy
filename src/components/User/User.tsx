import React, { useEffect, useState } from 'react';
import styles from './User.module.scss'
import { UserPost } from "../../components-ui";
import { UserHeader } from "./UserHeader/UserHeader";
import { postAPI } from "../../services/PostService";
import { useParams } from "react-router-dom";
import { userAPI } from "../../services/UserService";


export const User = () => {
    const {nickname} = useParams()
    const [isUserId, setUserId] = useState(0)
    const {data: userInformation} = userAPI.useFetchGetUserByNicknameQuery(`${nickname}`)
    const {data: userPosts} = postAPI.useFetchAllUserPostsQuery({userId: isUserId, page: 1}, {skip: isUserId === 0})

    useEffect(() => {
        if (userInformation) {
            setUserId(userInformation.value.id)
        }
    }, [userInformation])

    return (
        <div className={styles.userContainer}>
            {userInformation && <UserHeader isUserData={userInformation.value}/>}
            <div className={styles.postsBlock}>
                {userPosts && userPosts.value.data.map((item, index) =>
                    <div key={index}>
                        <UserPost userPost={item}/>
                    </div>
                )}
            </div>
        </div>
    );
};
