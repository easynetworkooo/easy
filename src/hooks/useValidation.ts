import { useEffect, useState } from "react";
import { IValidations } from "../models/IValidations";
import { IValidator } from "../models/IValidator";

const defaultStateValidator: IValidator = {
    show: false,
    validatorErrorMessage: ''
}

export const useValidation = (value: string, validations: IValidations) => {
    const [isEmpty, setEmpty] = useState<IValidator>(defaultStateValidator)
    const [isEmailError, setEmailError] = useState<IValidator>(defaultStateValidator)
    const [isMatchError, setMatchError] = useState<IValidator>(defaultStateValidator)
    const [minLengthError, setMinLengthError] = useState<IValidator>(defaultStateValidator)
    const [maxLengthError, setMaxLengthError] = useState<IValidator>(defaultStateValidator)
    const [isCheckNicknameError, setCheckNicknameError] = useState<IValidator>(defaultStateValidator)


    useEffect(() => {
        for (const validation in validations) {
            if (validation === 'isEmpty') {
                value ? setEmpty(defaultStateValidator) : setEmpty({
                    show: true,
                    validatorErrorMessage: 'The field cannot be empty'
                })
            } else if (validation === 'minLength') {
                (validations.minLength && value.length < validations.minLength)
                    ? setMinLengthError({
                        show: true,
                        validatorErrorMessage: `The minimum length should be ${validations.minLength}`
                    })
                    : setMinLengthError(defaultStateValidator)
            } else if (validation === 'maxLength') {
                (validations.maxLength && value.length > validations.maxLength)
                    ? setMaxLengthError({
                        show: true,
                        validatorErrorMessage: `The maximum length should be ${validations.maxLength}`
                    })
                    : setMaxLengthError(defaultStateValidator)
            } else if (validation === 'isEmail') {
                const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                filter.test(value) ? setEmailError(defaultStateValidator) : setEmailError({show: true, validatorErrorMessage: 'Invalid email'})
            } else if (validation === 'isMatch') {
                validations.isMatch === value ? setMatchError(defaultStateValidator) : setMatchError({show: true, validatorErrorMessage: 'Passwords dont match'})
            } else if (validation === 'isCheckNickname') {
                validations.isCheckNickname ? setCheckNicknameError(defaultStateValidator) : setCheckNicknameError({show: true, validatorErrorMessage: 'Nickname already exists'})
            }
        }
// eslint-disable-next-line
    }, [value, validations.isCheckNickname])


    return [isEmpty, minLengthError, maxLengthError, isEmailError, isMatchError, isCheckNicknameError]
}
