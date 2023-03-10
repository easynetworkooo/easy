import React, { FC } from 'react';
import styles from './ViewPhotosModal.module.scss'
import { Modal } from "../Modal/Modal";
import { serverURL } from "../../constants/serverURL";

export interface ViewPhotosModalProps {
    mainPhoto: string
    setMainPhoto: (mainPhoto: string) => void
    photos: string[] | null
    isActivePhotosModal: boolean
    setActivePhotosModal: (active: boolean) => void
}

export const ViewPhotosModal: FC<ViewPhotosModalProps> = ({
                                                              isActivePhotosModal,
                                                              setActivePhotosModal,
                                                              photos,
                                                              mainPhoto,
                                                              setMainPhoto
                                                          }) => {


    return (
        <Modal setActive={setActivePhotosModal} active={isActivePhotosModal}>
            <div className={styles.photosModal}>
                <div className={styles.mainPhoto}>
                    <img src={`${serverURL}${mainPhoto}`} alt="postPhoto"/>
                </div>
                {photos &&
                    <div className={styles.otherPhotos}>
                        {photos.map((item) =>
                            <img src={`${serverURL}${item}`} key={item} alt="postPhoto" onClick={() => setMainPhoto(item)}/>
                        )}
                    </div>
                }
            </div>
        </Modal>
    );
};
