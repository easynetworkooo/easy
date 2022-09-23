import React from 'react';
import styles from './ButtonBack.module.scss'
import arrowLeft from '../../assets/UI/arrowLeft.svg'
import { useNavigate } from "react-router-dom";

export const ButtonBack = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.buttonBack} onClick={() => navigate(-1)}>
            <img src={arrowLeft} alt="back"/>
            <span>Back</span>
        </div>
    );
};