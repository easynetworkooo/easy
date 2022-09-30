import React, { FC } from 'react';
import styles from "./WalletProject.module.scss";
import projectAvatar from "../../../../assets/UI/AvatarProject.png";
import { Indicator, IndicatorStatus } from "../../../../components-ui";

export interface WalletProjectProps {
    maxCount: number
    currentCount: number
    typeIndicator: string
}

export const WalletProject:FC<WalletProjectProps> = ({maxCount, currentCount, typeIndicator}) => {
    return (
        <div className={styles.walletProjectBlock}>
            <div className={styles.walletProjectName}>
                <div className={styles.walletProjectAvatar}>
                    <img src={projectAvatar} alt="projectAvatar"/>
                </div>
                <div className={styles.nameBlock}>
                    <div className={styles.name}>
                        <span>Tingram</span>
                        <div className={styles.project}>
                            <span>Project</span>
                        </div>
                    </div>
                    <div className={styles.lastActivity}>
                        <span>3 minutes ago</span>
                    </div>
                </div>
            </div>
            <div className={styles.progressIndicatorBlock}>
                <IndicatorStatus type={typeIndicator}/>
                <Indicator maxCount={maxCount} currentCount={currentCount} type={typeIndicator}/>
            </div>
            <div className={styles.coinsBlock}>
                <span className={styles.headerSection}>Coins</span>
                <span className={styles.dataSection}>234</span>
            </div>
            <div className={styles.coinsBlock}>
                <span className={styles.headerSection}>Spend Money</span>
                <span className={styles.dataSection}>$12.000</span>
            </div>
        </div>
    );
};