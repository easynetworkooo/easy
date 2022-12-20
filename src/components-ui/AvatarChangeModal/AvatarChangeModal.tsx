import React, { FC, useState } from 'react';
import styles from './AvatarChangeModal.module.scss'
import { Modal } from "../Modal/Modal";
import { ChooseImage } from "./ChooseImage/ChooseImage";
import { CropImage } from "./CropImage/CropImage";

export interface AvatarChangeModalProps {
    isActiveModalChange: boolean
    setActiveModalChange: (active: boolean) => void
}

export const AvatarChangeModal: FC<AvatarChangeModalProps> = ({isActiveModalChange, setActiveModalChange}) => {

    const [isUrlSrc, setUrlSrc] = useState('')

    return (
        <Modal active={isActiveModalChange} setActive={setActiveModalChange}>
            <div className={styles.modalChangeAvatarContent}>
                {isUrlSrc ? <CropImage setImgSrc={setUrlSrc} isImgSrc={isUrlSrc} setActiveModalChange={setActiveModalChange}/> : <ChooseImage setImgSrc={setUrlSrc}/>}
            </div>
        </Modal>
    );
};
