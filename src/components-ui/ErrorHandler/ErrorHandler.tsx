import React, { useEffect, useState } from 'react';
import styles from './ErrorHandler.module.scss'
import { Alert } from "../Alert/Alert";

export const ErrorHandler = () => {

    const [isShow, setShow] = useState(true)

    // const errors = [
    //     {status: 404, text: 'PROBLEM IS SSSS', type: 'Error'},
    //     {status: 304, text: 'PROBLEM IS SSSS', type: 'Warning'},
    //     {status: 200, text: 'PROBLEM IS SSSS', type: 'Success'},
    // ]

    useEffect(() => {
        setTimeout(() => setShow(false), 3000)
    },[isShow])

    return (
        <div className={styles.errorHandlerBlock}>
            <Alert isShow={isShow} setShow={setShow}>
                <span>4044</span>
            </Alert>
            <Alert isShow={isShow} setShow={setShow}>
                <span>4044</span>
            </Alert>
            <Alert isShow={isShow} setShow={setShow}>
                <span>4044</span>
            </Alert>
        </div>
    );
};
