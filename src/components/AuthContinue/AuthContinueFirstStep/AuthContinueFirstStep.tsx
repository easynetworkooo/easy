import React, { FC, useEffect, useState } from 'react';
import styles from './AuthContinueFirstStep.module.scss'
import { Button, Input, Select, Steps } from "../../../components-ui";
import { appAPI } from "../../../services/AppService";
import { IFinishRegisterCredentials } from "../../../models/IFinishRegister";
import { setCities } from "../../../helpers/setCities";
import { setCountries } from "../../../helpers/setCountries";
import { useInput } from "../../../hooks/useInput";
import { authAPI } from "../../../services/AuthService";

export interface AuthContinueFirstStepProps {
    changeStep: (nextStep: number) => void,
    nextStep: number,
    isCredentialsFinishRegister: IFinishRegisterCredentials,
    setCredentialsFinishRegister: (credentials: IFinishRegisterCredentials) => void
}


export const AuthContinueFirstStep: FC<AuthContinueFirstStepProps> = ({
                                                                          changeStep,
                                                                          nextStep,
                                                                          isCredentialsFinishRegister,
                                                                          setCredentialsFinishRegister
                                                                      }) => {
    const [isValidNickname, setValidNickname] = useState(true)
    const isName = useInput('', {isEmpty: true, isCheckNickname: isValidNickname})
    const [isCountry, setCountry] = useState('')
    const [isCity, setCity] = useState('')
    const [isCodeCountry, setCodeCountry] = useState('')

    const [checkNickname] = authAPI.useCheckNicknameMutation()
    const {data: countries} = appAPI.useFetchAllCountriesQuery('')
    const {data: cities} = appAPI.useFetchAllCitiesQuery(isCodeCountry, {skip: isCodeCountry === ''})

    const changeStepHandler = () => {
        if (isName.value !== '' && isCountry !== '' && isCity !== '') {
            setCredentialsFinishRegister({
                ...isCredentialsFinishRegister,
                nickname: isName.value,
                city: isCity,
                country: isCountry
            })
            changeStep(nextStep)
        }
    }

    useEffect(() => {
        if (isName.value !== '') {
            checkNickname(isName.value).then((data: any) => {
                if (data.data) {
                    setValidNickname(data.data.value)
                } else {
                    console.log(data)
                    setValidNickname(false)
                }
            })
        }
    }, [checkNickname, isName.value])

    useEffect(() => {
        setCity('')
        if (countries) {
            countries.value.countries.find(({name, code}) => name === isCountry && setCodeCountry(code))
        }
    }, [countries, isCountry])

    return (
        <div className={styles.firstStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['firstActiveStep', 'secondUnreadyStep']}/>
            </div>
            <div className={styles.inputBlock}>
                <Input type={'text'} placeholder={'Nickname'} value={isName.value}
                       onChange={e => isName.onChange(e)}
                       onBlur={e => isName.onBlur(e)}
                       validations={isName.validators}
                       isDirty={isName.isDirty}
                       isInputErrorValidation={isName.isInputErrorValidation}
                       onKeyPress={e => e.key === 'Enter' && changeStepHandler()}
                       autoFocus={true}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={countries ? setCountries(countries.value.countries) : []}
                        isActiveSelect={isCountry} setActiveSelect={setCountry}
                        placeholder={'Choose country'}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={cities ? setCities(cities.value) : []} placeholder={'Choose city'}
                        isActiveSelect={isCity} setActiveSelect={setCity} disabled={isCountry === ''}
                />
            </div>
            <div className={styles.buttonBlock}>
                <Button buttonColor={'clearButton'} onClick={changeStepHandler}>
                    <span>Next</span>
                </Button>
            </div>
        </div>
    );
};
