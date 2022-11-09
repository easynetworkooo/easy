import React from 'react';
import styles from './PostLoadingSkeleton.module.scss'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const PostLoadingSkeleton = () => {
    return (
        <div className={styles.postSkeleton}>
            <SkeletonTheme duration={3}>
                <div className={styles.informationPostBlockSkeleton}>
                    <div className={styles.avatarPostCreatorSkeleton}>
                        <Skeleton circle height={'100%'} width={'100%'}/>
                    </div>
                    <div className={styles.nameBlockSkeleton}>
                        <Skeleton height={24} width={'100%'}/>
                        <Skeleton height={14} width={'100%'}/>
                    </div>
                </div>
                <div className={styles.textPostBlockSkeleton}>
                    <Skeleton height={100}/>
                </div>
                <div className={styles.iconsPostBlockSkeleton}>
                    <Skeleton circle height={30} width={30}/>
                    <Skeleton circle height={30} width={30}/>
                    <Skeleton circle height={30} width={30}/>
                    <Skeleton circle height={30} width={30}/>
                </div>
            </SkeletonTheme>
        </div>
    );
};
