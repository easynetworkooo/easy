import React, { useEffect, useState } from 'react';
import styles from './FilterItems.module.scss'
import { ButtonsSorter } from "../ButtonsSorter/ButtonsSorter";
import { InputFind } from "../InputFind/InputFind";
import { Filter } from "./Filter/Filter";
import applyFilter from '../../assets/UI/apllyFilter.svg'
import closeFilter from '../../assets/UI/closeFilter.svg'
import { userAPI } from "../../services/UserService";
import { IUserValue } from "../../models/IUser";
import { UserSub } from "../UserSub/UserSub";
import { customErrorNotify } from "../../helpers/customErrorNotify";


export interface defaultSearchParams {
    page: number,
    type: string,
    text?: string,
    country?: string,
    city?: string,
    interest?: string
}

const defaultParams: defaultSearchParams = {page: 1, type: 'users', text: '', city: '', country: '', interest: ''}

export const FilterItems = () => {

    const [searchValue, setSearchValue] = useState('')
    const [isSelectCountry, setSelectCountry] = useState('')
    const [isSelectCity, setSelectCity] = useState('')
    const [isSelectCryptoInterests, setSelectCryptoInterests] = useState('')
    const [isSorterName, setSorterName] = useState('users')
    const [isSearchParams, setSearchParams] = useState<defaultSearchParams>(defaultParams)
    const [itemsSearch, setItemsSearch] = useState<IUserValue[]>([])
    const [isShowFilter, setShowFilter] = useState(false)

    const [searchUsers] = userAPI.useSearchUsersMutation()


    useEffect(() => {
        setSearchParams({
            page: 1,
            type: isSorterName,
            text: searchValue,
            city: isSelectCity,
            interest: isSelectCryptoInterests,
            country: isSelectCountry
        })
    }, [isSelectCity, isSelectCountry, isSelectCryptoInterests, isSorterName, searchValue])

    const closeSearchHandler = () => {
        setSearchValue('')
        setItemsSearch([])
        setShowFilter(false)
        setSelectCountry('')
        setSelectCity('')
        setSelectCryptoInterests('')
    }

    const applySearchHandler = async () => {
        const searcher: defaultSearchParams = {page: 1, type: 'users'}
        for (let searchParamsKey in isSearchParams) {
            if (isSearchParams[searchParamsKey as keyof typeof isSearchParams] !== '') {
                Object.assign(searcher, {[searchParamsKey]: isSearchParams[searchParamsKey as keyof typeof isSearchParams]})
            }
        }

        await searchUsers(searcher).then((data: any) => {
            setItemsSearch(data.data.value)
            if (data.data.value.length === 0) {
                customErrorNotify('No users with such parameters were found', 'Error')
            }
        })
    }

    return (
        <div className={styles.filterBlock}>
            <div className={styles.buttonsAndFindBlock}>
                {isShowFilter && <ButtonsSorter isSorterName={isSorterName} setSorterName={setSorterName}
                                                isShowFilter={isShowFilter}/>}
                <InputFind setShowFilter={setShowFilter} value={searchValue} onChangeValue={setSearchValue}/>
            </div>
            {isShowFilter &&
                <>
                    <Filter isSorterName={isSorterName} isSelectCity={isSelectCity} isSelectCountry={isSelectCountry}
                            setSelectCountry={setSelectCountry} isSelectCryptoInterests={isSelectCryptoInterests}
                            setSelectCryptoInterests={setSelectCryptoInterests} setSelectCity={setSelectCity}/>
                    <div className={styles.buttonsFilter}>
                        <img src={closeFilter} alt="closeFilter" onClick={closeSearchHandler}/>
                        <img src={applyFilter} alt="applyFilter" onClick={applySearchHandler}/>
                    </div>
                </>
            }
            <div className={styles.finderItemsBlock}>
                {itemsSearch.map(item =>
                    <UserSub dataSub={item} key={item.id}/>
                )}
            </div>
        </div>
    );
};
