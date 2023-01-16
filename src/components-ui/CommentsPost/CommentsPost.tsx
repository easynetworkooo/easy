import React, { FC } from 'react';
import styles from './CommentsPost.module.scss'
import { Comment } from "./Comment/Comment";
import { IComment } from "../../models/IComment";

export interface CommentsPostProps {
    isSubtractTextarea: number
    comments: IComment[]
    setFetching: (fetch: boolean) => void
}

export const CommentsPost: FC<CommentsPostProps> = ({isSubtractTextarea, comments, setFetching}) => {

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) < (isSubtractTextarea)) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }

    return (
        <div className={styles.commentsBlock} style={{height: `${400 - isSubtractTextarea}px`}} onScroll={onScrollHandler}>
            {comments && comments.map((comment: any, key: number) =>
                <Comment comment={comment} key={key}/>
            )}
        </div>
    );
};
