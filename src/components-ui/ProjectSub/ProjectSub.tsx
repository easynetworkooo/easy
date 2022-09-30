import React from 'react';
import styles from './ProjectSub.module.scss'
import projectAvatar from '../../assets/UI/AvatarProject.png'
import { Indicator } from "../Indicator/Indicator";
import { IndicatorStatus } from "../IndicatorStatus/IndicatorStatus";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../constants/nameRoutesConsts";

export const ProjectSub = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.projectSubBlock} onClick={() => navigate(`${PROJECTS}/tingram`)}>
            <div className={styles.projectName}>
                <div className={styles.projectAvatar}>
                    <img src={projectAvatar} alt="projectAvatar"/>
                </div>
                <div className={styles.nameBlock}>
                    <div className={styles.name}>
                        <span>Tingram</span>
                        <div className={styles.project}>
                            <span>Project</span>
                        </div>
                    </div>
                    <div className={styles.lastActivity}>
                        <span>3 minutes ago</span>
                    </div>
                </div>
            </div>
            <div className={styles.progressIndicatorBlock}>
                <IndicatorStatus type={'Sale Live'}/>
                <Indicator maxCount={120} currentCount={20} type={'Sale Live'}/>
            </div>
        </div>
    );
};