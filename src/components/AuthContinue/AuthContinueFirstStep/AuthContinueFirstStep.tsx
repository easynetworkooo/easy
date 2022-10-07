import React, { FC, useEffect, useState } from 'react';
import styles from './AuthContinueFirstStep.module.scss'
import { Button, Input, Select, Steps } from "../../../components-ui";

export interface AuthContinueFirstStepProps {
    changeStep: (nextStep: number) => void
    nextStep: number
}

const country = [

    {
        country: 'Germany',
        cities: ['Berlin', 'Bavaria', 'Baden-Württemberg', 'North Rhine-Westphalia', 'Hesse']
    },
    {
        country: 'Italy',
        cities: ['Rome', 'Milan']
    },

]

export const AuthContinueFirstStep: FC<AuthContinueFirstStepProps> = ({changeStep, nextStep}) => {
    const [isNickname, setNickname] = useState('')
    const [isCountry, setCountry] = useState('')
    const [isCity, setCity] = useState('')


    useEffect(() => {
        setCity('')
    }, [isCountry])

    const setCountries = () => {
        const countries: string[] = []
        country.map((item) => countries.push(item.country))
        return countries
    }

    const setCities = () => {
        if (isCountry !== '') {
            const foundCities: any = country.find(item => item.country === isCountry)
            return foundCities.cities
        }
        return []
    }

    const changeStepHandler = () => {
        if (isNickname !== '' && isCountry !== '' && isCity !== '') {
            changeStep(nextStep)
        }
    }

    return (
        <div className={styles.firstStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['firstActiveStep', 'secondUnreadyStep']}/>
            </div>
            <div className={styles.inputBlock}>
                <Input type={'text'} placeholder={'Nickname'} value={isNickname} autoFocus={true}
                       onChange={e => setNickname(e.target.value)}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={setCountries()}
                        isActiveSelect={isCountry} setActiveSelect={setCountry}
                        placeholder={'Choose country'}/>
            </div>
            <div className={styles.inputBlock}>
                <Select options={setCities()} placeholder={'Choose city'}
                        isActiveSelect={isCity} setActiveSelect={setCity} disabled={isCountry === '' && true}
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