import React, { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputSend.module.scss'
import send from '../../assets/UI/Send.svg'
import sendHover from '../../assets/UI/SendHover.svg'

export interface InputSendProps {
    setSubtractTextarea: (currentHeight: number) => void
}

export const InputSend: FC<InputSendProps> = ({setSubtractTextarea}) => {

    const onHeightChangeHandler = (heightTextarea: number) => {
        setSubtractTextarea(heightTextarea)
    }

    return (
        <div className={styles.inputSendBlock}>
            <div className={styles.textareaSendBlock}>
                <TextareaAutosize className={styles.textarea} maxRows={6} placeholder={'Write a message'}
                                  onHeightChange={(height) => onHeightChangeHandler(height)}/>
            </div>
            <div className={styles.buttonSend}>
                <img src={send} alt="send" onMouseMove={e => e.currentTarget.src = sendHover}
                     onMouseLeave={e => e.currentTarget.src = send}/>
            </div>
        </div>
    );
};
