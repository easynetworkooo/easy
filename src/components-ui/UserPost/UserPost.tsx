import React, { FC, useState } from 'react';
import styles from './UserPost.module.scss'
import { UserPostContent } from "./UserPostContent/UserPostContent";
import { Modal } from "../Modal/Modal";
import { CommentsPost } from "../CommentsPost/CommentsPost";
import { InputSend } from "../InputSend/InputSend";


export interface UserPostProps {
    icon: string
    name: string
    text: string
}

export const UserPost: FC<UserPostProps> = ({icon, name, text}) => {

    const [isActiveModal, setActiveModal] = useState(false)
    const [isSubtractTextarea, setSubtractTextarea] = useState(0)

    return (
      <>
          <UserPostContent icon={icon} name={name} text={text} setActiveModal={setActiveModal}/>
          <Modal active={isActiveModal} setActive={setActiveModal}>
              <div className={styles.modalContent}>
                  <UserPostContent icon={icon} name={name} text={text} setActiveModal={setActiveModal}/>
                  <div className={styles.comments}>
                      <CommentsPost isSubtractTextarea={isSubtractTextarea}/>
                  </div>
                  <div className={styles.sendBlock}>
                      <InputSend setSubtractTextarea={setSubtractTextarea}/>
                  </div>
              </div>
          </Modal>
      </>
    );
};