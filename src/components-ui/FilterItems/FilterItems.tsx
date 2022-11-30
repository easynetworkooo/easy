import React, { useState } from 'react';
import styles from './FilterItems.module.scss'
import { ButtonsSorter } from "../ButtonsSorter/ButtonsSorter";
import { InputFind } from "../InputFind/InputFind";
import { Filter } from "./Filter/Filter";
import applyFilter from '../../assets/UI/apllyFilter.svg'
import closeFilter from '../../assets/UI/closeFilter.svg'

export const FilterItems = () => {

    const [isSorterName, setSorterName] = useState('All')
    const [isShowFilter, setShowFilter] = useState(false)

    return (
        <div className={styles.filterBlock}>
            <div className={styles.buttonsAndFindBlock}>
                <ButtonsSorter isSorterName={isSorterName} setSorterName={setSorterName} isShowFilter={isShowFilter}/>
                <InputFind setShowFilter={setShowFilter}/>
            </div>
            {isShowFilter &&
                <>
                    <Filter isSorterName={isSorterName}/>
                    <div className={styles.buttonsFilter}>
                        <img src={closeFilter} alt="closeFilter" onClick={() => setShowFilter(false)}/>
                        <img src={applyFilter} alt="applyFilter"/>
                    </div>
                </>
            }
        </div>
    );
};
