import React, { FC, useEffect } from 'react';
import styles from './ChooseImage.module.scss'
import { useDropzone } from "react-dropzone";

export interface ChooseImageProps {
    setImgSrc: (img: string) => void
}

export const ChooseImage:FC<ChooseImageProps> = ({setImgSrc}) => {

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp'],
        },
        maxFiles: 1
    });
    
    useEffect(() => {
        if (acceptedFiles.length === 1) {
            setImgSrc(URL.createObjectURL(acceptedFiles[0]))
        }
    }, [acceptedFiles, acceptedFiles.length, setImgSrc])

    return (
        <>
            <div className={styles.uploadInformation}>
                <span>Uploading a new photo</span>
            </div>
            <div {...getRootProps({className: styles.dropzoneBlock})}>
                <input {...getInputProps()} />
                <span className={styles.selectText}>Select a file</span>
                <span className={styles.textStyle}>or</span>
                <span className={styles.textStyle}>Drag your photo here. The file must not exceed 10 mb JPG, WEBP, PNG</span>
            </div>
        </>
    );
};
