import React, { FC } from 'react';
import styles from './CommentsPost.module.scss'
import { Comment } from "./Comment/Comment";

export interface CommentsPostProps {
    isSubtractTextarea: number
    comments: []
    fetchPostCommentsHandler: () => void
}

export const CommentsPost: FC<CommentsPostProps> = ({isSubtractTextarea, comments, fetchPostCommentsHandler}) => {

    return (
        <div className={styles.commentsBlock} style={{height: `${340 - isSubtractTextarea}px`}}>
            {comments && comments.map((comment: any) =>
                <Comment comment={comment} key={comment.id} fetchPostCommentsHandler={fetchPostCommentsHandler}/>
            )}
        </div>
    );
};