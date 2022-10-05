import React, { FC } from 'react';
import styles from './ContentCreateToken.module.scss'
import { Button, Input, Select } from "../../../../components-ui";

export interface ContentCreateTokenProps {
    setCreatedToken: (created: boolean) => void
}

export const ContentCreateToken:FC<ContentCreateTokenProps> = ({setCreatedToken}) => {
    return (
        <>
            <div className={styles.inputsCreateTokenBlock}>
                <div className={styles.inputCreateToken}>
                    <label>Token Type</label>
                    <Select/>
                </div>
                <div className={styles.inputCreateToken}>
                    <label>Name</label>
                    <Input placeholder={'Name'} type={'text'}/>
                </div>
                <div className={styles.inputCreateToken}>
                    <label>Symbol</label>
                    <Input placeholder={'Symbol'} type={'text'}/>
                </div>
                <div className={styles.inputCreateToken}>
                    <label>Decimals</label>
                    <Input placeholder={'Decimals'} type={'text'}/>
                </div>
                <div className={styles.inputCreateToken}>
                    <label>Total supply</label>
                    <Input placeholder={'Supply'} type={'text'}/>
                </div>
                <div className={styles.inputCreateToken}>
                    <div className={styles.checkboxAntiBotSystem}>
                        <input type={'checkbox'}/>
                        <span>Implement Pink Anti-Bot System?</span>
                    </div>
                </div>
            </div>
            <div className={styles.buttonCreateToken}>
                <div className={styles.createToken}>
                    <Button buttonColor={'clearButton'} onClick={() => setCreatedToken(true)}>
                        <span>Create Token</span>
                    </Button>
                </div>
            </div>
        </>
    );
};