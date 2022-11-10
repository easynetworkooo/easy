import React, { FC } from 'react';
import styles from './Validation.module.scss'
import { IValidator } from "../../models/IValidator";

export interface ValidationProps {
    validations: IValidator[]
    isDirty: boolean
}

export const Validation:FC<ValidationProps> = ({validations, isDirty}) => {

    return (
        <div className={styles.validationsBlock}>
            {validations.map(({show, validatorErrorMessage}, key) =>
                <span className={show ? styles.validationMessage: styles.none} key={key}>{(show && isDirty) && validatorErrorMessage}</span>
            )}
        </div>
    );
};