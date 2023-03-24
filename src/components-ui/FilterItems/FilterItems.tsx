import React, { useEffect, useRef, useState } from 'react';
import styles from './FilterItems.module.scss'
import { InputFind } from "../InputFind/InputFind";
import { Filter } from "./Filter/Filter";
import activeFilter from '../../assets/UI/activeFilter.svg'
import unActiveFilter from '../../assets/UI/unActiveFilter.svg'
import { userAPI } from "../../services/UserService";
import { IUserValue } from "../../models/IUser";
import { UserSub } from "../UserSub/UserSub";
import { customErrorNotify } from "../../helpers/customErrorNotify";
import { useDebounce } from "use-debounce";


export interface defaultSearchParams {
    page: number,
    type?: string,
    text?: string,
    country?: string,
    city?: string,
    interest?: string
}

const defaultParams: defaultSearchParams = {page: 1, type: '', text: '', city: '', country: '', interest: ''}

export const FilterItems = () => {

    const blockRef = useRef<any>(null)

    const [searchValue, setSearchValue] = useState('')
    const [isSelectCountry, setSelectCountry] = useState('')
    const [isSelectCity, setSelectCity] = useState('')
    const [isSelectCryptoInterests, setSelectCryptoInterests] = useState('')
    const [isSorterName, setSorterName] = useState('')
    const [isSearchParams, setSearchParams] = useState<defaultSearchParams>(defaultParams)
    const [debounceSearchParams] = useDebounce(isSearchParams, 500)
    const [itemsSearch, setItemsSearch] = useState<IUserValue[]>([])
    const [isShowFilter, setShowFilter] = useState(false)

    const [hoverImage, setHoverImage] = useState(false)

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

    useEffect(() => {
        const searcher: defaultSearchParams = {page: 1, type: 'users'}
        for (let searchParamsKey in isSearchParams) {
            if (isSearchParams[searchParamsKey as keyof typeof isSearchParams] !== '') {
                Object.assign(searcher, {[searchParamsKey]: isSearchParams[searchParamsKey as keyof typeof isSearchParams]})
            }
        }

        if (searcher.text || searcher.country || searcher.interest) {
            searchUsers(searcher).then((data: any) => {
                setItemsSearch(data.data.value)
            })
        } else {
            setItemsSearch([])
        }

        // eslint-disable-next-line
    }, [debounceSearchParams])

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (blockRef.current && !blockRef.current.contains(event.target)) {
                closeSearchHandler()
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [blockRef])

    return (
        <div className={styles.filterBlock} ref={blockRef}>
            <div className={styles.buttonsAndFindBlock}>
                <InputFind clearFilters={closeSearchHandler} value={searchValue} onChangeValue={setSearchValue}/>
                <div className={isShowFilter ? `${styles.filters} ${styles.filtersActive}` : styles.filters} onClick={() => setShowFilter(prevState => !prevState)} onMouseMove={() => setHoverImage(true)}
                     onMouseLeave={() => setHoverImage(false)}>
                    <img src={(hoverImage || isShowFilter) ? activeFilter : unActiveFilter} alt="filter"/>
                    <span>Filters</span>
                </div>
            </div>
            <div className={(itemsSearch.length > 0 || isShowFilter) ? `${styles.itemsFoundBlock} ${styles.activeItemsFoundBlock}` : styles.itemsFoundBlock}>
                {isShowFilter &&
                    <>
                        <Filter isSorterName={isSorterName} setSorterName={setSorterName} isSelectCity={isSelectCity}
                                isSelectCountry={isSelectCountry}
                                setSelectCountry={setSelectCountry} isSelectCryptoInterests={isSelectCryptoInterests}
                                setSelectCryptoInterests={setSelectCryptoInterests} setSelectCity={setSelectCity}/>
                    </>
                }
                <div className={styles.finderItemsBlock}>
                    {itemsSearch.map((item, key) =>
                        <UserSub dataSub={item} key={key} searchParams={isSearchParams}/>
                    )}
                </div>
            </div>
        </div>
    );
};
