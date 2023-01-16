import React, { FC, useState } from 'react';
import { ProjectPostContent } from "./ProjectPostContent/ProjectPostContent";
import { Modal } from "../Modal/Modal";
import styles from "./ProjectPost.module.scss";
import { CommentsPost } from "../CommentsPost/CommentsPost";
import { InputSend } from "../InputSend/InputSend";

export interface ProjectPostProps {
    icon: string
    name: string
    text: string
}

export const ProjectPost:FC<ProjectPostProps> = ({icon, name, text}) => {

    const [isActiveModal, setActiveModal] = useState<boolean>(false)
    const [isSubtractTextarea,setSubtractTextarea] = useState<number>(0)
    const [isValueSend, setValueSend] = useState<string>('')
    const [isFetching, setFetching] = useState(false)


    console.log(isFetching)


    return (
        <>
            <ProjectPostContent text={text} name={name} icon={icon} setActiveModal={setActiveModal} currentCount={120} maxCount={200}/>
            <Modal active={isActiveModal} setActive={setActiveModal}>
                <div className={styles.modalContent}>
                    <ProjectPostContent icon={icon} name={name} text={text} setActiveModal={setActiveModal} currentCount={120} maxCount={200}/>
                    <div className={styles.comments}>
                        <CommentsPost isSubtractTextarea={isSubtractTextarea} comments={[]} setFetching={setFetching}/>
                    </div>
                    <div className={styles.sendBlock}>
                        <InputSend setSubtractTextarea={setSubtractTextarea} value={isValueSend} setValue={setValueSend} sendHandler={() => console.log('t')}/>
                    </div>
                </div>
            </Modal>
        </>
    );
};
