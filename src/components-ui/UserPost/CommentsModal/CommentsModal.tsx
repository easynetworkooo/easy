import React, { FC, useEffect, useState } from 'react';
import styles from "../UserPost.module.scss";
import { UserPostContent } from "../UserPostContent/UserPostContent";
import { CommentsPost } from "../../CommentsPost/CommentsPost";
import { InputSend } from "../../InputSend/InputSend";
import { Modal } from "../../Modal/Modal";
import { IPost } from "../../../models/IPost";
import { postAPI } from "../../../services/PostService";
import { IComment } from "../../../models/IComment";

export interface CommentsModalProps {
    isActiveModal: boolean
    setActiveModal: (active: boolean) => void
    UserPostContent: React.ReactNode
    userPost: IPost
}

export const CommentsModal: FC<CommentsModalProps> = ({isActiveModal, setActiveModal, UserPostContent, userPost}) => {

    const [comments, setComments] = useState<IComment[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isFetching, setFetching] = useState(true)
    const [isSubtractTextarea, setSubtractTextarea] = useState(0)
    const [isValueSend, setValueSend] = useState<string>('')

    const {data: commentsData} = postAPI.useFetchPostCommentsQuery({
        page: currentPage,
        postid: userPost.id
    }, {skip: !isActiveModal})

    const [setCommentToPost] = postAPI.useSetCommentToPostMutation()

    const setCommentHandler = async () => {
        await setCommentToPost({postid: userPost.id, text: isValueSend}).then((data: any) => {
            if (data.data.status === 200) {
                setValueSend('')
            }
        })
    }

    useEffect(() => {
        if (commentsData && isFetching && commentsData.value.length > 0) {
            setComments((prevState) => [...prevState, ...commentsData.value])
            setCurrentPage(prevState => prevState + 1)
            setFetching(false)
        }
        // eslint-disable-next-line
    }, [isFetching, commentsData])


    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < 100) {
            setFetching(true)
        }
    }


    return (
        <Modal active={isActiveModal} setActive={setActiveModal}>
            <div className={styles.modalContent}>
                {UserPostContent}
                <div className={styles.comments} onScroll={onScrollHandler}>
                    <CommentsPost isSubtractTextarea={isSubtractTextarea} comments={comments}
                                  onScrollHandler={onScrollHandler}/>
                </div>
                <div className={styles.sendBlock}>
                    <InputSend setSubtractTextarea={setSubtractTextarea} value={isValueSend} setValue={setValueSend}
                               sendHandler={setCommentHandler}/>
                </div>
            </div>
        </Modal>
    );
};
