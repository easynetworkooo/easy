import React, { useState } from 'react';
import styles from './MyProjects.module.scss'
import { Button, WalletProject } from "../../components-ui";
import { useNavigate } from "react-router-dom";
import { CREATE_PROJECT } from "../../constants/nameRoutesConsts";


export const MyProjects = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState(false)

    return (
        <div className={styles.myProjectsBlock}>
            {!projects ?
                <div className={styles.projectDontHave}>
                    <button onClick={() => setProjects(true)}>
                        test
                    </button>
                    <span className={styles.textQues}>Haven't created any projects yet?</span>
                    <Button buttonColor="clearButton" onClick={() => navigate(CREATE_PROJECT)}>
                        <span>Create Project</span>
                    </Button>
                </div>
                :
                <div className={styles.projectsBlock}>
                    <WalletProject currentCount={100} maxCount={200} typeIndicator={'Sale Live'}/>
                    <WalletProject currentCount={0} maxCount={200} typeIndicator={'Canceled'}/>
                    <WalletProject currentCount={200} maxCount={200} typeIndicator={'Sale Ended'}/>
                    <WalletProject currentCount={0} maxCount={200} typeIndicator={'Upcoming'}/>
                </div>
            }
        </div>
    );
};
