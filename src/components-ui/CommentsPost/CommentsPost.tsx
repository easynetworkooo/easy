import React from 'react';
import styles from './CommentsPost.module.scss'
import { Comment } from "./Comment/Comment";

export const CommentsPost = () => {
    return (
        <div className={styles.commentsBlock}>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    );
};