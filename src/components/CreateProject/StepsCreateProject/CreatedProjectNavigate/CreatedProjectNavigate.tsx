import React from 'react';
import styles from "./CreatedProjectNavigate.module.scss";
import successfullyCreated from "../../../../assets/Steps/Ready-step.png";
import { Button } from "../../../../components-ui";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../../../constants/nameRoutesConsts";

export const CreatedProjectNavigate = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.tokenCreatedBlock}>
            <img src={successfullyCreated} className={styles.createdImage} alt="created"/>
            <span className={styles.textCreated}>Your project has been successfully created and now you can attract people to it. Go to the project to see it.</span>
            <div className={styles.buttonNavigateNewProject}>
                <Button buttonColor={'clearButton'} onClick={() => navigate(`${PROJECTS}/test`)}>
                    <span>Go to project</span>
                </Button>
            </div>
        </div>
    );
};
