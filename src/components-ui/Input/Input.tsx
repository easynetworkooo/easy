import React, { ChangeEvent, FC } from 'react';
import styles from './Input.module.scss'
import { Validation } from "../Validation/Validation";
import { IValidator } from "../../models/IValidator";

export interface InputProps {
    placeholder: string
    type: string
    value?: string,
    validations?: IValidator[],
    isDirty?: boolean,
    isInputErrorValidation?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    autoFocus?: boolean
}

export const Input: FC<InputProps> = ({
                                          placeholder,
                                          type,
                                          value,
                                          onChange,
                                          onKeyPress,
                                          autoFocus,
                                          onBlur,
                                          validations,
                                          isDirty,
                                          isInputErrorValidation
                                      }) => {
    return (
        <div className={styles.inputBlock}>
            <input className={isInputErrorValidation ? `${styles.input} ${styles.inputError}` : styles.input} placeholder={placeholder} type={type} value={value} onChange={onChange}
                   onKeyPress={onKeyPress} autoFocus={autoFocus} onBlur={onBlur}/>
            {(validations && isDirty !== undefined) && <Validation validations={validations} isDirty={isDirty}/>}
        </div>

    );
};
