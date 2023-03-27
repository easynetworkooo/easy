import React from 'react';
import styles from './SubsLoading.module.scss'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const SubsLoading = () => {
    return (
        <SkeletonTheme duration={3}>
            <div className={styles.subsBlockSkeleton}>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
                <div className={styles.userSubBlockSkeleton}>
                    <div className={styles.avatarSkeleton}>
                        <Skeleton circle height={'56px'} width={'56px'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={'30px'} width={'300px'}/>
                        <Skeleton height={'30px'} width={'300px'}/>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};
