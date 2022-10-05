import React, { FC } from 'react';
import { Button, Modal } from "../../../components-ui";
import styles from "./ModalChooseCreate.module.scss";

export interface ModalChooseCreateProps {
    isModalChooseVisible: boolean
    setModalChooseVisible: (visible: boolean) => void
    setModalCreateToken: (visible: boolean) => void
    setModalCreateLockLiquidity: (visible: boolean) => void
}

export const ModalChooseCreate: FC<ModalChooseCreateProps> = ({
                                                                  isModalChooseVisible,
                                                                  setModalChooseVisible,
                                                                  setModalCreateToken,
                                                                  setModalCreateLockLiquidity
                                                              }) => {

    const openCreateTokenModalHandler = () => {
        setModalChooseVisible(false)
        setModalCreateToken(true)
    }

    const openCreateLockLiquidityHandler = () => {
        setModalChooseVisible(false)
        setModalCreateLockLiquidity(true)
    }

    return (
        <Modal active={isModalChooseVisible} setActive={setModalChooseVisible}>
            <div className={styles.modalContent}>
                <Button buttonColor={'clearButton'} onClick={() => setModalChooseVisible(false)}>
                    <span>Create Launchpad</span>
                </Button>
                <Button buttonColor={'clearButton'} onClick={openCreateTokenModalHandler}>
                    <span>Create Token</span>
                </Button>
                <Button buttonColor={'clearButton'} onClick={openCreateLockLiquidityHandler}>
                    <span>Create Lock Liquidity</span>
                </Button>
            </div>
        </Modal>
    );
};

export default ModalChooseCreate;