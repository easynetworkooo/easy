import React, { FC } from 'react';
import styles from './CommentsPost.module.scss'
import { Comment } from "./Comment/Comment";

export interface CommentsPostProps {
    isSubtractTextarea: number
}

export const CommentsPost:FC<CommentsPostProps> = ({isSubtractTextarea}) => {
    return (
        <div className={styles.commentsBlock} style={{height: `${340 - isSubtractTextarea}px`}}>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    );
};