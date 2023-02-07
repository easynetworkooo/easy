import React, { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputSend.module.scss'
import sendIcon from '../../assets/UI/Send.svg'
import sendHover from '../../assets/UI/SendHover.svg'

export interface InputSendProps {
    setSubtractTextarea: (currentHeight: number) => void
    value: string,
    setValue: (str: string) => void
    sendHandler: () => void
    placeholder: string
}

export const InputSend: FC<InputSendProps> = ({setSubtractTextarea, value, setValue, sendHandler, placeholder}) => {

    const onHeightChangeHandler = (heightTextarea: number) => {
        setSubtractTextarea(heightTextarea)
    }

    const sendValue = () => {
        if (!!value.trim().length) {
            sendHandler()
        }
        setValue('')
    }

    const sendPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault()
            sendValue()
        }
    }

    return (
        <div className={styles.inputSendBlock}>
            <div className={styles.textareaSendBlock}>
                <TextareaAutosize className={styles.textarea} maxRows={6} placeholder={placeholder}
                                  onHeightChange={(height) => onHeightChangeHandler(height)} value={value}
                                  onChange={event => setValue(event.target.value)}
                                  onKeyPress={event => sendPressHandler(event)}
                />
            </div>
            <div className={styles.buttonSend}>
                <img src={sendIcon} alt="send" onClick={sendValue} onMouseMove={e => e.currentTarget.src = sendHover}
                     onMouseLeave={e => e.currentTarget.src = sendIcon}/>
            </div>
        </div>
    );
};
