import React, { FC } from 'react';
import styles from './SecondStepCreateProject.module.scss'
import { Button, Input } from "../../../../components-ui";

export interface SecondStepCreateProjectProps {
    setActiveStepNumber: (page: number) => void
}


export const SecondStepCreateProject: FC<SecondStepCreateProjectProps> = ({setActiveStepNumber}) => {
    return (
        <div className={styles.secondStepCreateProjectBlock}>
            <div className={styles.secondStepCreateProject}>
                <div className={styles.chooseTypeBlock}>
                    <div className={styles.chooseType}>
                        <input type="radio" name='type' className={styles.radioInput}/>
                        <span>Public</span>
                    </div>
                    <div className={styles.chooseType}>
                        <input type="radio" name='type'/>
                        <span>Whitelist Only</span>
                    </div>
                </div>
                <div className={styles.coreInformationProject}>
                    <div className={styles.coreInformation}>
                        <label>Presale Rate</label>
                        <Input type={'text'} placeholder={'Presale Rate'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Listing rate</label>
                        <Input type={'text'} placeholder={'Listing Rate'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>SoftCap (BNB)</label>
                        <Input type={'number'} placeholder={'SoftCap'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>HardCap (BNB)</label>
                        <Input type={'number'} placeholder={'HardCap'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Minimum buy (BNB)</label>
                        <Input type={'number'} placeholder={'Minimum buy'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Maximum buy (BNB)</label>
                        <Input type={'number'} placeholder={'Maximum buy'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Refund type</label>
                        <Input type={'text'} placeholder={'Refund type'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Router</label>
                        <Input type={'text'} placeholder={'---Select router---'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Liquidity (%)</label>
                        <Input type={'number'} placeholder={'Liquidity'}/>
                    </div>
                </div>
                <div className={styles.timeInformation}>
                    <div className={styles.helperTextBlock}>
                        <span>Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%) if i spend 1 BNB on how many tokens will i receive? Usually this amount is lower than presale rate to allow for a higher listing price on</span>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Start time (UTC)</label>
                        <Input type={'date'} placeholder={'Start time'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>End time (UTC)</label>
                        <Input type={'date'} placeholder={'End time'}/>
                    </div>
                    <div className={styles.coreInformation}>
                        <label>Liquidity lockup (days)</label>
                        <Input type={'number'} placeholder={'Liquidity lockup days'}/>
                    </div>
                </div>
                <div className={styles.antiRugSystem}>
                    <input type="checkbox"/>
                    <span>Using Anti-Rug System (Vesting System)?</span>
                </div>
            </div>
            <span>Need 0 STK ro create launchpad</span>
            <div className={styles.buttons}>
                <div className={styles.backButton}>
                    <Button buttonColor={'grayButton'} onClick={() => setActiveStepNumber(0)}>
                        <span>Back</span>
                    </Button>
                </div>
                <div className={styles.nextButton}>
                    <Button buttonColor={'clearButton'} onClick={() => setActiveStepNumber(2)}>
                        <span>Next Step</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
