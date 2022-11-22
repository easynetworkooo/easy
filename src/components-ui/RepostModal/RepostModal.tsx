import React, { FC } from 'react';
import styles from './RepostModal.module.scss'
import { Modal } from "../Modal/Modal";
import { postAPI } from "../../services/PostService";
import { Button } from "../Button/Button";

export interface RepostModalProps {
    isActiveRepostModal: boolean
    setActiveRepostModal: (active: boolean) => void
    postId: number
}

export const RepostModal: FC<RepostModalProps> = ({isActiveRepostModal, setActiveRepostModal, postId}) => {

    const [setRepostPost] = postAPI.useSetRepostPostMutation()

    const setRepostPostHandler = async () => {
        await setRepostPost({id: postId}).then(() => setActiveRepostModal(false))
    }

    return (
        <Modal active={isActiveRepostModal} setActive={setActiveRepostModal}>
            <div className={styles.repostModalContent}>
                <div className={styles.repostQuestion}>
                    <span>Are you sure you want to repost the post?</span>
                </div>
                <div className={styles.buttonsModal}>
                    <Button buttonColor="redClearButton" onClick={() => setActiveRepostModal(false)}>
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={setRepostPostHandler}>
                        <span>Yes, repost</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
