import React, { FC, useState } from 'react';
import styles from './ModalCreateToken.module.scss'
import { Modal } from "../../../components-ui";
import { ContentCreateToken } from "./ContentCreateToken/ContentCreateToken";
import { InformationAboutCreatedToken } from "./InformationAboutCreatedToken/InformationAboutCreatedToken";

export interface ModalCreateTokenProps {
    isModalCreateToken: boolean
    setModalCreateToken: (visible: boolean) => void
}

export const ModalCreateToken: FC<ModalCreateTokenProps> = ({isModalCreateToken, setModalCreateToken}) => {

    const [isCreatedToken, setCreatedToken] = useState(false)

    return (
        <Modal active={isModalCreateToken} setActive={setModalCreateToken}>
            <div className={styles.modalContent}>
                <div className={styles.headerCreateToken}>
                    <span>Create Token</span>
                </div>
                {
                    isCreatedToken
                        ?
                        <InformationAboutCreatedToken setModalCreateToken={setModalCreateToken}/>
                        :
                        <ContentCreateToken setCreatedToken={setCreatedToken}/>
                }

            </div>
        </Modal>
    );
};