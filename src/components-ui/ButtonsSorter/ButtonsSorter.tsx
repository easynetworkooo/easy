import React, { FC, useState } from 'react';
import styles from './ButtonSorter.module.scss'
import { IPost } from "../../models/IPost";

export interface ButtonsSorterProps {
    usersItems: IPost[]
    setViewItems: (arr: any) => void
}

export const ButtonsSorter:FC<ButtonsSorterProps> = ({usersItems, setViewItems}) => {

    const [isSorterName, setSorterName] = useState('All')


    const checkSorterStyles = (nameSorter: string) => {
        if (nameSorter === isSorterName) {
            return `${styles.buttonSorter} ${styles.active}`
        } else {
            return styles.buttonSorter
        }
    }

    const setSorter = (name: string) => {
        if (name === 'People') {
            const sortPosts = usersItems.filter((item) => item.type === 'user')
            setViewItems(sortPosts)
        } else if (name === 'Project') {
            const sortPosts = usersItems.filter((item) => item.type === 'project')
            setViewItems(sortPosts)
        } else {
            setViewItems(usersItems)
        }
        setSorterName(name)
    }

    return (
        <div className={styles.buttonSorterBlock}>
            <div className={checkSorterStyles('All')}>
                <button onClick={() => setSorter('All')}><span>All</span></button>
            </div>
            <div className={checkSorterStyles('People')}>
                <button onClick={() => setSorter('People')}><span>People</span></button>
            </div>
            <div className={checkSorterStyles('Project')}>
                <button onClick={() => setSorter('Project')}><span>Project</span></button>
            </div>
        </div>
    );
};