import React, { useState } from 'react';
import styles from './Project.module.scss'
import { ProjectHeader } from "./ProjectHeader/ProjectHeader";
import { ProjectBlog } from "./ProjectBlog/ProjectBlog";
import { ProjectAbout } from "./ProjectAbout/ProjectAbout";
import { ProjectDeposit } from "./ProjectDeposit/ProjectDeposit";

export const Project = () => {

    const [isTab, setTab] = useState('ProjectBlog')


    const checkTabs = () => {
        if (isTab === 'ProjectBlog') {
            return <ProjectBlog/>
        } else if (isTab === 'ProjectAbout') {
            return <ProjectAbout/>
        }
    }

    return (
        <div className={styles.projectContainer}>
            <ProjectHeader/>
            <div className={styles.contentBlock}>
                <div className={styles.contentWrapper}>
                    <div className={styles.tabsBlock}>
                        <span className={isTab === 'ProjectBlog' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                              onClick={() => setTab('ProjectBlog')}>Project Blog</span>
                        <span className={isTab === 'ProjectAbout' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                              onClick={() => setTab('ProjectAbout')}>About Project</span>
                    </div>
                    {checkTabs()}
                </div>
                <div className={styles.projectDepositInformationBlock}>
                    <ProjectDeposit/>
                </div>
            </div>
        </div>
    );
};
