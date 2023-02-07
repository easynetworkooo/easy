import React, { FC, useEffect, useState } from 'react';
import styles from "../UserPost.module.scss";
import { CommentsPost } from "../../CommentsPost/CommentsPost";
import { InputSend } from "../../InputSend/InputSend";
import { Modal } from "../../Modal/Modal";
import { IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { IComment } from "../../../models/IComment";
import { paginationCount } from "../../../constants/pagintaionCount";

export interface CommentsModalProps {
    isActiveModal: boolean
    setActiveModal: (active: boolean) => void
    UserPostContent: React.ReactNode
    userPost: IPost
}

export const CommentsModal: FC<CommentsModalProps> = ({isActiveModal, setActiveModal, UserPostContent, userPost}) => {

    const [comments, setComments] = useState<IComment[]>([])
    const [currentCount, setCurrentCount] = useState(paginationCount)
    const [isFetching, setFetching] = useState(false)
    const [isSubtractTextarea, setSubtractTextarea] = useState(0)
    const [isValueSend, setValueSend] = useState<string>('')

    const {data: commentsData} = postAPI.useFetchPostCommentsQuery({
        count: currentCount,
        postid: userPost.id
    }, {skip: !isActiveModal})

    const [setCommentToPost] = postAPI.useSetCommentToPostMutation()

    useEffect(() => {
        if (commentsData) {
            setComments(commentsData.value)
        }
    }, [commentsData])

    useEffect(() => {
        if (isFetching && commentsData && currentCount <= commentsData.value.length) {
            console.log('count')
            setCurrentCount(prevState => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching, comments])

    const setCommentHandler = async () => {
        await setCommentToPost({postid: userPost.id, text: isValueSend}).then((data: any) => {
            if (data.data.status === 200) {
                setValueSend('')
            }
        })
    }

    return (
        <Modal active={isActiveModal} setActive={setActiveModal}>
            <div className={styles.modalContent}>
                {UserPostContent}
                <div className={styles.comments}>
                    <CommentsPost isSubtractTextarea={isSubtractTextarea} comments={comments} setFetching={setFetching}/>
                </div>
                <div className={styles.sendBlock}>
                    <InputSend setSubtractTextarea={setSubtractTextarea} value={isValueSend} setValue={setValueSend}
                               sendHandler={setCommentHandler} placeholder='Write a comment'/>
                </div>
            </div>
        </Modal>
    );
};
