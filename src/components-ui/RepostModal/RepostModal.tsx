import React, { FC } from 'react';
import styles from './RepostModal.module.scss'
import { Modal } from "../Modal/Modal";
import { postAPI } from "../../services/PostService";
import { Button } from "../Button/Button";
import { customErrorNotify } from "../../helpers/customErrorNotify";

export interface RepostModalProps {
    isActiveRepostModal: boolean
    setActiveRepostModal: (active: boolean) => void
    postId: number
}

export const RepostModal: FC<RepostModalProps> = ({isActiveRepostModal, setActiveRepostModal, postId}) => {

    const [setRepostPost] = postAPI.useSetRepostPostMutation()

    const setRepostPostHandler = async () => {
        try {
            await setRepostPost({id: postId}).then((data:any) => {
                customErrorNotify(data.data.value, 'Success')
                setActiveRepostModal(false)
            })
        } catch (e:any) {
            customErrorNotify(e, 'Error')
        }

    }

    return (
        <Modal active={isActiveRepostModal} setActive={setActiveRepostModal}>
            <div className={styles.repostModalContent}>
                <div className={styles.repostQuestion}>
                    <span>Are you sure you want to repost the post?</span>
                </div>
                <div className={styles.buttonsModal}>
                    <Button buttonColor="grayButton" onClick={() => setActiveRepostModal(false)}>
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
