import React, { FC } from 'react';
import Linkify from "linkify-react";
import { Opts } from 'linkifyjs'
import styles from './Text.module.scss'

export interface TextProps {
    text: string
}

export const Text: FC<TextProps> = ({text}) => {
    const linkOption: Opts = {
        target: '_blank',
        className: styles.link
    }

    return (
        <Linkify options={linkOption}>
            <p className={styles.text}>{text}</p>
        </Linkify>
    );
};

