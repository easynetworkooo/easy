import React, { useState } from 'react';
import styles from './CreateProject.module.scss'
import { Button, ButtonBack, Modal } from "../../components-ui";
import StepsCreateProject from "./StepsCreateProject/StepsCreateProject";

export const CreateProject = () => {

    const [isModalVisible, setModalVisible] = useState(true)

    return (
        <div className={styles.createProjectContainer}>
            <ButtonBack/>
            <StepsCreateProject/>
            <Modal active={isModalVisible} setActive={setModalVisible}>
                <div className={styles.modalContent}>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Launchpad</span>
                    </Button>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Token</span>
                    </Button>
                    <Button buttonColor={'clearButton'} onClick={() => setModalVisible(false)}>
                        <span>Create Lock Liquidity</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};