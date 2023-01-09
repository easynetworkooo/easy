import React, { FC } from 'react';
import styles from './CommentsPost.module.scss'
import { Comment } from "./Comment/Comment";
import { IComment } from "../../models/IComment";

export interface CommentsPostProps {
    isSubtractTextarea: number
    comments: IComment[]
    onScrollHandler: (e: React.UIEvent<HTMLDivElement>) => void
}

export const CommentsPost: FC<CommentsPostProps> = ({isSubtractTextarea, comments, onScrollHandler}) => {

    return (
        <div className={styles.commentsBlock} style={{height: `${340 - isSubtractTextarea}px`}} onScroll={onScrollHandler}>
            {comments && comments.map((comment: any, key: number) =>
                <Comment comment={comment} key={key}/>
            )}
        </div>
    );
};
