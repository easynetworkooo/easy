import React, { useState } from 'react';
import styles from './CreateProject.module.scss'
import { ButtonBack } from "../../components-ui";
import StepsCreateProject from "./StepsCreateProject/StepsCreateProject";
import ModalChooseCreate from "./ModalChooseCreate/ModalChooseCreate";
import { ModalCreateToken } from "./ModalCreateToken/ModalCreateToken";
import ModalCreateLockLiquidity from "./ModalCreateLockLiquidity/ModalCreateLockLiquidity";

export const CreateProject = () => {

    const [isModalChooseVisible, setModalChooseVisible] = useState(true)
    const [isModalCreateToken, setModalCreateToken] = useState(false)
    const [isModalCreateLockLiquidity, setModalCreateLockLiquidity] = useState(false)

    return (
        <div className={styles.createProjectContainer}>
            <ButtonBack/>
            <StepsCreateProject setModalCreateToken={setModalCreateToken}/>
            <ModalChooseCreate isModalChooseVisible={isModalChooseVisible}
                               setModalChooseVisible={setModalChooseVisible}
                               setModalCreateToken={setModalCreateToken}
                               setModalCreateLockLiquidity={setModalCreateLockLiquidity}
            />
            <ModalCreateToken isModalCreateToken={isModalCreateToken} setModalCreateToken={setModalCreateToken}/>
            <ModalCreateLockLiquidity isModalCreateLockLiquidity={isModalCreateLockLiquidity}
                                      setModalCreateLockLiquidity={setModalCreateLockLiquidity}/>
        </div>
    );
};