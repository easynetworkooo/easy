import React from 'react';
import styles from './UserSkeletonHeader.module.scss'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export const UserSkeletonHeader = () => {
    return (
        <div className={styles.headerBlockSkeleton}>
            <SkeletonTheme duration={3}>
                <div className={styles.avatarBlockSkeleton}>
                    <Skeleton height={24} width={'100%'}/>
                    <Skeleton circle height={80} width={80}/>
                </div>
                <div className={styles.actionsBlockSkeleton}>
                    <div className={styles.nameSkeleton}>
                        <Skeleton height={30} width={'200px'}/>
                    </div>
                    <div className={styles.subsBlockSkeleton}>
                        <Skeleton height={26} width={'200px'}/>
                    </div>
                    <div className={styles.actionsButtonBlockSkeleton}>
                        <div className={styles.actionBlockSkeleton}>
                            <Skeleton height={34} width={'120px'}/>
                        </div>
                        <div className={styles.actionBlockSkeleton}>
                            <Skeleton height={34} width={'120px'}/>
                        </div>
                    </div>
                </div>
                <div className={styles.userInformationBlockSkeleton}>
                    <div className={styles.actionsListSkeleton}>
                        <Skeleton height={26} width={'200px'}/>
                    </div>
                    <div className={styles.userCountryBlockSkeleton}>
                        <Skeleton height={26} width={'200px'}/>
                    </div>
                    <div className={styles.interestBlockSkeleton}>
                        <Skeleton height={26} width={'200px'}/>
                    </div>
                </div>
            </SkeletonTheme>
        </div>

    );
};
