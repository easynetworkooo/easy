import React, { FC } from 'react';
import styles from './DeletePostModal.module.scss'
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { postAPI } from "../../services/PostService";


export interface DeletePostModalProps {
    isActiveDeleteModal: boolean
    setActiveDeleteModal: (active: boolean) => void
    postId: number
}

export const DeletePostModal:FC<DeletePostModalProps> = ({isActiveDeleteModal, setActiveDeleteModal, postId}) => {


    const [removePost] = postAPI.useRemovePostMutation()

    const deletePostHandler = async () => {
        await removePost({id: postId}).then(() => setActiveDeleteModal(false))
    }

    return (
        <Modal active={isActiveDeleteModal} setActive={setActiveDeleteModal}>
            <div className={styles.deleteModalContent}>
                <div className={styles.deleteQuestion}>
                    <span>Are you sure you want to delete the post?</span>
                </div>
                <div className={styles.buttonsModal}>
                    <Button buttonColor="redClearButton" onClick={() => setActiveDeleteModal(false)}>
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={deletePostHandler}>
                        <span>Yes, delete</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
