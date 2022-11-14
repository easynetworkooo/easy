import React, { ChangeEvent, FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputSend.module.scss'
import sendIcon from '../../assets/UI/Send.svg'
import sendHover from '../../assets/UI/SendHover.svg'

export interface InputSendProps {
    setSubtractTextarea: (currentHeight: number) => void
    value: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    sendHandler: () => void
}

export const InputSend: FC<InputSendProps> = ({setSubtractTextarea, value, sendHandler, onChange}) => {

    const onHeightChangeHandler = (heightTextarea: number) => {
        setSubtractTextarea(heightTextarea)
    }

    const send = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        sendHandler()
    }

    return (
        <div className={styles.inputSendBlock}>
            <div className={styles.textareaSendBlock}>
                <TextareaAutosize className={styles.textarea} maxRows={6} placeholder={'Write a message'}
                                  onHeightChange={(height) => onHeightChangeHandler(height)} value={value}
                                  onChange={event => onChange(event)}
                                  onKeyPress={e => e.key === 'Enter' && send(e)}
                />
            </div>
            <div className={styles.buttonSend}>
                <img src={sendIcon} alt="send" onClick={sendHandler} onMouseMove={e => e.currentTarget.src = sendHover}
                     onMouseLeave={e => e.currentTarget.src = sendIcon}/>
            </div>
        </div>
    );
};
