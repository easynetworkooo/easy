import React, { FC, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputSend.module.scss'
import paperClip from '../../assets/UI/Paperclip.svg'
import sendIcon from '../../assets/UI/Send.svg'
import sendHover from '../../assets/UI/SendHover.svg'
import { useDropzone } from "react-dropzone";

export interface InputSendProps {
    setSubtractTextarea: (currentHeight: number) => void
    value: string,
    setValue: (str: string) => void
    sendHandler: () => void
    placeholder: string,
    postImages: any[],
    setPostImages: (arr: any[]) => void
}

export const InputSend: FC<InputSendProps> = ({
                                                  setSubtractTextarea,
                                                  value,
                                                  setValue,
                                                  sendHandler,
                                                  placeholder,
                                                  postImages, setPostImages
                                              }) => {

    const [isHoverMouse, setHoverMouse] = useState(false)

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp'],
        },
        maxFiles: 10
    });

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


    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setPostImages(acceptedFiles)
        }
    }, [acceptedFiles, setPostImages])

    return (
        <div className={styles.inputSendBlock}>
            <div className={styles.loadFiles}>
                {postImages.map(item =>
                    <img key={item.name} src={URL.createObjectURL(item)} alt=""/>
                )}
            </div>
            <div className={styles.inputSend}>
                <div className={styles.textareaSendBlock}>
                    <div className={styles.addPhotoBlock}>
                        <img src={paperClip} {...getRootProps()} alt="paperclip"/>
                        <input {...getInputProps()}/>
                    </div>
                    <TextareaAutosize className={styles.textarea} maxRows={10} placeholder={placeholder}
                                      onHeightChange={(height) => onHeightChangeHandler(height)} value={value}
                                      onChange={event => setValue(event.target.value)}
                                      onKeyPress={event => sendPressHandler(event)}
                    />
                </div>
                <div className={styles.buttonSend} onMouseMove={() => setHoverMouse(true)}
                     onMouseLeave={() => setHoverMouse(false)} onClick={sendValue}>
                    <img src={isHoverMouse ? sendHover : sendIcon} alt="send"/>
                </div>
            </div>
        </div>
    );
};
