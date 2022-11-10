import { ChangeEvent, useEffect, useState } from "react";
import { useValidation } from "./useValidation";
import { IValidations } from "../models/IValidations";


export const useInput = (initialValue: string = '', validations: IValidations = {}) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const [isInputErrorValidation, setInputErrorValidation] = useState(false)
    const validators = useValidation(value, validations)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setDirty(true)
    }


    useEffect(() => {
        if (isDirty && validators.some(item => item.show)) {
            setInputErrorValidation(true)
        } else {
            setInputErrorValidation(false)
        }
    }, [isDirty, validators])

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        setDirty,
        isInputErrorValidation,
        validators
    }

}