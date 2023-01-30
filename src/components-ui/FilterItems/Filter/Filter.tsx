import React, { FC, useEffect, useState } from 'react';
import styles from './Filter.module.scss'
import { Select } from "../../Select/Select";
import { appAPI } from "../../../services/AppService";
import { setCountries } from "../../../helpers/setCountries";
import { setCities } from "../../../helpers/setCities";

export interface FilterProps {
    isSorterName: string
    isSelectCountry: string
    isSelectCity: string
    isSelectCryptoInterests: string
    setSelectCountry: (value: string) => void
    setSelectCity: (value: string) => void
    setSelectCryptoInterests: (value: string) => void
}

export const Filter: FC<FilterProps> = ({
                                            isSorterName,
                                            isSelectCountry,
                                            setSelectCountry,
                                            setSelectCity,
                                            isSelectCity,
                                            isSelectCryptoInterests,
                                            setSelectCryptoInterests
                                        }) => {


    const [isSelectProjectOption, setSelectProjectOption] = useState('')
    const [isCodeCountry, setCodeCountry] = useState('')

    const {data: countries} = appAPI.useFetchAllCountriesQuery('')
    const {data: cities} = appAPI.useFetchAllCitiesQuery(isCodeCountry, {skip: isCodeCountry === ''})
    const {data: interests} = appAPI.useFetchAllInterestQuery('')

    const setCryptoInterests = () => {
        const cryptoInterests: string[] = []
        if (interests) {
            interests.value.interests.forEach(({name}) => cryptoInterests.push(name))
        }
        return cryptoInterests
    }


    useEffect(() => {
        setSelectCity('')
        if (countries) {
            countries.value.countries.find(({name, code}) => name === isSelectCountry && setCodeCountry(code))
        }
        // eslint-disable-next-line
    }, [countries, isSelectCountry])

    return (
        <div className={styles.filterBlock}>
            {isSorterName === 'users' &&
                <>
                    <Select isActiveSelect={isSelectCountry} setActiveSelect={setSelectCountry} placeholder="Country"
                            options={countries ? setCountries(countries.value.countries) : []}/>
                    <Select isActiveSelect={isSelectCity} setActiveSelect={setSelectCity} placeholder="City"
                            options={cities ? setCities(cities.value) : []} disabled={isSelectCountry === ''}/>
                    <Select isActiveSelect={isSelectCryptoInterests} setActiveSelect={setSelectCryptoInterests}
                            placeholder="Crypto Interest" options={setCryptoInterests()}/>
                </>
            }
            {isSorterName === 'project' &&
                <>
                    <Select isActiveSelect={isSelectProjectOption} setActiveSelect={setSelectProjectOption}
                            options={['DEF', 'PRO']} placeholder='Waiting for launch'/>
                </>
            }

        </div>
    );
};
