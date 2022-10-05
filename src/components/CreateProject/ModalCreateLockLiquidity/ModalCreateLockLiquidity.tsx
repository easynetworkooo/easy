import React, { FC, useState } from 'react';
import styles from './ModalCreateLockLiquidity.module.scss'
import { Alert, Button, Input, Modal } from "../../../components-ui";

export interface ModalCreateLockLiquidityProps {
    isModalCreateLockLiquidity: boolean,
    setModalCreateLockLiquidity: (visible: boolean) => void
}

export const ModalCreateLockLiquidity: FC<ModalCreateLockLiquidityProps> = ({
                                                                                isModalCreateLockLiquidity,
                                                                                setModalCreateLockLiquidity
                                                                            }) => {

    const [isAlert, setAlert] = useState(true)

    return (
        <Modal active={isModalCreateLockLiquidity} setActive={setModalCreateLockLiquidity}>
            <div className={styles.modalContent}>
                <div className={styles.headerLock}>
                    <span>Create your lock</span>
                </div>
                <div className={styles.inputsCreateLockBlock}>
                    <div className={styles.inputCreateLock}>
                        <label>Token or LP Token address</label>
                        <Input type={'text'} placeholder={'Token'}/>
                    </div>
                    <div className={styles.checkboxCreateLock}>
                        <input type="checkbox"/>
                        <span>Use another owner?</span>
                    </div>
                    <div className={styles.inputCreateLock}>
                        <label>Title</label>
                        <Input type={'text'} placeholder={'Title'}/>
                    </div>
                    <div className={styles.inputCreateLock}>
                        <label>Amount</label>
                        <Input type={'text'} placeholder={'Amount'}/>
                    </div>
                    <div className={styles.checkboxCreateLock}>
                        <input type="checkbox"/>
                        <span>Use vesting?</span>
                    </div>
                    <div className={styles.inputCreateLock}>
                        <label>Lock until (UTC time)</label>
                        <Input type={'date'} placeholder={'UTC time'}/>
                    </div>
                </div>
                <div className={styles.alertBlock}>
                    <Alert isShow={isAlert} setShow={setAlert}>
                        <span>Holy guacamole! You should check in on some of those fields below.</span>
                    </Alert>
                </div>
                <div className={styles.buttonLock}>
                    <div className={styles.lockBlock}>
                        <Button buttonColor={'clearButton'} onClick={() => setModalCreateLockLiquidity(false)}>
                            <span>Lock</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalCreateLockLiquidity;