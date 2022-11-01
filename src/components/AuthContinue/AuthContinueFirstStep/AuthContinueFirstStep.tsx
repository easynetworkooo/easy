import React, { FC, useEffect, useState } from 'react';
import styles from './AuthContinueFirstStep.module.scss'
import { Button, Input, Select, Steps } from "../../../components-ui";
import { appAPI } from "../../../services/AppService";
import { IFinishRegisterCredentials } from "../../../models/IFinishRegister";

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
    const [isName, setName] = useState('')
    const [isCountry, setCountry] = useState('')
    const [isCity, setCity] = useState('')
    const [isCodeCountry, setCodeCountry] = useState('')

    const {data: countries} = appAPI.useFetchAllCountriesQuery('')
    const {data: cities} = appAPI.useFetchAllCitiesQuery(isCodeCountry)

    const setCountries = () => {
        const countriesNameList: string[] = []
        if (countries) {
            countries.value.countries.forEach(({name}) => countriesNameList.push(name))
        }
        return countriesNameList
    }

    const setCities = () => {
        const citiesNameList: string[] = []
        if (cities) {
            cities.value.forEach(({name}) => citiesNameList.push(name))
        }
        return citiesNameList
    }

    const changeStepHandler = () => {
        if (isName !== '' && isCountry !== '' && isCity !== '') {
            setCredentialsFinishRegister({...isCredentialsFinishRegister, nickname: isName, city: isCity, country: isCountry})
            changeStep(nextStep)
        }
    }

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
                <Input type={'text'} placeholder={'Nickname'} value={isName} autoFocus={true}
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={setCountries()}
                        isActiveSelect={isCountry} setActiveSelect={setCountry}
                        placeholder={'Choose country'}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={setCities()} placeholder={'Choose city'}
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