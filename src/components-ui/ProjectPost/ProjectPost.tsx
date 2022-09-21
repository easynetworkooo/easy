import React, { FC, useState } from 'react';
import { ProjectPostContent } from "./ProjectPostContent/ProjectPostContent";
import { Modal } from "../Modal/Modal";
import styles from "./ProjectPost.module.scss";
import { CommentsPost } from "../CommentsPost/CommentsPost";

export interface ProjectPostProps {
    icon: string
    name: string
    text: string
}

export const ProjectPost:FC<ProjectPostProps> = ({icon, name, text}) => {

    const [isActiveModal, setActiveModal] = useState(false)


    return (
        <>
            <ProjectPostContent text={text} name={name} icon={icon} setActiveModal={setActiveModal} currentCount={120} maxCount={200}/>
            <Modal active={isActiveModal} setActive={setActiveModal}>
                <div className={styles.modalContent}>
                    <ProjectPostContent icon={icon} name={name} text={text} setActiveModal={setActiveModal} currentCount={120} maxCount={200}/>
                    <div className={styles.comments}>
                        <CommentsPost/>
                    </div>
                </div>
            </Modal>
        </>
    );
};